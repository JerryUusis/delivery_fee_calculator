import { InputProps } from '../types/InputProps';

const Input: React.FC<InputProps> = ({labelText, handleChange, stateType, valueType}) => {
    return (
        <div className="input-container">
        <label htmlFor="">{labelText}</label>
        <input type="number" min="0" onChange={(e) => handleChange(e, stateType)} />
        {valueType ? <p>{valueType}</p> : null}
      </div>
    )
}

export default Input;