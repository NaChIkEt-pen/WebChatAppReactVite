import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BroadcastPage from "./BroadcastPage";
export default function HomePage() {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const checkBroadID = (event) => {
    return new Promise(async (resolve, reject) => {
      if (
        event != undefined &&
        event.broadID != undefined &&
        event.userName != undefined
      ) {
        resolve("success");
      } else {
        reject("BroadCast ID should be a number and userName should be String");
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.sessionStorage.setItem("input", JSON.stringify(input));
    console.log(window.sessionStorage.getItem("input"));
    if (input.broadID != undefined && input.userName != undefined) {
      await checkBroadID(input);
      navigate("/broadcast");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Broadcast ID:
          <input
            type="text"
            name="broadID"
            value={input.broadID || ""}
            onChange={handleChange}
            placeholder="Enter Broadcast ID"
          />
        </label>
        <label>
          Enter UserName:
          <input
            type="text"
            name="userName"
            value={input.userName || ""}
            onChange={handleChange}
            placeholder="Enter UserName"
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}
