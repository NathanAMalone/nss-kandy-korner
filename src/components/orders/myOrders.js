import { useEffect, useState } from "react"
import "./orders.css"

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=product`)
                .then(response => response.json())
                .then((purchaseArray) => {
                    setPurchases(purchaseArray)
                })

        }
    )

    return purchases.map(
            (purchase) => {
            return <section className="purchase" key={`purchase--${purchase.id}`}>
                <section>
                    <div>Name: {purchase?.product?.productName}</div>
                    <div>Price: {purchase?.product?.productPrice}</div>
                </section>
                </section>
            })

}