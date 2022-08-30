import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet />
				</>
			}>
	
				<Route path="locations" element={ <LocationList /> } />
			</Route>
		</Routes>
	)
}

