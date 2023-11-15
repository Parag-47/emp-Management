import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import { BsArrowRepeat} from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

export default function View() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [search, SetSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const columns = [
    {
      name: "FirstName",
      selector: (row) => row.firstName,
    },
    {
      name: "LastName",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "DOB",
      selector: (row) => row.DOB,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="btnWraper">
          <button
            className="btnUpdate"
            onClick={(event) => handleUpdate(row.email)}
          >
            <BsArrowRepeat className="card_icon" />
          </button>
          <button
            className="btnDelete"
            onClick={(event) => handleDelete(row.email)}
          >
            <MdDeleteForever className="card_icon" />
          </button>
        </div>
      ),
    },
  ];

  const getData = async () => {
    try {
      const req = await fetch("http://localhost:9000/data");
      const res = await req.json();
      setData(res);
      setFilter(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    if ((name != null) & (email != null)) {
    } else {
      nav("/login");
    }
  }, []);

  useEffect(() => {
     getData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return item.firstName.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, "$1:")}</pre>
  );

  const handleDelete = async (val) => {
    if(confirm("This data will be deleted from the database!\nAre You Sure?")===true)
    {
      try {
      await axios
        .post("http://localhost:9000/delete", { email: val })
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
          const newdata = data.filter((item) => item.email !== val);
          setFilter(newdata);
        });
    } catch (error) {
      alert(error.message);
    }
    }
  };

  const handleUpdate = (val) => {
    console.log(val);
    localStorage.setItem("refEmail", val);
    nav("/update"); 
  }

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#1d2634",
      },
    },
  };

  createTheme("dark", {
    background: {
      default: "transparent",
    },
  });

  return (
    <main className="main-container">
      <div className="container">
        <div className="row">

            <DataTable
              customStyles={tableHeaderstyle}
              columns={columns}
              data={filter}
              pagination
              selectableRowDisabled={true}
              fixedHeader
              fixedHeaderScrollHeight="629px"
              highlightOnHover
              pointerOnHover
              responsive
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              expandOnRowClicked
              expandableRowsHideExpander
              expandableInheritConditionalStyles={true}
              theme="dark"
              subHeader
              subHeaderComponent={
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => SetSearch(e.target.value)}
                  />
                  <label htmlFor="name" className="form__label">
                    Name
                  </label>
                </div>
              }
              subHeaderAlign="center"
            />

        </div>
      </div>
    </main>
  );
}
