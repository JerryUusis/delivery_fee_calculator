interface SummaryProps {
    orderValue: number
    distanceSurcharge: number
    itemsSurcharge: number
    smallPurchaseSurcharge: number
    rushHour: boolean
    deliveryTotal: number
    price: number
}

const SummaryDisplay: React.FC<SummaryProps> = ({
    orderValue,
    distanceSurcharge,
    itemsSurcharge,
    smallPurchaseSurcharge,
    rushHour,
    deliveryTotal,
    price }) => {

    return (
        <div>
            <h2>Summary</h2>
            <p>Purchase value {orderValue} €</p>
            <ul>
                {distanceSurcharge === 0 ? <li>Free delivery!</li> : <li>Distance cost {distanceSurcharge} €</li>}
                {itemsSurcharge === 0 ? null : <li>Extra items {itemsSurcharge} €</li>}
                {smallPurchaseSurcharge === 0 ? null : <li>Small purchase fee {smallPurchaseSurcharge} €</li>}
                {rushHour === true ? <li>Rush hour multiplier for surchrage fees: {deliveryTotal} € x 1.2 = {parseFloat((deliveryTotal * 1.2).toFixed(2))} € </li> : null}
            </ul>
            {deliveryTotal ? <p>Delivery total {deliveryTotal} €</p> : null}
            <p>Total: {price} €</p>
        </div>
    )
}

export default SummaryDisplay;