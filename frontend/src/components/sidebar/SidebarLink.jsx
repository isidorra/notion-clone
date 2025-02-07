import { Link } from "react-router-dom";

const SidebarLink = ({link, label, icon}) => {
  return (
    <Link to={link} className="opacity-70 flex items-center gap-2 p-1 pl-2 hover:bg-neutral-600 duration-200 rounded-md">
      <img src={icon}/>
      <span className="text-sm">{label}</span>
    </Link>
  )
}

export default SidebarLink