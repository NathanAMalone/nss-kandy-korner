import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeList } from "../employees/employeeList"
import { NewEmployees } from "../employees/newEmployeesForm"
import { LocationList } from "../locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/productList"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet />
				</>
			}>
	
				<Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
				<Route path="product/create" element={ <ProductForm />} />
				<Route path="employee/create" element={ <NewEmployees />} />
				<Route path="employees" element={ <EmployeeList /> } />
				<Route path="customers" element={ <CustomerList /> } />
				<Route path="customers/:customerId" element={ <CustomerDetails />  } />




			</Route>
		</Routes>
	)
}