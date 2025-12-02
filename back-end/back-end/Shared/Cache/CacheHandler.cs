using back_end.Shared.Core;
using back_end.Shared.Utils;
using Microsoft.Extensions.Options;

namespace back_end.Shared.Cache
{
    public class CacheHandler
    {
        private readonly CacheSettings _settings;

        public CacheHandler(IOptions<CacheSettings> options)
        {
            _settings = options.Value;
        }

        public void SetHttpStaticCache(HttpResponse response, DTOs.Static value)
        {
            response.Headers.ETag = ETag.GenerateETag(value); ;
            response.Headers["Cache-Control"] = $"public, max-age={_settings.StaticMaxAge}";
        }
    }
}