import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Update() {
  const s = "";
  const nav = useNavigate();
  const loc = useLocation();
  const rFirstName = useRef();
  const rLastName = useRef();
  const rEmail = useRef();
  const rPhone = useRef();
  const rDOB = useRef();
  const rSalary = useRef();
  const [_id,setId] = useState(""); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("Male");
  const [salary, setSalary] = useState("");

  const hFirst = (event) => {
    setFirstName(event.target.value);
  };
  const hLast = (event) => {
    setLastName(event.target.value);
  };
  const hEmail = (event) => {
    setEmail(event.target.value);
  };
  const hPhone = (event) => {
    setPhone(event.target.value);
  };
  const hDOB = (event) => {
    setDOB(event.target.value);
  };
  const hGender = (event) => {
    setGender(event.target.value);
  };
  const hSalary = (event) => {
    setSalary(event.target.value);
  };

  window.addEventListener("beforeunload", (event) => {
    clear();
    console.log("API call before page reload");
  });

  useEffect(() => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");

    if ((name != null) & (email != null)) {
      fetcher();
    } else {
      nav("/login");
    }
  }, []);

  function clear() {
    localStorage.setItem("refEmail", null);
  }

  const fetcher = async () => {
    const Email = localStorage.getItem("refEmail");
    if (Email === null) return;
    //console.log("hi"+JSON.stringify(loc.state.email));
    //const email = {email: refEmail};
    //console.log("Local "+refEmail);
    try {
      await axios.post("http://localhost:9000/find", { Email }).then((res) => {
        setId(res.data._id);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        const oldFormat = res.data.DOB.split("/");
        const newFormat = oldFormat.toString().replaceAll(",","-");
        setDOB(newFormat);
        //console.log("Hi from Find! "+JSON.stringify(res));
        setGender(res.data.gender);
        setSalary(res.data.salary);
        //localStorage.setItem("refEmail", null);
        //window.history.replaceState(loc.state, document.title);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const update = async (event) => {
    event.preventDefault();
    const phoneRegex = new RegExp(
      /^\+[1-9]{1}[0-9]{0,2}[-. ]?[2-9]{1}[0-9]{2}[-. ]?[2-9]{1}[0-9]{2}[-. ]?[0-9]{4}$/g
    );
    const salaryRegex = new RegExp(/[^0][0-9.]*/g);
    if (phoneRegex.test(phone) === false) {
      alert(
        "The numbers should start with a plus sign ( + )\n" +
          "It should be followed by Country code and National number.\n" +
          "It may contain white spaces or a hyphen ( - ) or a period ( . )\n" +
          "Ex: +XX XXXX XXXX"
      );
      rPhone.current.focus();
      return;
    }
    if (salaryRegex.test(salary) === false) {
      alert("Salary can't be Zero!");
      setSalary("");
      rSalary.current.focus();
      return;
    }
    console.log(DOB);
    const temp = DOB.toString().split('-');
    console.log(temp.reverse());
    const Format = temp.reverse().toString().replaceAll(",","/");
    const data = {
      _id,
      firstName,
      lastName,
      email,
      phone,
      Format,
      gender,
      salary,
    };
    console.log(Format);
    try {
      await axios.put("http://localhost:9000/update", data).then((res) => {
        if (res.data.message === "Record Updated!") {
            alert(res.data.message);
            setFirstName(s);
            setLastName("");
            setEmail("");
            setPhone("");
            setDOB("");
            setSalary("");
          rFirstName.current.focus();
        } else if (res.data.message === "fName") {
          alert("Name can't be Empty!");
          rFirstName.current.focus();
        } else if (res.data.message === "lName") {
          alert("Name can't be Empty!");
          rLastName.current.focus();
        } else if (res.data.message === "Email") {
          alert("Email can't be Empty!");
          rEmail.current.focus();
        } else if (res.data.message === "Phone") {
          alert("Phone can't be Empty!");
          rPhone.current.focus();
        } else if (res.data.message === "Salary") {
          alert("Salary can't be Empty!");
          rSalary.current.focus();
        } else if (res.data.message === "!NewEmail") {
          alert("This Email is Already in Use!\n\nIt Seems Like you are trying to create "+
          "a record insted of updating since we didn't found any valid Id to update to "+
          "if you wanna update an existing record please go to view tab and click on update button "+
          "or if you wanna create a new record use the create tab and please make sure the email or phone no. doesn't exists in the database already.");
          rEmail.current.focus();
        } else if (res.data.message === "!NewPhone") {
          alert("This Phone Number is Already in Use!\n\nIt Seems Like you are trying to create"+
          "a record insted of updating since we didn't found any valid Id to update to "+
          "if you wanna update an existing record please go to view tab and click on update button "+
          "or if you wanna create a new record use the create tab and please make sure the email or phone no. doesn't exists in the database already.");
          rPhone.current.focus();
        } 
        console.log(res);
      });
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  return (
    <>
      <main className="main-container">
        <div className="fromWrapper">
          <h1 className="fromHeading">Update</h1>
          <form className="form" onSubmit={update}>
            <div className="group">
              <p>First Name</p>
              <input
                type="text"
                className="fromInput"
                onChange={hFirst}
                value={firstName}
                ref={rFirstName}
                pattern="[A-Za-z]{2,10}"
                title="Name should contain letters only! (min 2, max 10)"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <p>Last Name</p>
              <input
                type="text"
                className="fromInput"
                onChange={hLast}
                value={lastName}
                ref={rLastName}
                pattern="[A-Za-z]{2,10}"
                title="Name should contain letters only! (min 2, max 10)"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <p>Email</p>
              <input
                type="email"
                className="fromInput"
                onChange={hEmail}
                value={email}
                ref={rEmail}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <p>Phone</p>
              <input
                type="text"
                className="fromInput"
                onChange={hPhone}
                value={phone}
                ref={rPhone}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <p>DOB</p>
              <input
                type="date"
                className="fromInput"
                onChange={hDOB}
                value={DOB}
                ref={rDOB}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="gender">
              <p>Gender</p>
              <select className="formSelect" onChange={hGender} value={gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="group">
              <p>Salary</p>
              <input
                type="Number"
                step="any"
                className="fromInput"
                onChange={hSalary}
                value={salary}
                ref={rSalary}
                pattern="[0-9.]+"
                title="Salary can't be Zero!"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <button type="submit" className="button buttonBlue">
              Update
              <div className="ripples buttonRipples">
                <span className="ripplesCircle"></span>
              </div>
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
