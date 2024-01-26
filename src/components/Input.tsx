import { InputProps } from '../types/InputProps';

const Input: React.FC<InputProps> = ({labelText, handleChange, stateType, valueType, dataTestId}) => {
    return (
        <div className="input-container">
        <label htmlFor="">{labelText}</label>
        <input 
          type="number" 
          min="0" 
          step={valueType === "€" ? "0.01" : "1"} 
          onChange={(e) => handleChange(e, stateType)}
          data-test-id={dataTestId}
           />
        {valueType ? <p>{valueType}</p> : null}
      </div>
    )
}

export default Input;