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

  const smallPurchaseSurcharge = (cartItemsValue: number): number => {
    let totalPrice: number;
    totalPrice = cartItemsValue;
    let surcharge = 0;

    // Calculate surcharge for small order
    if (totalPrice < 10) {
      // Round to two decimals
      surcharge = 10 - totalPrice;
      totalPrice += surcharge
      // Use the method below to print the correct rounding
    }
    return parseFloat(surcharge.toFixed(2))
  }

  const calculateDistancePrice = (distanceLength: number): number => {
    const maximumPrice: number = 15;
    let distancePrice: number = 0;

    for (let i = 0; i < (distanceLength / 500); i++) {
      distancePrice += 1;
    }
    if (distanceLength === 0) {
      return 1
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

  const calculateDeliveryTotal = (
    event: React.FormEvent<HTMLFormElement>,
    itemsValue: number, 
    distance: number, 
    itemsAmount: number
  ): void => {
    event.preventDefault();
    const smallCartSurcharge: number = smallPurchaseSurcharge(itemsValue);
    const distanceSurcharge: number = calculateDistancePrice(distance);
    const itemsAmountSurcharge: number = calculateItemsPrice(itemsAmount);

    let totalSurcharge: number = smallCartSurcharge + distanceSurcharge + itemsAmountSurcharge;

    if (itemsValue >= 200) {
      totalSurcharge = 0;
    }
    else if (totalSurcharge > 15) {
      totalSurcharge = 15;
    }
    setPrice(totalSurcharge + itemsValue)
  }


  return (
    <div>
      <h1>Delivery fee calculator</h1>
      <form onSubmit={(event) => calculateDeliveryTotal(
        event, 
        cartValue, 
        deliveryDistance, 
        cartItems)}>
        <Input
          labelText={"Cart value"}
          handleChange={handleChange}
          stateType={setCartValue}
          valueType='€'
          dataTestId='cartValue'
        />
        <Input
          labelText={"Delivery distance"}
          handleChange={handleChange}
          stateType={setDeliveryDistance}
          valueType='m'
          dataTestId='deliveryDistance'
        />
        <Input
          labelText={"Amount of items"}
          handleChange={handleChange}
          stateType={setCartItems}
          dataTestId='numberOfItems'
        />
        <button type='submit'>Calculate delivery price</button>
      </form>
      <p>Delivery price: {price} €</p>
    </div>
  )
}

export default App
