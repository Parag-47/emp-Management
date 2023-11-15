import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowRepeat, BsPeopleFill } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const nav = useNavigate();
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  const [data, setData] = useState();

  const getData = async () => {
    try {
      await axios.get("https://emp-management-api.vercel.app/get").then((res) => {
        setData(res.data);
        //data = res.data;
        //console.log("Res= " + res.data);
        //console.log(JSON.stringify(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    checker();
    return () => getData();
  }, []);

  const weather = async () => {
    //if(latitude===null || latitude===undefined)
    //return;
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: {
        q:
          localStorage.getItem("latitude") +
          "," +
          localStorage.getItem("longitude"),
      },
      headers: {
        "X-RapidAPI-Key": "ab485de822msh553b0c3810ece17p1240dbjsn8125c04e734b",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    try {
      console.log(latitude + " " + longitude);
      await axios.request(options).then((res) => {
        localStorage.setItem("temp", res.data.current.temp_c);
      });
      //setTemp(response.data.current.temp_c);
    } catch (error) {
      console.error(error);
      localStorage.setItem("temp", "???");
    }
  };

  const location = async () => {
    const result = {
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      params: {
        lat: latitude,
        lon: longitude,
        "accept-language": "en",
        polygon_threshold: "0.0",
      },
      headers: {
        "X-RapidAPI-Key": "ab485de822msh553b0c3810ece17p1240dbjsn8125c04e734b",
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };
    //if(latitude===null && latitude===undefined)
    //return console.log("Still Null :(");
    try {
      await axios.request(result).then((response) => {
        localStorage.setItem("location", response.data.address.state_district);
      });
    } catch (error) {
      console.error(error);
      localStorage.setItem("location", "???");
    }
  };

  weather();
  location();

  function checker() {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    if (name != null && email != null) {
    } else {
      nav("/login");
    }
  }

  return (
    <main className="main-container">
      <div className="homeWrapper">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="main-cards">
          <div
            className="card"
            onClick={(event) => {
              nav("/view");
            }}
          >
            <div className="card-inner">
              <h3>VIEW</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>View All Employees</h1>
          </div>
          <div
            className="card"
            onClick={(event) => {
              nav("/create");
            }}
          >
            <div className="card-inner">
              <h3>CREATE</h3>
              <FiUserPlus className="card_icon" />
            </div>
            <h1>Create New Records</h1>
          </div>
          <div
            className="card"
            onClick={(event) => {
              nav("/update");
            }}
          >
            <div className="card-inner">
              <h3>UPDATE</h3>
              <BsArrowRepeat className="card_icon" />
            </div>
            <h1>Update Records</h1>
          </div>
          <div
            className="card"
            onClick={(event) => {
              nav("/report");
            }}
          >
            <div className="card-inner">
              <h3>REPORT</h3>
              <GoReport className="card_icon" />
            </div>
            <h1>Report Bugs</h1>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="firstName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="firstName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="salary"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;
