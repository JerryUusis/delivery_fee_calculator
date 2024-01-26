interface DateProps {
    handleDateAndTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateProps> = ({ handleDateAndTime }) => {
    return (
        <div className="input-container">
            <label htmlFor="dateInput">Date</label>
            <input
                id="dateInput"
                type="datetime-local"
                data-test-id="orderTime"
                onChange={handleDateAndTime}
            />
        </div>
    )
}

export default DateInput;