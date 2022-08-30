import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [topPriced, setTopPriced] = useState(false)


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            if (topPriced) {
                const topPricedProducts = products.filter(product => product.productPrice > 2)
                setFiltered(topPricedProducts)
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
            if (kandyUserObject.staff) {
                setFiltered(products)
            }
        },
        [products]
    )

    return <>
        {
            kandyUserObject.staff
            ?<>
            <button   onClick={() => { setTopPriced(true) } } >Top Priced</button>
            
            <h2>List of Products</h2>
            </>
            :<h2>Access Denied: Employees Only</h2>
        }
            <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <div>Name: {product.productName}</div>
                            <div>Price: {product.productPrice}</div>
                            <div>Category: {product.productType.candyCategory}</div>
                        </section>
                    }
                    )
            }
        </article>
    </>
}