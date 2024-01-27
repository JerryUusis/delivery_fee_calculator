interface DateProps {
    handleDateAndTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateProps> = ({ handleDateAndTime }) => {

    // Set the placeholder value to current time and day
    const getCurrentTime = ()  : string => {
        const currentDateandTime: Date = new Date()
        const day = currentDateandTime.getUTCDate().toString().padStart(2,"0")
        const month = (currentDateandTime.getUTCMonth() + 1).toString().padStart(2,"0")
        const year = currentDateandTime.getUTCFullYear().toString()
        const minute = currentDateandTime.getMinutes().toString().padStart(2,"0")
        const hour = currentDateandTime.getHours().toString().padStart(2,"0")
    
        return `${year}-${month}-${day}T${hour}:${minute}`
    }

    return (
        <div className="input-container">
            <label htmlFor="dateInput">Date</label>
            <input
                id="dateInput"
                type="datetime-local"
                data-test-id="orderTime"
                defaultValue={getCurrentTime()}
                onChange={handleDateAndTime}
            />
        </div>
    )
}

export default DateInput;