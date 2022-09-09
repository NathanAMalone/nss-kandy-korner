export const Product = ({ productObject, handleSaveButtonClick }) => {
    <section className="product" key={`product--${productObject.id}`}>
        <section>
            <div>Name: {productObject.productName}</div>
            <div>Price: {productObject.productPrice}</div>
        </section>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Purchase
        </button>
    </section>
}