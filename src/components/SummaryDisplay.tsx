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
                <p data-test-id="fee" className="total-amount">Delivery total {deliveryTotal} €</p>
                <ul>
                    <li>Free delivery for order over 200 €</li>
                </ul>
                <p className="total-amount">Cart value {orderValue} €</p>
                {deliveryTotal ? <p data-test-id="fee" className="total-amount">Delivery total {deliveryTotal} €</p> : null}
                <p className="total">Total {parseFloat((price).toFixed(2))} €</p>
            </div>
        )
    }

    else if (deliveryTotal >= 15) {
        return (
            <div className="summary-container">
                <h2>Summary</h2>
                <div className="summary-list">
                    {deliveryTotal ? <p data-test-id="fee" className="total-amount">Delivery total {deliveryTotal} € (maximum)</p> : null}
                    <p className="total-amount">Cart value {orderValue} €</p>
                </div>
                    <p className="total">Total {parseFloat((price).toFixed(2))} €</p>
            </div>
        )
    }

    return (
        <div className="summary-container">
            <h2>Summary</h2>
            <div className="summary-list">
            {deliveryTotal ? <p data-test-id="fee" className="total-amount">Delivery total {deliveryTotal} €</p> : null}
                <ul>
                    {distanceSurcharge === 0 ? null : <li>Distance cost {distanceSurcharge} €</li>}
                    {itemsSurcharge === 0 ? null : <li>Extra items {itemsSurcharge} €</li>}
                    {smallPurchaseSurcharge === 0 ? null : <li>Small purchase fee {smallPurchaseSurcharge} €</li>}
                    {rushHour === true ? <li>Rush hour multiplier: {parseFloat((deliveryTotal / 1.2).toFixed(2))} € x 1.2 = {parseFloat((deliveryTotal).toFixed(2))} € </li> : null}
                </ul>
                {orderValue === 0 ? null : <p  className="total-amount">Cart value {orderValue} €</p>}
            </div>
            {price === 0 ? null : <p className="total">Total {parseFloat((price).toFixed(2))} €</p>}
        </div>
    )
}

export default SummaryDisplay;