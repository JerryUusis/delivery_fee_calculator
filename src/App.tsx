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

  const calculateCartPrice = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    let totalPrice: number;
    totalPrice = cartValue;

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

  const calculateDistancePrice = (distanceLength: number): number => {
    const maximumPrice: number = 15;
    let distancePrice: number = 0;

    for (let i = 0; i < (distanceLength / 500); i++) {
      distancePrice += 1;
    }
    // Delivery price doesn't increase after 7001m
    return distanceLength <= 7000 ? distancePrice : maximumPrice;
  }

  const calculateItemsPrice = (itemAmount: number): number => {
    const bulkPrice: number = 1.20;

    const smallSurcharge: number = (itemAmount - 4) * 0.50;
    const bigSurcharge: number = smallSurcharge + bulkPrice;

    if (itemAmount < 5) {
      return 0;
    }
    return itemAmount > 12 ? bigSurcharge : smallSurcharge;
  }

  // Remember to put onSubmit on the form element

  return (
    <div>
      <h1>Delivery fee calculator</h1>
      <form >
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
