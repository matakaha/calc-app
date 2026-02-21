import Button from './Button';
import './ButtonPanel.css';

const BUTTONS = [
  { label: 'AC', className: 'function' },
  { label: 'DEL', className: 'function' },
  { label: '+/−', className: 'function' },
  { label: '÷', className: 'operator' },
  { label: '7', className: '' },
  { label: '8', className: '' },
  { label: '9', className: '' },
  { label: '×', className: 'operator' },
  { label: '4', className: '' },
  { label: '5', className: '' },
  { label: '6', className: '' },
  { label: '−', className: 'operator' },
  { label: '1', className: '' },
  { label: '2', className: '' },
  { label: '3', className: '' },
  { label: '+', className: 'operator' },
  { label: '0', className: 'wide' },
  { label: '.', className: '' },
  { label: '=', className: 'operator' },
];

function ButtonPanel({ onButtonClick, activeOperator }) {
  return (
    <div className="button-panel">
      {BUTTONS.map((btn) => {
        let extraClass = btn.className;
        if (
          btn.className === 'operator' &&
          activeOperator &&
          btn.label === activeOperator
        ) {
          extraClass += ' active';
        }
        return (
          <div
            key={btn.label}
            className={`button-wrapper${btn.label === '0' ? ' span-two' : ''}`}
          >
            <Button
              label={btn.label}
              onClick={onButtonClick}
              className={extraClass}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ButtonPanel;
