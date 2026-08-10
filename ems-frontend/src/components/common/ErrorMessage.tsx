interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({
  message,
}: ErrorMessageProps) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;