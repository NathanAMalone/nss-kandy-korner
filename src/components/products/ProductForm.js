import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({
        productName: "",
        productPrice: 0,
        productTypeId: 0
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the product list
    */
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
    const productToSendToAPI = {
        userId: kandyUserObject.id,
        productName: product.productName,
        productPrice: product.productPrice,
        productTypeId: product.productTypeId
    }

        // TODO: Perform the fetch() to POST the object to the API
    return fetch("http://localhost:8088/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSendToAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/products")
        })
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Kandy Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={product.productName}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productPrice">Product Price:</label>
                    <input type="number"
                        value={product.productPrice}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productPrice = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <input type="number"
                        value={product.productTypeId}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}