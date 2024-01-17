import React, { useState, useEffect } from "react";
import "../CSS/BroadcastPage.css";
import { IoSend } from "react-icons/io5";
export default function BroadcastPage() {
  const input = JSON.parse(window.sessionStorage.getItem("input"));
  const [tableData, setTableData] = useState([]);
  console.log(input);
  console.log(new Date());
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTableData(result);
      })
      .catch((err) => console.log(err));
  }, []);
  //console.log(tableData);
  return (
    <>
      <div className="MainDiv">
        <div className="ChatDiv">
          <table className="table table-striped"></table>
        </div>
        <div className="SecondDiv">
          <input type="text" placeholder="Enter Message" />
          <button className="Btn">
            <IoSend style={{ color: "lightblue" }} />
          </button>
        </div>
      </div>
    </>
  );
}
