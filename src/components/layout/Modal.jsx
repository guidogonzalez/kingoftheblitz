import "../../styles/global.css";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {title && <h2>{title}</h2>}

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
