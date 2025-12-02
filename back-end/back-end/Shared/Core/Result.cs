namespace back_end.Shared.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public string? Message { get; }
        public T? Value { get; }

        protected Result(bool isSuccess, T? value, string? message)
        {
            IsSuccess = isSuccess;
            Value = value;
            Message = message;
        }

        public static Result<T> Success(T? value, string? message = null) => new Result<T>(true, value, message);
        public static Result<T> Failure(string message) => new Result<T>(false, default, message);
    }
}
