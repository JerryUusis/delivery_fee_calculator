import React, { useState } from 'react'
import NumberInput from './components/NumberInput';
import DateInput from './components/Date'
import SummaryTypes from './types/SummaryTypes';
import { DateTimeObject } from './types/DateObject';
import SummaryDisplay from './components/SummaryDisplay';

function App() {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [cartItems, setCartItems] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<DateTimeObject | null>(null)
  const [rushHour, setRushHour] = useState<boolean>(false)
  const [summary, setSummary] = useState<SummaryTypes>({
    orderValue: 0,
    smallPurchaseSurcharge: 0,
    distanceSurcharge: 0,
    itemsSurcharge: 0,
    rushHour: false
  })

  const handleNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const inputValue: number = parseFloat(event.target.value);
    // If input value isNaN then set it to 0
    const newValue = isNaN(inputValue) ? 0 : inputValue;

    setState(newValue)
  }

  const handleDateAndTime = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = event.target.value;
    // selectedDate = "yyyy-mm-ddThh:mm"
    const dateObject = new Date(selectedDate).toString();
    // dateObject sample "Wed Nov 27 2024 10:03:00 GMT+0200 (Eastern European Standard Time)"

    const day = dateObject.split(" ")[2]
    const month = dateObject.split(" ")[1].toLowerCase()
    const year = dateObject.split(" ")[3]
    const time = dateObject.split(" ")[4] // time is used to split to get hours and minutes
    const weekday = dateObject.split(" ")[0].toLowerCase()

    const hour = parseInt(time.split(":")[0])
    const minute = parseInt(time.split(":")[1])

    const dateTimeObject: DateTimeObject = {
      day: day,
      month: month,
      year: year,
      minute: minute,
      hour: hour,
      weekday: weekday
    }

    setDate(dateTimeObject)

    let isRushHour: boolean;
    if (dateTimeObject.weekday === "fri" && dateTimeObject.hour >= 15 && dateTimeObject.hour <= 19) {
      isRushHour = true
    } else {
      isRushHour = false;
    }
    setRushHour(isRushHour)
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

    if (itemsValue >= 200) {
      totalSurcharge = 0;
      setSummary((previous) => ({
        ...previous,
        orderValue: itemsValue,
        smallPurchaseSurcharge: 0,
        distanceSurcharge: 0,
        itemsSurcharge: 0,
        rushHour: false
      }))
      setPrice(itemsValue)
    }
    else if (totalSurcharge > 15) {
      totalSurcharge = 15;
      setSummary((previous) => ({
        ...previous,
        orderValue: itemsValue,
        smallPurchaseSurcharge: 0,
        distanceSurcharge: 15,
        itemsSurcharge: 0,
        rushHour: false
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
        rushHour
      }))
      setPrice(itemsValue + totalSurcharge)
    }
  }

  return (
    <div>
      <h1>Delivery fee calculator</h1>
      <form onSubmit={(event) => calculateDeliveryTotal(
        event,
        cartValue,
        deliveryDistance,
        cartItems,
        rushHour)}>
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
          dataTestId='numberOfItems'
        />
        <DateInput
          handleDateAndTime={handleDateAndTime}
        />
        <button type='submit'>Calculate delivery price</button>
      </form>
      <SummaryDisplay
        {...summary}
        price={price}
      />

      {/* <h2>Summary</h2>
      <ul>
        <li>Order value {summary.orderValue} €</li>
        {summary.distanceSurcharge === 0 ? null : <li>Delivery {summary.distanceSurcharge} €</li>}
        {summary.itemsSurcharge === 0 ? null : <li>Extra items {summary.itemsSurcharge} €</li>}
        {summary.smallPurchaseSurcharge === 0 ? null :<li>Small purchase fee {summary.smallPurchaseSurcharge} €</li>}
      </ul>
      <p>Total: {price} €</p> */}
    </div>
  )
}

export default App
