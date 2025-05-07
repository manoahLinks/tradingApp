import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

const Main = () => {
  return (
    <div className="flex flex-col h-screen text-xs md:text-sm w-full text-body bg-[#0A0A0B] overflow-y-scroll">
      <Navbar />
      <div className="flex flex-col flex-1 md:px-8 px-4 md:py-8 py-4">
        <Outlet />
      </div>
      <div className="bg-[#18203A] flex justify-between p-5 text-slate-100">
        <h4>instantchain@2023</h4>
        <div className="grid grid-cols-4 gap-x-2">
          <FaXTwitter />
          <FaDiscord />
          <i class="fa-solid fa-toolbox"></i>
        </div>
      </div>
    </div>
  );
};

export default Main;
