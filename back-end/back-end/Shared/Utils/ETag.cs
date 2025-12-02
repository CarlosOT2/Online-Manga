using System.Text.Json;
using System.Security.Cryptography;
using System.Text;

namespace back_end.Shared.Utils
{
    public class ETag
    {
        public static string GenerateETag(object data)
        {
            
            using (SHA256 sha256 = SHA256.Create())
            {
                string json = JsonSerializer.Serialize(data);
                byte[] bytes = Encoding.UTF8.GetBytes(json);

                byte[] hashBytes = sha256.ComputeHash(bytes);
                string base64Hash = Convert.ToBase64String(hashBytes);

                return $"\"{base64Hash}\"";
            }
        }
    }
}
