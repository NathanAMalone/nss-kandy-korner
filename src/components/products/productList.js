import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [topPriced, setTopPriced] = useState(false)
    const [customer, updateCustomer] = useState({
        id: 0,
        loyaltyNumber: 0
    })
    const {productId} = useParams()
    const [product, updateProduct] = useState({
        id: 0,
        productName: "",
        productPrice: 0,
        productTypeId: 0
    })
    


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers`)
                .then(response => response.json())
                .then((customerArray) => {
                    const foundCustomer = customerArray.find(customer => {
                        return customer.userId === kandyUserObject.id

                    })
                    updateCustomer(foundCustomer)
                })
        },
        []
    )
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/products/${product.id}`)
                .then(response => response.json())
                .then((productArray) => {
                    updateProduct(productArray)
                })
        },
        []
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        const productToSendToAPI = {
            customerId: customer.id,
            productId: parseInt(event.target.value),
            amountPurchased: 1
        }
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        return fetch (`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                window.alert("Purchase saved to My Orders")
            })

    }
    
    useEffect(
        () => {
            const searchedProducts = products.filter(product => product.productName.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setFiltered(searchedProducts)
        },
        [searchTermState]
    )
    
    useEffect(
        () => {
            if (topPriced) {
                const topPricedProducts = products.filter(product => product.productPrice > 2)
                setFiltered(topPricedProducts)
            }
            else{
                setFiltered(products)
            }
        },
        [topPriced]
    )
    
    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=productName")
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )

    useEffect(
        () => {
                setFiltered(products)
        },
        [products]
    )


    return <>
        
            <>

            <button   onClick={() => { setTopPriced(!topPriced) } } >
                {topPriced
                ? "All Prices"
                : "Top Priced"}
                </button>

            </>
                 
         
         
        {
            kandyUserObject.staff
            ?
            <button   onClick={() => navigate("/product/create") } >Create Product</button>
            :""
        }
        <h2>List of Products</h2>
            <article className="products">
            {
                kandyUserObject.staff
                ?
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <div>Name: {product.productName}</div>
                            <div>Price: {product.productPrice}</div>
                            <div>Category: {product.productType.candyCategory} </div>
                        </section>
                    }
                )
                :
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <section>
                                <div>Name: {product.productName}</div>
                                <div>Price: {product.productPrice}</div>
                            </section>
                            <button
                            value={product.id}
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                            className="btn btn-primary">
                             Purchase
                </button>
                        </section>
                    }
                )
            }
        </article>
    </>
}