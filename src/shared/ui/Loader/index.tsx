import "./styles.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <div className="loader__text">Загрузка...</div>
    </div>
  );
};
