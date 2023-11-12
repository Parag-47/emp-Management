//import { useEffect,useLayoutEffect } from "react";
//import axios from "axios";
//import {GoogleMap, useLoadScript, Marker} from  "@react-google-maps/api";
import {BiCurrentLocation} from 'react-icons/bi';
import { BsJustify } from "react-icons/bs";
import { FaTemperatureEmpty } from "react-icons/fa6";

function Header({ OpenSidebar }) {
  const location = localStorage.getItem("location");
  const temp = localStorage.getItem("temp");
  
  //useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
        console.log("The user's location is:", position);
        //console.log(latitude + " " + longitude);
      },
      (error) => {
        console.log(
          "The user did not give permission to share their location."
        );
      }
    );
  //},[]);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <h1 className="headerH1">Employee Management Syatem</h1>
      </div>
      <div className="header-right">
        <BiCurrentLocation className="icon" /> {location}
        <FaTemperatureEmpty className="icon" /> {temp + "°C"}
      </div>
    </header>
  );
}

export default Header;
