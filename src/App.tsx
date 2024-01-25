import React, { useState } from 'react'
import Input from './components/Input';

function App() {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [cartItems, setCartItems] = useState<number>(0);
  const [price, setPrice] = useState<number>(0)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const inputValue: number = parseFloat(event.target.value);
    // If input value isNaN then set it to 0
    const newValue = isNaN(inputValue) ? 0 : inputValue;

    setState(newValue)
  }

  const calculateDeliveryPrice = (distanceLength: number) => {
    const minimumPrice: number = 1;
    const maximumPrice: number = 15;
    let distancePrice: number = 0;

    for (let i = 0; i < (distanceLength / 500); i++) {
      distancePrice += 1;
    }

    if (distanceLength <= 500) {
      return minimumPrice
    }

    else if (distanceLength > 500 && distanceLength < 7500) {
      return distancePrice
    }

    else if (distanceLength >= 7500) {
      return maximumPrice
    }
  }

  console.log(calculateDeliveryPrice(7000))

  const calculatePrice = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    let totalPrice: number;
    totalPrice = cartValue;

    let deliveryDist: number = deliveryDistance;

    // Calculate surcharge
    if (totalPrice < 10) {
      // Round to two decimals
      const surCharge = 10 - totalPrice;
      totalPrice += surCharge
      // Use the method below to print the correct rounding
      // console.log("Surchage is ", parseFloat(surCharge.toFixed(2)))
      // console.log("Total price is ", totalPrice)
    }
  }

  return (
    <div>
      <h1>Delivery fee calculator</h1>
      <form onSubmit={calculatePrice}>
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
