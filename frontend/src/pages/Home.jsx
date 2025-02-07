import Greeting from "../components/home/Greeting"
import RecentlyEdited from "../components/home/RecentlyEdited"

const Home = () => {
  return (
    <div className="px-5 py-16 sm:p-10"> 
        <Greeting/>
        <RecentlyEdited/>
    </div>
  )
}

export default Home