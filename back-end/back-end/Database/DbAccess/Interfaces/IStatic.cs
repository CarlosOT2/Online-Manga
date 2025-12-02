using back_end.Shared.Core;

namespace back_end.Database.DbAccess.Interfaces
{
    public interface IStatic
    {
        Task<Result<DTOs.Static>> GetAllStaticData();
    }
}
