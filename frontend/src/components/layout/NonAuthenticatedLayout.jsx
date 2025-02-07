import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const NonAuthenticatedLayout = () => {
  return (
    <div className="text-[#1a1a1a]">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default NonAuthenticatedLayout