import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.svg";
const Hero = () => {
  return (
    <div className="max-w-[400px] w-full mx-auto text-center py-24 px-5 md:px-2">
        <h1 className="text-2xl md:text-4xl font-semibold">Write. Plan. Create.</h1>
        <p className="text-sm md:test-base">Where your work flows naturally—faster and easier.</p>
        <Link to={"/sign-up"} className="bg-[#1a1a1a] mt-3 block text-white rounded-md py-[6px] px-8 hover:bg-neutral-600 duration-200">Sign up</Link>
        <img src={hero1} className="mx-auto w-2/3 md:w-96 mt-10"/>
    </div>
  )
}

export default Hero