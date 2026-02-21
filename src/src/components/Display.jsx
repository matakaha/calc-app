import './Display.css';

function Display({ value }) {
  return (
    <div className="display">
      <div className="display-text">{value}</div>
    </div>
  );
}

export default Display;
