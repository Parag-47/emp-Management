import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Delete() {
  const nav = useNavigate();

  useEffect(() => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    if((name != null) & (email != null)) 
      return;
    else
      nav("/login");
  }, []);

  return (
    <>
      <main className="main-container">
        <div>Report</div>
      </main>
    </>
  );
}
