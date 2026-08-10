const Loading = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <p className="mt-3">
        Loading employees...
      </p>
    </div>
  );
};

export default Loading;