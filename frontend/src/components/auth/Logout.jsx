import useLogout from "../../hooks/auth/useLogout"
import logoutIcon from "../../assets/logout.svg";

const Logout = () => {
    const {loading, logout} = useLogout();


  return (
    <button disabled={loading} onClick={logout} className="mx-auto py-2 px-6 rounded-md hover:bg-neutral-600 duration-200">
        {!loading && 
        <div className="flex items-center gap-2 text-sm">
            <img src={logoutIcon} className="rotate-180"/>
            Log out
        </div>}
        {loading && <span className="light-loader"></span>}
    </button>
  )
}

export default Logout