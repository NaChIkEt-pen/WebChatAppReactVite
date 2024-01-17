import React, { useState, useEffect } from "react";
import "../CSS/BroadcastPage.css";
import { IoSend } from "react-icons/io5";
import MessageCard from "./MessageCard";
export default function BroadcastPage() {
  const input = JSON.parse(window.sessionStorage.getItem("input"));
  const [tableData, setTableData] = useState([]);
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        //console.log(new Date(result[0]);
        setTableData(result);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (event) => {
    const message = event.target.value;
    //console.log(message);
    setMsg(message);
  };
  const handleSendMessage = (event) => {
    event.preventDefault();
    console.log(msg);
    setMsg("");
  };

  const getDate = (str) => {
    const time = new Date(str);
    const formattedTime = `${time.getDate()}-${
      time.getMonth() + 1
    }-${time.getFullYear()}`;
    console.log(formattedTime);
    return formattedTime;
  };

  const getTime = (str) => {
    const time = new Date(str);
    const formattedTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    return formattedTime;
  };
  return (
    <>
      <div className="MainDiv">
        <div className="ChatDiv">
          {/* <table className="table table-striped">
            <tbody>
              
            </tbody>
          </table> */}
          {tableData.map((row, i) => (
            // <tr key={i + 1}>
            //   <td key="time">{getTime(row.time)}</td>
            //   <td key="username">{row.userName}</td>
            // </tr>
            <MessageCard
              input={[
                getDate(row.time),
                getTime(row.time),
                row.userName,
                row.msg,
              ]}
              key={i}
            />
          ))}
        </div>
        <div className="SecondDiv">
          <input
            type="text"
            placeholder="Enter Message"
            name="msg"
            value={msg || ""}
            onChange={handleChange}
          />
          <button className="Btn" onClick={handleSendMessage}>
            <IoSend style={{ color: "lightblue" }} />
          </button>
        </div>
      </div>
    </>
  );
}
