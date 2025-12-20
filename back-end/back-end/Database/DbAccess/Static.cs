using System.Collections.Generic;
using System.Runtime;
using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using back_end.DTOs;
using back_end.Shared.Cache;
using back_end.Shared.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace back_end.Database.DbAccess
{
    public class Static : IStatic
    {
        private readonly AppDbContext _context;
        private readonly CacheHandler _cache;
        private readonly CacheSettings _settings;

        public Static(AppDbContext context, CacheHandler cacheHandler, IOptions<CacheSettings> options)
        {
            _context = context;
            _cache = cacheHandler;
            _settings = options.Value;
        }

        public async Task<Result<DTOs.Static>> GetAllStaticData()
        {
            try
            {
                DTOs.Static cache = await _cache.GetAsync<DTOs.Static>(_settings.Static.key);
                if (cache != null)
                    return Result<DTOs.Static>.Success(cache);
                
                DTOs.Static StaticData = new DTOs.Static
                {
                    statuses = await _context.Statuses
                .Select(s => new StaticItemDTO { id = s.id, name = s.name })
                .ToListAsync(),

                    genres = await _context.Genres
                .Select(g => new StaticItemDTO { id = g.id, name = g.name })
                .ToListAsync(),

                    themes = await _context.Themes
                .Select(t => new StaticItemDTO { id = t.id, name = t.name })
                .ToListAsync(),

                    demographics = await _context.Demographics
                .Select(d => new StaticItemDTO { id = d.id, name = d.name })
                .ToListAsync(),

                    contentRatings = await _context.ContentRatings
                .Select(c => new StaticItemDTO { id = c.id, name = c.name })
                .ToListAsync(),
                };

                await _cache.SetAsync(_settings.Static.key, StaticData);

                return Result<DTOs.Static>.Success(StaticData);
            }
            catch (Exception ex)
            {
                return Result<DTOs.Static>.Failure(ex.Message);
            }
        }
    }
}
