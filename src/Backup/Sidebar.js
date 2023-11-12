import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  BsGrid1X2Fill,
  BsArrowRepeat,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const nav = useNavigate();
  const auth = getAuth();

  const logout = () => {
    signOut(auth).then(() => {
        localStorage.clear();
        nav("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img
            src={localStorage.getItem("profilePic")===null? "https://img.icons8.com/3d-fluency/94/user-male-circle.png" : localStorage.getItem("profilePic")}
            className="icon_header"
          />
          {localStorage.getItem("name") === null
            ? "Unknown"
            : localStorage.getItem("name")}
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className="sidebar-list-item"
          onClick={(event) => {
            nav("/");
          }}
        >
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={(event) => {
            nav("/view");
          }}
        >
          <a href="">
            <BsPeopleFill className="icon" /> View
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={(event) => {
            nav("/create");
          }}
        >
          <a href="">
            <FiUserPlus className="icon" /> Create
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={(event) => {
            nav("/update");
          }}
        >
          <a href="">
            <BsArrowRepeat className="icon" /> Update
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item" onClick={logout}>
          <a href="">
            <BsFillGearFill className="icon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
