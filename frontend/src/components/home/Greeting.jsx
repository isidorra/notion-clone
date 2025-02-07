import { useAuthContext } from "../../context/AuthContext";

const Greeting = () => {
    const {authUser} = useAuthContext();

    const getTimeBasedGreeting = () => {
        const currentHour = new Date().getHours();
      
        if (currentHour < 12) {
          return "Good Morning";
        } else if (currentHour < 18) {
          return "Good Afternoon";
        } else {
          return "Good Evening";
        }
      };
  return (
    <div>
        <h1 className="text-xl sm:text-2xl font-semibold">👋🏻 {getTimeBasedGreeting()}, {authUser.name}</h1>
    </div>
  )
}

export default Greeting