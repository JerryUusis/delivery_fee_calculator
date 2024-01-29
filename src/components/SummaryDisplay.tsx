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

    if (orderValue >= 200) {
        return (
            <div className="summary-container">
                <h2>Summary</h2>
                <p>Cart value {orderValue} €</p>
                <ul>
                    <li>Free delivery! (Cart value larger than 199€)</li>
                </ul>
                {deliveryTotal ? <p data-test-id="fee">Delivery total {deliveryTotal} €</p> : null}
                <p>Total: {price} €</p>
            </div>
        )
    }

    else if (deliveryTotal >= 15) {
        return (
            <div className="summary-container">
                <h2>Summary</h2>
                <p>Cart value {orderValue} €</p>
                <ul>
                    <li>Maximum delivery price reached {deliveryTotal}</li>
                </ul>
                {deliveryTotal ? <p data-test-id="fee">Delivery total {deliveryTotal} €</p> : null}
                <p>Total: {price} €</p>
            </div>
        )
    }

    return (
        <div className="summary-container">
            <h2>Summary</h2>
            {orderValue === 0 ? null : <p>Cart value {orderValue} €</p>}
            <ul>
                {distanceSurcharge === 0 ? null : <li>Distance cost {distanceSurcharge} €</li>}
                {itemsSurcharge === 0 ? null : <li>Extra items {itemsSurcharge} €</li>}
                {smallPurchaseSurcharge === 0 ? null : <li>Small purchase fee {smallPurchaseSurcharge} €</li>}
                {rushHour === true ? <li>Rush hour multiplier for surcharge fees: {parseFloat((deliveryTotal / 1.2).toFixed(2))} € x 1.2 = {parseFloat((deliveryTotal).toFixed(2))} € </li> : null}
            </ul>
            {deliveryTotal ? <p data-test-id="fee">Delivery total {deliveryTotal} €</p> : null}
            {price === 0 ? null : <p className="total">Total: {price} €</p>}
        </div>
    )
}

export default SummaryDisplay;