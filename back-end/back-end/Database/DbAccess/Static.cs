using System.Collections.Generic;
using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using back_end.DTOs;
using back_end.Shared.Core;
using Microsoft.EntityFrameworkCore;

namespace back_end.Database.DbAccess
{
    public class Static : IStatic
    {
        private readonly AppDbContext _context;

        public Static(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Result<DTOs.Static>> GetAllStaticData()
        {
            try
            {
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

                return Result<DTOs.Static>.Success(StaticData);
            }
            catch (Exception ex)
            {
                return Result<DTOs.Static>.Failure(ex.Message);
            }
        }
    }
}
