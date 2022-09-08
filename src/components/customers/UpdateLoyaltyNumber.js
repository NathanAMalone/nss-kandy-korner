export const UpdateLoyaltyNumber = ({ loyaltyNumber, customer, updateCustomer, handleSaveButtonClick}) => {

    return  <>
                <fieldset>
                    <div className="customer-loyalty-number">
                        <label htmlFor="name">Loyalty Number:</label>
                        <input type="number"
                            className="form-control"
                            value={loyaltyNumber}
                            onChange={
                                (evt) => {
                                    // TODO: Update rate property
                                    const copy = {...customer}
                                    copy.loyaltyNumber = parseInt(evt.target.value)
                                    updateCustomer(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Loyalty Number
                </button>
                
            </>
}