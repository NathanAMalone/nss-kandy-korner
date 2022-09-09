import { Link } from "react-router-dom"


export const Employee = ({ id, fullName, location, startDate, payRate, employee, getAllEmployees }) => {

    const deleteButton = () => {
    
            return <button onClick={() => {
                fetch(`http://localhost:8088/employees/${employee.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        fetch(`http://localhost:8088/users/${employee.user.id}`, {
                            method: "DELETE"
                    })
                    })
                    .then(() => {
                        getAllEmployees()
                    })
            }} className="ticket_Delete">Delete</button>
    }

    return <section className="employee">
        <div>
        Name: {fullName}
        </div>
        <div>Location: {location}</div>
        <div>Start Date: {startDate}</div>
        <div>Pay Rate: {payRate}</div>
        {
            deleteButton()
        }
    </section>
}