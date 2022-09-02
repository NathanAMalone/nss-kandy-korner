import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email }) => {
    return <section className="employee">
        <div>
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Location: {location}</div>
        <div>Start Date: {startDate}</div>
        <div>Pay Rate: {payRate}</div>
    </section>
}