import React, { useState, useEffect, useRef } from "react";
import "../CSS/BroadcastPage.css";
import { IoSend } from "react-icons/io5";
import MessageCard from "./MessageCard";

export default function BroadcastPage() {
  const input = JSON.parse(window.sessionStorage.getItem("input"));
  const [tableData, setTableData] = useState([]);
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState(0);
  const myDivRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reloadDiv = () => {
    console.log("reload");
    // Incrementing the key will force React to remount the component
    setReloadKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    // Scroll to the bottom when the component mounts or whenever the content changes
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      reloadDiv();
    }, 5000);

    return () => clearTimeout();
  }, []);
  useEffect(() => {
    // fetch(`http://localhost:3000/${input.broadID}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     //console.log(result);
    //     //console.log(new Date(result[0]);
    //     setTableData(result);
    //   })
    //   .catch((err) => console.log(err));
    const fetchData = async () => {
      try {
        // http://localhost:3000/ https://rps3d0t2-3000.inc1.devtunnels.ms/
        const response = await fetch(`http://35.154.204.87:3000/${input.broadID}`);
        const result = await response.json();
        setTableData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 5 seconds
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const handleChange = (event) => {
    const message = event.target.value;
    //console.log(message);
    setMsg(message);
  };
  const handleSendMessage = (event) => {
    event.preventDefault();
    console.log(msg);
    const date = new Date(); //http://localhost:3000/insert/msg/ https://rps3d0t2-3000.inc1.devtunnels.ms/insert/msg/
    const isoDate = date.toISOString();
    fetch(`http://35.154.204.87:3000/insert/msg/${input.broadID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: isoDate,
        userName: input.userName,
        msg: msg,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setMsg("");
    reloadDiv();
  };

  const getDate = (str) => {
    const time = new Date(str);
    const formattedTime = `${time.getDate()}-${
      time.getMonth() + 1
    }-${time.getFullYear()}`;
    //console.log(formattedTime);
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
        <div className="ChatDiv" ref={myDivRef} key={reloadKey}>
          {/* <table className="table table-striped">
            <tbody>
              
            </tbody>
          </table> */}
          {tableData.map((row, i) => (
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
