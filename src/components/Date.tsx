interface DateProps {
    chooseDate: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Date: React.FC<DateProps> = ({ chooseDate
}) => {
  return (
    <div className="input-container">
      <label htmlFor="dateInput">Date</label>
      <input
        id="dateInput"
        type="date"
        data-test-id="orderTime"
        onChange={chooseDate}
      />
    </div>
  )
}

export default Date;