import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const Main = () => {
    return (
        <div className="flex flex-col h-screen text-xs md:text-sm w-full text-body bg-[#0A0A0B] overflow-y-scroll">
            <Navbar/>
            <div className="flex flex-col flex-1 md:px-8 px-4 md:pt-8">
                <Outlet/>
            </div>
        </div>
     );
}
 
export default Main;