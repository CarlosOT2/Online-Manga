using back_end.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Collections;
using System.Reflection;
using back_end.Shared.Core;
using System.Collections.Generic;

namespace back_end.Database.DbAccess
{
    public class DbSeeds
    {
        private readonly AppDbContext _context;

        public DbSeeds(AppDbContext context)
        {
            _context = context;
        }

        public async Task Static()
        {
            void ModelData(string DbSetName, string[] names)
            {
                Result<object> DbSetResult = _context.GetDbSet(DbSetName);

                if(DbSetResult.IsFailure)
                    throw new InvalidOperationException(
                        "'DbSetResult' returned IsFailure during seed static operation."
                    );

                if (DbSetResult.Value == null)
                    throw new InvalidOperationException(
                        $"Seed data error: the key '{DbSetName}' from the JSON file does not match any DbSet in AppDbContext. " +
                        $"Make sure there is a public property 'DbSet<{DbSetName}>' defined in your context."
                    );

                Type DbSetType = DbSetResult.Value.GetType();
                Type GenericType = DbSetType.GetGenericArguments()[0];

                if (GenericType == null)
                    throw new InvalidOperationException($"Could not find generic type for the DbSet '{DbSetName}'");

                PropertyInfo GenericID = GenericType.GetProperty("id", BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                PropertyInfo GenericName = GenericType.GetProperty("name", BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);

                if (GenericID == null || GenericName == null)
                    throw new InvalidOperationException("generic T must have 'id' and 'name' properties");

                Array DataArray = Array.CreateInstance(GenericType, names.Length);
                for (int i = 0; i < names.Length; i++)
                {
                    object obj = Activator.CreateInstance(GenericType);
                    GenericID.SetValue(obj, i + 1);
                    GenericName.SetValue(obj, names[i]);
                    DataArray.SetValue(obj, i);
                }

                MethodInfo? AddRangeMethod = DbSetType.GetMethod("AddRange", new[] { typeof(IEnumerable<>).MakeGenericType(GenericType) });

                if (AddRangeMethod == null)
                    AddRangeMethod = DbSetType.GetMethod("AddRange", new[] { GenericType.MakeArrayType() });
                if (AddRangeMethod == null)
                    throw new InvalidOperationException($"Could not find AddRange method for DbSet<{GenericType.Name}>");

                AddRangeMethod.Invoke(DbSetResult.Value, new object[] { DataArray });
            }

            string path = Path.Combine(AppContext.BaseDirectory, "Database", "Seeds", "StaticSeed.json");
            string json = File.ReadAllText(path);

            using JsonDocument doc = JsonDocument.Parse(json);

            foreach (JsonProperty prop in doc.RootElement.EnumerateObject())
            {
                string name = prop.Name;

                JsonElement value = prop.Value;
                string[] stringValue = value.EnumerateArray().Select(e => e.GetString()!).ToArray();

                await Clear(name);
                ModelData(name, stringValue);
            }

            await _context.SaveChangesAsync();
        }

        public async Task Run<T>(string name, int rows, T baseObj) where T : class, new()
        {
            Result<DbSet<T>> DbSetResult = _context.GetDbSet<T>(name) as Result<DbSet<T>>;

            if (DbSetResult.IsFailure)
                throw new InvalidOperationException(
                    "'DbSetResult' returned IsFailure during seed Run operation."
                );

            if (DbSetResult.Value == null)
                throw new InvalidOperationException($"DbSet '{name}' not found in DbContext");

            List<T> SeedData = new List<T>();

            for (int i = 0; i < rows; i++)
            {
                T item = new T();
                PropertyInfo[] props = typeof(T).GetProperties();

                foreach (var prop in props)
                {
                    if (!prop.CanWrite) continue;

                    if (prop.Name.Equals("id"))
                    {
                        prop.SetValue(item, i + 1);
                    }
                    else if (baseObj != null)
                    {
                        Type type = prop.PropertyType;

                        if (!type.IsValueType && type != typeof(string) && !type.IsGenericType)
                            continue;

                        if (type == typeof(string) || type == typeof(DateTime))
                        {
                            object? value = prop.GetValue(baseObj);
                            if (value != null)
                            {
                                if (value is string strValue)
                                {
                                    prop.SetValue(item, $"{strValue}{i + 1}");
                                }
                                else if (value is DateTime dtValue)
                                {
                                    dtValue = DateTime.SpecifyKind(dtValue, DateTimeKind.Utc);
                                    DateTime currentDate = DateTime.Now;

                                    Random random = new Random();
                                    TimeSpan intervalo = currentDate - dtValue;
                                    double randomSeconds = random.NextDouble() * intervalo.TotalSeconds;
                                    DateTime randomDate = dtValue.AddSeconds(randomSeconds);

                                    prop.SetValue(item, randomDate);
                                }
                            }
                            else
                            {
                                throw new InvalidOperationException($"Property {prop.Name} value returned null");
                            }
                        }
                        else if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(ICollection<>))
                        {
                            Type itemType = type.GetGenericArguments()[0];

                            PropertyInfo? DbSetProp = _context.GetType()
                            .GetProperties()
                            .FirstOrDefault(p =>
                               p.PropertyType.IsGenericType &&
                               p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                               p.PropertyType.GenericTypeArguments[0] == itemType
                            );

                            if (DbSetProp == null)
                                throw new InvalidOperationException($"ICollection<>; Couldn't find DbSet<{itemType.Name}> in DbContext");

                            IEnumerable Current_DbSet = DbSetProp.GetValue(_context) as IEnumerable;

                            Random random = new Random();
                            List<object> list = Current_DbSet.Cast<object>().OrderBy(x => Guid.NewGuid()).Take(random.Next(1, 6)).ToList();


                            IList collection = Activator.CreateInstance(typeof(List<>).MakeGenericType(itemType)) as IList;
                            foreach (var listItem in list)
                            {
                                collection.Add(listItem);
                            }

                            prop.SetValue(item, collection);
                        }
                        else if (prop.PropertyType == typeof(int) && prop.Name.EndsWith("Id"))
                        {
                            string navName = prop.Name.Substring(0, prop.Name.Length - 2);
                            PropertyInfo? navProp = typeof(T).GetProperty(navName);
                            Type navType = navProp.PropertyType;

                            PropertyInfo? DbSetProp = _context.GetType()
                                .GetProperties()
                                .FirstOrDefault(p =>
                                    p.PropertyType.IsGenericType &&
                                    p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                                    p.PropertyType.GenericTypeArguments[0] == navType
                                );

                            if (DbSetProp == null)
                                throw new InvalidOperationException($"FK_Id; Couldn't find DbSet<{navType.Name}> in DbContext");

                            IEnumerable navDbSetObj = DbSetProp.GetValue(_context) as IEnumerable;

                            object? randomValue = navDbSetObj.Cast<object>().OrderBy(x => Guid.NewGuid()).FirstOrDefault();
                            if (randomValue == null) continue;

                            PropertyInfo? idProp = navType.GetProperty("id", BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                            if (idProp == null) continue;

                            int randomId = (int)idProp.GetValue(randomValue)!;
                            prop.SetValue(item, randomId);
                        }
                        else
                        {
                            throw new InvalidOperationException($"Unable to handle with type {type}");
                        }
                    }
                }

                SeedData.Add(item);
            }

            DbSetResult.Value.AddRange(SeedData);
            await _context.SaveChangesAsync();
        }
        public async Task Clear(string? specificTableName = null)
        {
            async Task ClearTable(string name)
            {
                Result<object> DbSetResult = _context.GetDbSet(name);

                if (DbSetResult.IsFailure)
                    throw new InvalidOperationException(
                        "'DbSetResult' returned IsFailure during ClearTable operation."
                    );

                if (DbSetResult.Value == null)
                        throw new ArgumentException($"Could not find DbSet from the table called '{name}'");

                    Type GenericType = DbSetResult.Value.GetType().GenericTypeArguments[0];

                    MethodInfo ExecuteDeleteAsync = typeof(EntityFrameworkQueryableExtensions)
                    .GetMethods()
                    .First(m => m.Name == "ExecuteDeleteAsync")
                    .MakeGenericMethod(GenericType);

                    await (Task)ExecuteDeleteAsync.Invoke(null, new object[] { DbSetResult.Value, CancellationToken.None })!;
            }

            if (specificTableName != null)
            {
                await ClearTable(specificTableName);
            }
            else
            {
                List<string> dbSetNames = _context.GetType()
                            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                            .Where(p => p.PropertyType.IsGenericType &&
                                        p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
                            .Select(p => p.Name)
                            .ToList();

                foreach (string name in dbSetNames)
                {
                    await ClearTable(name);
                }
            }

        }
    }
}
