import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();
  const rEmail = useRef();
  const rPassword = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hEmail = (event) => { setEmail(event.target.value);}
  const hPassword = (event) => {setPassword(event.target.value);}

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

  const login = async (event) => {
    event.preventDefault();
    const Regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
    );

    if (Regex.test(password) === false) {
      alert("Password Must have minimum eight characters, at least one uppercase letter,"+
      "one lowercase letter, one number and one special character:");
      setPassword("");
      rPassword.current.focus();
      return;
    }

    const data = {
      email: email.trim().toLowerCase(),
      password: password.trim()
    }
    console.log(data);

    try {
      await axios.post("http://localhost:9000/login",data).then((res)=>{
        if(res.data.sucess===true)
        {
          alert(res.data.message);
          localStorage.setItem("name",email);
          localStorage.setItem("email",email);
          nav("/");
        }
        else alert("Something Went Wrong!\n"+res.data.message);
      console.log(res);
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="LfromWrapper">
          <h1 className="LfromHeading">Login</h1>
          <form className="Lform" onSubmit={login}>
            <div className="Lgroup">
              <p>Email</p>
              <input
                type="email"
                className="LfromInput"
                onChange={hEmail}
                value={email}
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
            <button type="submit" className="Lbutton LbuttonBlue">
              Login
              <div className="Lripples LbuttonRipples">
                <span className="LripplesCircle"></span>
              </div>
            </button> 
            <div className="googleWraper">
                <div className="LLbar">
                <div className="left"></div>OR<div className="right"></div>
                </div>
               <GoogleButton onClick={SignIn} className="Gbtn" />
               <Link to="/signup" className="register">Register?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
