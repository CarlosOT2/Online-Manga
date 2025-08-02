using System.Reflection;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace back_end.Data
{
    public static class ModelBuilderExtensions
    {
        public static void BaseSeed(this ModelBuilder modelBuilder)
        {
            void ModelData<T>(string[] names) where T : class, new()
            {
                PropertyInfo GenericID = typeof(T).GetProperty("id");
                PropertyInfo GenericName = typeof(T).GetProperty("name");

                if (GenericID == null || GenericName == null)
                {
                    throw new InvalidOperationException("generic T must have 'id' and 'name' properties");
                }


                T[] DataArray = new T[names.Length];
                for (int i = 0; i < names.Length; i++)
                {
                    T obj = new T();
                    GenericID.SetValue(obj, i + 1);
                    GenericName.SetValue(obj, names[i]);
                    DataArray[i] = obj;
                }

                modelBuilder.Entity<T>().HasData(DataArray);
            }

            ModelData<Genre>(
                [
                "Action","Adventure", "Comedy","Drama","Fantasy","Horror","Isekai","Mecha",
                "Mystery","Philosophical","Psychological","Romance","Sci-fi","Slice of life",
                "Sports","Thriller","Tragedy"
                ]
              );

            ModelData<Theme>(
                [
                "Superhero","Medical","Medieval","Aliens","Animals","Cooking","Delinquents","Demons",
                "Genderswap","Ghosts","Gyaru","Samurai","Loli","Mafia","Magic","Martial Arts","Military",
                "Monsters","Monsters Girls","Music","Ninja","Office Workers","Police","Post-Apocalyptic",
                "Reincarnation","Reverse Harem","Harem","School Life","Shota", "Supernatural","Survival",
                "Time Travel","Games","Vampires","Villainess","Virtual Reality","Zombies","Workout",
                ]
              );

            ModelData<ContentRating>(
                [
                "Safe","Suggestive", "Erotica"
                ]
              );

            ModelData<Demographic>(
                [
                "Shounen","Shoujo","Seinen","Josei"
                ]
              );

            ModelData<Status>(
                [
                "Releasing","Completed","Hiatus","Cancelled"
                ]
              );

        }
    }
}
