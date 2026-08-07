interface EmptyStateProps {
  message: string;
}

function EmptyState ({ message }: EmptyStateProps) {
  return (
    <div className="alert alert-info mt-4">
      {message}
    </div>
  );
};

export default EmptyState;