import { useAuthContext } from "../../context/AuthContext"

const UserProfile = () => {
    const {authUser} = useAuthContext();
  return (
    <div className="text-nowrap flex items-center gap-2 overflow-x-scroll pb-4">
        <span className="w-5 flex items-center justify-center h-5 p-3 bg-neutral-600 rounded-md text-sm text-white">{authUser.name.substring(0, 1).toLowerCase()}</span>
        <span className="text-sm">{authUser.name}&apos;s Notionz</span>
    </div>
  )
}

export default UserProfile