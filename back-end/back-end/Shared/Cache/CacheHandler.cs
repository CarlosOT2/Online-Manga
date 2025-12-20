using System.Text.Json;
using back_end.Shared.Utils;
using StackExchange.Redis;

namespace back_end.Shared.Cache
{
    public class CacheHandler
    {
        
        private readonly IDatabase _redis;

        public CacheHandler(IConnectionMultiplexer muxer)
        {
            _redis = muxer.GetDatabase();
        }

        public async Task SetAsync<T>(string key, T value, Expiration? expiry = null)
        {
            string json = JsonSerializer.Serialize(value);
            await _redis.StringSetAsync(key, json, expiry ?? Expiration.Default);
        }
        public async Task<T?> GetAsync<T>(string key)
        {
            RedisValue value = await _redis.StringGetAsync(key);

            if (value.IsNullOrEmpty)
                return default;
            
            return JsonSerializer.Deserialize<T>(value!);
        }

        public void SetHttpHeaders(HttpResponse response, DTOs.Static value, int maxage)
        {
            response.Headers.ETag = ETag.GenerateETag(value);
            response.Headers["Cache-Control"] = $"public, max-age={maxage}";
        }
    }
}