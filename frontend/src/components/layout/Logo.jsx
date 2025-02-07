import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-1">
        <img src={logo} alt="Notionz Logo" className="w-6"/>
        <span className="font-semibold text-xl">Notionz</span>
    </Link>
  )
}

export default Logo