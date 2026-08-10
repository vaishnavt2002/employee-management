interface EmptyStateProps {
  message: string;
}

const EmptyState = ({
  message,
}: EmptyStateProps) => {
  return (
    <div className="alert alert-info text-center" role="alert">
      {message}
    </div>
  );
};

export default EmptyState;