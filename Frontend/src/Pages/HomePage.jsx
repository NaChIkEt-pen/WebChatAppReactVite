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
  const handleSubmit = (event) => {
    event.preventDefault();
    window.sessionStorage.setItem("input", JSON.stringify(input));
    console.log(window.sessionStorage.getItem("input"));
    if (input.broadID != undefined && input.userName != undefined) {
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
