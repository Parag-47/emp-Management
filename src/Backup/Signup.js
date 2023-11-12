import { useState, useRef, useEffect } from "react";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";
import "./Login.css";

export default function Signup() {
  const nav = useNavigate();
  const rEmail = useRef();
  const rPassword = useRef();
  const rCPassword = useRef();
  const [uemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const hEmail = (event) => { setEmail(event.target.value);}
  const hPassword = (event) => {setPassword(event.target.value);}
  const hCPassword = (event) => {setCPassword(event.target.value);}

  const SignIn = async(event) => {
    event.preventDefault();
    try {
      await signInWithPopup(auth, provider).then((data) => {
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.displayName);
        localStorage.setItem("profilePic", data.user.photoURL);
        nav("/");
      }); 
      } catch (error) {
      alert(error.message);
      }
  };

  useEffect(() => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    if ((name != null) && (email != null)) 
      nav("/");
  }, []);

  const register = async (event) => {
    event.preventDefault();
    const Regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
    );

    if (Regex.test(password) === false) {
     alert("Password Must have minimum eight characters, at least one uppercase letter,"+
      "one lowercase letter, one number and one special character:");
      setPassword("");
      setCPassword("");
      rPassword.current.focus();
      return;
    }

    if(password===cpassword)
    {
      const email = uemail.trim().toLowerCase();
        const data = {email: email,password: password};
        try {
            await axios.put("http://localhost:9000/sendMail",data).then((res)=>{
            alert(res.data.message);
            console.log(res);
            //nav("/verify", localStorage.setItem("verify",true));
        });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    else {
      alert("Password Didn't Match!");
      setPassword("");
      setCPassword("");
      rPassword.current.focus();
      return;
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="LfromWrapper">
          <h1 className="LfromHeading">SignUp</h1>
          <form className="Lform" onSubmit={register}>
            <div className="Lgroup">
              <p>Email</p>
              <input
                type="email"
                className="LfromInput"
                onChange={hEmail}
                value={uemail}
                ref={rEmail}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="Lgroup">
              <p>Password</p>
              <input
                type="password"
                className="LfromInput"
                onChange={hPassword}
                value={password}
                ref={rPassword}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="Lgroup">
              <p>Confirm Password</p>
              <input
                type="password"
                className="LfromInput"
                onChange={hCPassword}
                value={cpassword}
                ref={rCPassword}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <button type="submit" className="Lbutton LbuttonBlue">
              Register
              <div className="Lripples LbuttonRipples">
                <span className="LripplesCircle"></span>
              </div>
            </button> 
            <div className="googleWraper">
                <div className="LLbar">
                <div className="left"></div>OR<div className="right"></div>
                </div>
               <GoogleButton onClick={SignIn} className="Gbtn" />
               <Link to="/login" className="register">Sign In?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
