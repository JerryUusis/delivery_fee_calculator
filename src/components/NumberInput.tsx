import { NumberInputProps } from '../types/NumberInputProps';

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  labelText,
  handleNumberInput,
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
        onChange={(event) => handleNumberInput(event, stateType)}
        data-test-id={dataTestId}
      />
      {valueType ? <p>{valueType}</p> : null}
    </div>
  )
}

export default NumberInput;