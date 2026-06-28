import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* {admin sidebar} */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col relative">
        {/* {admin header} */}
        <AdminHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
