import React, { useState } from 'react'
import NumberInput from './components/NumberInput';
import DateInput from './components/Date'
import SummaryTypes from './types/SummaryTypes';
import SummaryDisplay from './components/SummaryDisplay';

function App() {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [cartItems, setCartItems] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [rushHour, setRushHour] = useState<boolean>(false)
  const [summary, setSummary] = useState<SummaryTypes>({
    orderValue: 0,
    smallPurchaseSurcharge: 0,
    distanceSurcharge: 0,
    itemsSurcharge: 0,
    rushHour: false,
    deliveryTotal: 0
  })

  const maximumDeliveryPrice: number = 15;

  const handleNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const inputValue: number = parseFloat(event.target.value);
    // If input value isNaN then set it to 0
    const newValue = isNaN(inputValue) ? 0 : inputValue;

    setState(newValue)
  }

  const handleDateAndTime = (event: React.ChangeEvent<HTMLInputElement>): string => {
    // selectedDate = "yyyy-mm-ddThh:mm"
    const selectedDate = event.target.value;
    // dateObject sample "Wed Nov 27 2024 10:03:00 GMT+0200 (Eastern European Standard Time)"
    const dateObjectString = new Date(selectedDate).toString();

    const time = dateObjectString.split(" ")[4] // time is used to split to get hours
    const weekday = dateObjectString.split(" ")[0].toLowerCase()

    const hour = parseInt(time.split(":")[0])

    // Determine if it's rush hour during Fridays from 15-19
    let isRushHour: boolean;
    if (weekday === "fri" && hour >= 15 && hour < 19) {
      isRushHour = true
    } else {
      isRushHour = false;
    }
    setRushHour(isRushHour)

    return dateObjectString
  }

  const smallPurchaseSurcharge = (cartItemsValue: number): number => {
    let surcharge = 0;

    // Calculate surcharge for small order
    if (cartItemsValue < 10) {
      surcharge = 10 - cartItemsValue;
      cartItemsValue += surcharge
    }
    return parseFloat(surcharge.toFixed(2))
  }

  const calculateDistancePrice = (distanceLength: number): number => {
    let distancePrice: number = 0;

    for (let i = 0; i < (distanceLength / 500); i++) {
      distancePrice += 1;
    }
    if (distanceLength === 0) {
      return 1
    }
    // Delivery price doesn't increase after 7001m
    return distanceLength <= 7000 ? distancePrice : maximumDeliveryPrice;
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
    itemsAmount: number,
    rushHour: boolean
  ): void => {
    event.preventDefault();
    const smallCartSurcharge: number = smallPurchaseSurcharge(itemsValue);
    const distanceSurcharge: number = calculateDistancePrice(distance);
    const itemsAmountSurcharge: number = calculateItemsPrice(itemsAmount);

    let totalSurcharge: number = smallCartSurcharge + distanceSurcharge + itemsAmountSurcharge;

    if (rushHour === true) {
      totalSurcharge *= 1.2
    }

    // Free delivery for orders starting from 200e
    if (itemsValue >= 200) {
      totalSurcharge = 0;
      setSummary((previous) => ({
        ...previous,
        orderValue: itemsValue,
        smallPurchaseSurcharge: 0,
        distanceSurcharge: 0,
        itemsSurcharge: 0,
        rushHour: false,
        deliveryTotal: 0
      }))
      setPrice(itemsValue)
    }
    // Maximum delivery cost
    else if (totalSurcharge > maximumDeliveryPrice) {
      totalSurcharge = maximumDeliveryPrice;
      setSummary((previous) => ({
        ...previous,
        orderValue: itemsValue,
        smallPurchaseSurcharge: 0,
        distanceSurcharge: maximumDeliveryPrice,
        itemsSurcharge: 0,
        rushHour: false,
        deliveryTotal: totalSurcharge
      }))
      setPrice(itemsValue + totalSurcharge)
    }
    else {
      setSummary((previous) => ({
        ...previous,
        orderValue: itemsValue,
        smallPurchaseSurcharge: smallCartSurcharge,
        distanceSurcharge: distanceSurcharge,
        itemsSurcharge: itemsAmountSurcharge,
        rushHour,
        deliveryTotal: parseFloat(totalSurcharge.toFixed(2))
      }))
      setPrice(parseFloat((itemsValue + totalSurcharge).toFixed(2)))
    }
  }

  return (
    <div className='main-container'>
      <h1>Delivery fee calculator</h1>
      <form onSubmit={(event) => calculateDeliveryTotal(
        event,
        cartValue,
        deliveryDistance,
        cartItems,
        rushHour)}>
        <div className="input-fields-container">
          <NumberInput
            id='cart'
            labelText={"Cart value"}
            handleNumberInput={handleNumberInput}
            stateType={setCartValue}
            valueType='€'
            dataTestId='cartValue'
          />
          <NumberInput
            id='distance'
            labelText={"Delivery distance"}
            handleNumberInput={handleNumberInput}
            stateType={setDeliveryDistance}
            valueType='m'
            dataTestId='deliveryDistance'
          />
          <NumberInput
            id='items'
            labelText={"Amount of items"}
            handleNumberInput={handleNumberInput}
            stateType={setCartItems}
            valueType='items'
            dataTestId='numberOfItems'
          />
          <DateInput handleDateAndTime={handleDateAndTime} />
          <button type='submit'>Calculate delivery price</button>
        </div>
      </form>
        <SummaryDisplay
          {...summary}
          price={price}
        />
    </div>
  )
}

export default App
