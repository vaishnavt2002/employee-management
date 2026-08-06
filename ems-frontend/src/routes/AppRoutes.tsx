import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import EmployeeList from "../pages/EmployeeList";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import EmployeeDetails from "../pages/EmployeeDetailis";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/employees" element={<EmployeeList/>}/>
                    <Route path="/employees/add" element={<AddEmployee/>}/>
                    <Route path="/employees/edit/:id" element={<EditEmployee/>}/>
                    <Route path="/employees/:id" element={<EmployeeDetails/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;