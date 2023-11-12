import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Verify() {

  const nav = useNavigate();
  const rCode = useRef();
  const [code, setCode] = useState("");

  const hCode = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    let verify = localStorage.getItem("verify");
    if (!verify) 
      nav("/");
  }, []);

  const verifyEmail = async (event) => {
    event.preventDefault();
   /* const Ucode = code;
    try {
      await axios.post("http://localhost:9000/check",{code}).then((res)=>{
        if(res.data.sucesses)
          alert(res.data.message);
      });
    } catch (error) {
      
    }*/
    
    //localStorage.setItem("verify",false);
  }

  return (
    <>
      <div className="wrapper">
        <div className="LfromWrapper">
          <h1 className="LfromHeading">Verify Email</h1>
          <form className="Lform" onSubmit={verifyEmail}>
            <div className="Lgroup">
              <p>Verification Code</p>
              <input
                type="text"
                className="VfromInput"
                onChange={hCode}
                value={code}
                ref={rCode}
                maxlength="8"
                pattern="[A-Za-z0-9]{8}"
                title="Code must be 8-characters long! (alphanumeric)"
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <button type="submit" className="Lbutton LbuttonBlue">
              Verify
              <div className="Lripples LbuttonRipples">
                <span className="LripplesCircle"></span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
