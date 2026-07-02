import "./ConfirmModal.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p className="confirm-modal__text">{message}</p>
        <div className="confirm-modal__actions">
          <button className="btn_ok" onClick={onConfirm}>Да</button>
          <button className="btn_cancel" onClick={onCancel}>Нет</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;