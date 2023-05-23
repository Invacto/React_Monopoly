import React from "react";
import "./player.css";
import players from "/players.json";

function PlayerIcon(props) {
  // if (player["hasIcon"] === true) {
  return (
    // render with profile picture
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "5%",
        marginTop: "10%",
        marginLeft: "5%"
      }}
    >
      <div
        style={{
          border: "2px solid black",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          marginRight: "3px",
          backgroundColor: props.color
        }}
      ></div>
      <h5>{props.name}</h5>
    </div>
  );
}

export default PlayerIcon;
