import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewEmployees = () => {
    const [employee, updateEmployee] = useState({
        locationId: "",
        startDate: "",
        payRate:""
    })

    const [user, updateUser] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })

    const [locations, setLocations] = useState([])
    const [locationId, setLocationId] = useState(0)

    
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the product list
    */
    const navigate = useNavigate()

    // const localKandyUser = localStorage.getItem("kandy_user")
    // const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: user.isStaff
        }

        const employeeToSendToAPI = {
            locationId: locationId,
            startDate: employee.startDate,
            payRate: parseFloat(employee.payRate, 2)
        }

        // TODO: Perform the fetch() to POST the object to the API
    fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())
            .then(parsedResponse => {
                employeeToSendToAPI.userId = parsedResponse.id
                
                return fetch("http://localhost:8088/employees", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToAPI)
                })
                    .then(response => response.json())
                    .then(() => {
                        navigate("/employees")
                    })
            })
    }

    return (
        <form className="newEmployeeForm">
            <h2 className="newEmployeeForm__title">New Kandy Korner Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select className="locationDropDown"
                    onChange={
                        (evt) => {
                            
                                setLocationId(parseInt(evt.target.value))
                        }
                    }
                        >
                    <option value='0'>Select Location...</option>
                    {
                        locations.map(
                            (location) => {
                                return <option
                                    value={`${location.id}`}
                                    
                                     >{location.address}
                                </option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.startDate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate:</label>
                    <input type="number"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.payRate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Employee
            </button>
        </form>
    )
}
