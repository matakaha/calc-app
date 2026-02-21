import { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';

const MAX_DISPLAY_LENGTH = 9;

/**
 * 数値を最大表示文字数に収まるようにフォーマットする。
 * 収まらない場合は小数部を切り捨てて収める。
 */
function formatDisplay(num) {
  if (!isFinite(num)) {
    return 'ERROR';
  }

  // 整数部の文字列
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // まず整数として表示を試みる
  if (Number.isInteger(num)) {
    const str = num.toString();
    if (str.length <= MAX_DISPLAY_LENGTH) {
      return str;
    }
    // 整数でも桁数オーバー → 切り捨てでは対応不可 → ERROR
    return 'ERROR';
  }

  // 小数を含む場合
  const intPart = Math.trunc(num).toString();
  if (intPart.length >= MAX_DISPLAY_LENGTH) {
    // 整数部だけでオーバー
    return 'ERROR';
  }

  // 使える小数桁数を計算（小数点で1文字使う）
  const availableDecimals = MAX_DISPLAY_LENGTH - intPart.length - 1;
  if (availableDecimals <= 0) {
    // 小数部を付ける余地なし → 整数部のみ
    const truncated = Math.trunc(num);
    return truncated.toString();
  }

  // 小数部を切り捨て（trunc方向）
  const factor = Math.pow(10, availableDecimals);
  let truncatedNum;
  if (num >= 0) {
    truncatedNum = Math.floor(absNum * factor) / factor;
  } else {
    truncatedNum = -(Math.floor(absNum * factor) / factor);
  }

  let result = truncatedNum.toFixed(availableDecimals);
  // 末尾の不要な0を削除
  if (result.includes('.')) {
    result = result.replace(/0+$/, '').replace(/\.$/, '');
  }

  // 最終チェック
  if (result.length > MAX_DISPLAY_LENGTH) {
    // 再度桁数を減らす
    const diff = result.length - MAX_DISPLAY_LENGTH;
    const newDecimals = availableDecimals - diff;
    if (newDecimals <= 0) {
      return Math.trunc(num).toString();
    }
    const factor2 = Math.pow(10, newDecimals);
    let val;
    if (num >= 0) {
      val = Math.floor(absNum * factor2) / factor2;
    } else {
      val = -(Math.floor(absNum * factor2) / factor2);
    }
    result = val.toFixed(newDecimals);
    if (result.includes('.')) {
      result = result.replace(/0+$/, '').replace(/\.$/, '');
    }
  }

  return result;
}

/**
 * 演算を実行する
 */
function calculate(left, operator, right) {
  const a = parseFloat(left);
  const b = parseFloat(right);

  switch (operator) {
    case '+':
      return a + b;
    case '−':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      if (b === 0) return 'ZERO_DIV';
      return a / b;
    default:
      return 'ERROR';
  }
}

function Calculator() {
  // displayValue: ディスプレイに表示する文字列
  const [displayValue, setDisplayValue] = useState('0');
  // firstOperand: 最初のオペランド（演算子押下時に保存）
  const [firstOperand, setFirstOperand] = useState(null);
  // operator: 現在選択中の演算子
  const [operator, setOperator] = useState(null);
  // waitingForSecondOperand: 演算子押下後、次の数字入力待ち状態
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  // isError: エラー状態
  const [isError, setIsError] = useState(false);

  const handleButtonClick = (label) => {
    // エラー状態では AC のみ受け付ける
    if (isError) {
      if (label === 'AC') {
        resetAll();
      }
      return;
    }

    if (label >= '0' && label <= '9') {
      handleDigit(label);
    } else if (label === '.') {
      handleDecimalPoint();
    } else if (['+', '−', '×', '÷'].includes(label)) {
      handleOperator(label);
    } else if (label === '=') {
      handleEquals();
    } else if (label === 'AC') {
      resetAll();
    } else if (label === 'DEL') {
      handleDelete();
    } else if (label === '+/−') {
      handleToggleSign();
    }
  };

  const handleDigit = (digit) => {
    if (waitingForSecondOperand) {
      // 演算子の後の最初の数字入力
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
      return;
    }

    if (displayValue === '0') {
      setDisplayValue(digit);
    } else {
      // 9文字制限チェック
      if (displayValue.length >= MAX_DISPLAY_LENGTH) return;
      setDisplayValue(displayValue + digit);
    }
  };

  const handleDecimalPoint = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    // 既に小数点がある場合は無視
    if (displayValue.includes('.')) return;
    // 9文字制限チェック
    if (displayValue.length >= MAX_DISPLAY_LENGTH) return;

    setDisplayValue(displayValue + '.');
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand !== null && operator && !waitingForSecondOperand) {
      // 連鎖計算: 前の演算を実行
      const result = calculate(firstOperand, operator, inputValue);

      if (result === 'ZERO_DIV') {
        setDisplayValue('ZERO DIV');
        setIsError(true);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }

      if (typeof result === 'string') {
        setDisplayValue(result);
        setIsError(true);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }

      const formatted = formatDisplay(result);
      if (formatted === 'ERROR') {
        setDisplayValue('ERROR');
        setIsError(true);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }

      setDisplayValue(formatted);
      setFirstOperand(result);
    } else {
      setFirstOperand(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) return;

    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, operator, inputValue);

    if (result === 'ZERO_DIV') {
      setDisplayValue('ZERO DIV');
      setIsError(true);
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    if (typeof result === 'string') {
      setDisplayValue(result);
      setIsError(true);
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    const formatted = formatDisplay(result);
    if (formatted === 'ERROR') {
      setDisplayValue('ERROR');
      setIsError(true);
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    setDisplayValue(formatted);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleDelete = () => {
    if (waitingForSecondOperand) return;

    if (displayValue.length === 1) {
      setDisplayValue('0');
    } else if (displayValue.startsWith('-') && displayValue.length === 2) {
      setDisplayValue('0');
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    if (waitingForSecondOperand) return;
    if (displayValue === '0') return;

    if (displayValue.startsWith('-')) {
      setDisplayValue(displayValue.slice(1));
    } else {
      // 符号追加で9文字を超えないかチェック
      if (displayValue.length >= MAX_DISPLAY_LENGTH) return;
      setDisplayValue('-' + displayValue);
    }
  };

  const resetAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setIsError(false);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <ButtonPanel
        onButtonClick={handleButtonClick}
        activeOperator={waitingForSecondOperand ? operator : null}
      />
    </div>
  );
}

export default Calculator;
