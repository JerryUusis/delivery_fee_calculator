interface DateProps {
    handleDateAndTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateProps> = ({ handleDateAndTime }) => {
    return (
        <div className="date-input-container">
            <label htmlFor="date-input">Date</label>
            <input
                required
                min={new Date().toISOString().slice(0, -8)}
                id="date-input"
                type="datetime-local"
                data-test-id="orderTime"
                onChange={handleDateAndTime}
            />
        </div>
    )
}

export default DateInput;