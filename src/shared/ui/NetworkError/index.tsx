import "./styles.scss";

interface NetworkErrorProps {
  message: string;
  onRetry?: () => void;
}

export const NetworkError = ({ message, onRetry }: NetworkErrorProps) => {
  return (
    <div className="network-error">
      <div className="network-error__icon">⚠️</div>
      <div className="network-error__message">{message}</div>
      {onRetry && (
        <button className="network-error__retry" onClick={onRetry}>
          Повторить попытку
        </button>
      )}
    </div>
  );
};
