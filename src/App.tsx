import React, { useState } from 'react'
import Input from './components/Input';

function App() {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [cartItems, setCartItems] = useState<number>(0);
  
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    setState: React.Dispatch<React.SetStateAction<number>>
    ) => {
    const inputValue = parseFloat(event.target.value);
    // If input value isNaN then set it to 0
    const newValue = isNaN(inputValue) ? 0 : inputValue;
    setState(newValue)
  }

  return (
    <div>
      <h1>Delivery fee calculator</h1>
      <form>
        <Input 
        labelText={"Cart value"}
        handleChange={handleChange}
        stateType={setCartValue}
        valueType='€'
        />
        <Input 
        labelText={"Delivery distance"}
        handleChange={handleChange}
        stateType={setDeliveryDistance}
        valueType='m'
        />
        <Input 
        labelText={"Amount of items"}
        handleChange={handleChange}
        stateType={setCartItems}
        />
      <button type='submit'>Calculate delivery price</button>
      </form>
      <p>Delivery price: 10€</p>
    </div>
  )
}

export default App
