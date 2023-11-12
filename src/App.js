import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import View from "./View";
import Create from "./Create";
import Update from "./Update";
import Report from "./Report";
import Login from "./Login";
import Signup from "./Signup";
//import Verify  from "./Verify";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
              />
              <Home />
            </div>
          }
        />

        <Route
          path="/view"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
              />
              <View />
            </div>
          }
        />

        <Route
          path="/create"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
              />
              <Create />
            </div>
          }
        />

        <Route
          path="/update"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
              />
              <Update />
            </div>
          }
        />

        <Route
          path="/report"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
              />
              <Report />
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       { /*<Route path="/verify" element={<Verify />} /> */ }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
