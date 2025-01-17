interface Props {
  error?: string | null;
}

const ErrorElement: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error && (
        <div
          className="p-4 mb-4 text-sm rounded-lg bg-red-100 dark:bg-gray-200 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}
    </>
  );
};

export default ErrorElement;
