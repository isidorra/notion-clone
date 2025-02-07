import { Link } from "react-router-dom"
import Logo from "./Logo"

const Navbar = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto p-3 flex items-center justify-between">
        <Logo/>

        <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
            <Link to={"/login"} className="rounded-md py-1 md:py-[6px] px-4 md:px-5 hover:bg-neutral-200 duration-200">Log in</Link>
            <Link to={"/sign-up"} className="bg-[#1a1a1a] text-white rounded-md py-1 md:py-[6px] px-4 md:px-8 hover:bg-neutral-600 duration-200">Sign up</Link>
        </div>
    </div>
  )
}

export default Navbar