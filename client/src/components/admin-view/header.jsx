import { LogOut } from "lucide-react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice";

function AdminHeader() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logout calles");

    dispatch(logoutUser());
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => {
            console.log("Log out");
            handleLogout();
          }}
          sx={{
            color: "black",
            bgcolor: "white",
            "&:hover": {
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
