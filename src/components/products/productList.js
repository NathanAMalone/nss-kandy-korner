import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [topPriced, setTopPriced] = useState(false)


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

    
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
                            <div>Name: {product.productName}</div>
                            <div>Price: {product.productPrice}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}