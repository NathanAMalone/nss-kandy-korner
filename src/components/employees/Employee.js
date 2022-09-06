import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, location, startDate, payRate }) => {
    return <section className="employee">
        <div>
        Name: {fullName}
        </div>
        <div>Location: {location}</div>
        <div>Start Date: {startDate}</div>
        <div>Pay Rate: {payRate}</div>
    </section>
}