import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import avater from "../assets/images/user.png";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../assets/js/Context";

function AdminNavbar({ navHeader }) {
  const navigate = useNavigate();
  const { instance } = useStateContext();

  const [authUser, setAuthUser] = useState({});

  const token = localStorage.getItem("admintoken");

  useEffect(() => {
    if (token === null) {
      navigate("/admin");
    }
    instance.get("/api/user/me")
    .then((res) => setAuthUser(res.data));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { showSideBar } = useStateContext();
  const logMeOut = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin");
  };
  return (
    <div className="navbar">
      <div className="toggle_icon">
        {navHeader !== "My Houses" && (
          <BiArrowBack
            onClick={() => navigate("/admin/dashboard")}
            className="mr-2 cursor-pointer "
          />
        )}
        {showSideBar && <h3>{navHeader}</h3>}
      </div>

      <div className="avater" onClick={() => navigate(`/admin/update-user`)}>
        <button onClick={logMeOut} className="bg-cyan-500 text-sm h-8 px-3">
          Logout
        </button>

        <img
          className="rounded-2xl"
          src={!authUser ? avater : authUser.avater}
          alt=""
          width={60}
        />
        <div className="text-gray text-sm pr-2 flex">
          <span>Hi</span>, <span className="font-bold capitalize"> {authUser.name}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
