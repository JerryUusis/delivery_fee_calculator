import { InputProps } from '../types/InputProps';

const Input: React.FC<InputProps> = ({
  id,
  labelText,
  handleChange,
  stateType,
  valueType,
  dataTestId
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type="number"
        min="0"
        step={valueType === "€" ? "0.01" : "1"}
        onChange={(event) => handleChange(event, stateType)}
        data-test-id={dataTestId}
      />
      {valueType ? <p>{valueType}</p> : null}
    </div>
  )
}

export default Input;