interface SummaryProps {
    orderValue: number
    distanceSurcharge: number
    itemsSurcharge: number
    smallPurchaseSurcharge: number
    rushHour: boolean
    price: number
}

const SummaryDisplay: React.FC<SummaryProps> = ({ orderValue, distanceSurcharge, itemsSurcharge, smallPurchaseSurcharge, rushHour, price }) => {

    return (
        <div>
            <h2>Summary</h2>
            <p>Purchase value {orderValue} €</p>
            <ul>
                {distanceSurcharge === 0 ? null : <li>Delivery {distanceSurcharge} €</li>}
                {itemsSurcharge === 0 ? null : <li>Extra items {itemsSurcharge} €</li>}
                {smallPurchaseSurcharge === 0 ? null : <li>Small purchase fee {smallPurchaseSurcharge} €</li>}
                {rushHour === true ? <li>Rush hour multiplier for surchrage fees x 1.2</li> : null}
            </ul>
            <p>Total: {price} €</p>
        </div>
    )
}

export default SummaryDisplay;