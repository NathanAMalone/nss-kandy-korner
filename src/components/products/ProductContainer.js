import { useState } from "react"
import { ProductList } from "./productList"
import { ProductSearch } from "./ProductSearch"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return(<>
        <ProductSearch setterFunction={setSearchTerms} />
        <ProductList searchTermState={searchTerms} /> 
        </>
    )
}