import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [users, setUsers] = useState([])

    const getAllEmployees = () => {
        fetch('http://localhost:8088/employees?_expand=user&_expand=location')
                    .then(response => response.json())
                    .then((employeeArray) => {
                        setEmployees(employeeArray)
                    })
    }
    


    useEffect(
        () => {
            fetch('http://localhost:8088/employees?_expand=user&_expand=location')
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )
    
    UseEffect(
        () => {
            fetch('http://localhost:8088/users')
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
        },
        []
    )
    

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.user.fullName}
                location={employee.location.address}
                startDate={employee.startDate}
                payRate={employee.payRate} 
                employee={employee}
                getAllEmployees={getAllEmployees}/>)    
        }
    </article>
}  