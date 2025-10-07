import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
const MainLayout = () => {
  return (
    <>
      <div className="flex h-screen bg-main-color relative overflow-hidden">
        <div>
          <Sidebar />
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
