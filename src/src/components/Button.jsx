import './Button.css';

function Button({ label, onClick, className = '' }) {
  return (
    <button
      className={`calc-button ${className}`}
      onClick={() => onClick(label)}
      type="button"
    >
      {label}
    </button>
  );
}

export default Button;
