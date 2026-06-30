import { NavLink, useNavigate } from "react-router-dom";
import api from "../service/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      toast.success("Logout Successfully", { position: "bottom-right" });

      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Failed", { position: "bottom-right" });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">
          MERN Bank
        </h1>

        <div className="flex items-center gap-4">
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600 transition"
            }
          >
            Dashboard
          </NavLink>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;