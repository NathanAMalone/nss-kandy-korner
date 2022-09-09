import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./orders.css"

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([])
    const [customer, setCustomer] = useState([])
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=product&customerId=${customer.id}`)
                .then(response => response.json())
                .then((purchaseArray) => {
                    setPurchases(purchaseArray)
                })

        },[customer]
    )
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers/`)
                .then(response => response.json())
                .then((customerArray) => {
                    const foundCustomer = customerArray.find(customer => {
                        return customer.userId === kandyUserObject.id
                    })
                    setCustomer(foundCustomer)
                })

        },[]
    )
    return purchases.map(
        (purchase) => {
            if (purchase.customerId === customer.id)
            return <section className="purchase" key={`purchase--${purchase.id}`}>
                <section>
                    <div>Name: {purchase?.product?.productName}</div>
                    <div>Price: {purchase?.product?.productPrice}</div>
                </section>
                </section>
            })

} 