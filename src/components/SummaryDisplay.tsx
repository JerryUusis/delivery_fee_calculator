interface SummaryProps {
    orderValue: number
    distanceSurcharge: number
    itemsSurcharge: number
    smallPurchaseSurcharge: number
    price: number
}

const SummaryDisplay: React.FC<SummaryProps> = ({ orderValue, distanceSurcharge, itemsSurcharge, smallPurchaseSurcharge, price }) => {

    return (
        <div>
            <h2>Summary</h2>
            <p>Purchase value {orderValue} €</p>
            <ul>
                {distanceSurcharge === 0 ? null : <li>Delivery {distanceSurcharge} €</li>}
                {itemsSurcharge === 0 ? null : <li>Extra items {itemsSurcharge} €</li>}
                {smallPurchaseSurcharge === 0 ? null : <li>Small purchase fee {smallPurchaseSurcharge} €</li>}
            </ul>
            <p>Total: {price} €</p>
        </div>
    )
}

export default SummaryDisplay;