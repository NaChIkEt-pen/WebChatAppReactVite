import React from "react";
import "../CSS/MessageCard.css";
export default function MessageCard(input) {
  //console.log(input.input[0]);
  return (
    <div className="messageCard">
      <div className="fullTime">
        <p className="date p1">{input.input[0]}</p>
        <p className="time p1">{input.input[1]}</p>
      </div>
      <div className="vertical"></div>
      <div className="userMsg">
        <p className="userName p2">{input.input[2]}</p>
        <div className="vertical"></div>
        <p className="msg p2">{input.input[3]}</p>
      </div>
    </div>
  );
}
