import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UpdateLoyaltyNumber } from "./UpdateLoyaltyNumber"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({
        loyaltyNumber: 0

    })

     useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                     const singleCustomer = data[0]
                     updateCustomer(singleCustomer)
                })
        },
        [customerId]
     )
    
     const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const numberToSendToAPI = {
            loyaltyNumber: customer.loyaltyNumber
        }
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        return fetch (`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(numberToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                window.alert("Loyalty number successfully saved")
            })

    }

    return <form className="customer_profile">
        <h2 className="profile__title">Update Customer Profile</h2>
        <section className="customer">
        <header className="customer_header">{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div className="cust-loyal-number">
          <UpdateLoyaltyNumber 
                loyaltyNumber={customer.loyaltyNumber} 
                customer={customer}
                updateCustomer={updateCustomer}
                handleSaveButtonClick={handleSaveButtonClick}/>
        </div>
    </section>
    </form>
}