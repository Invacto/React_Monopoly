import React from "react";
import "./player.css";
import players from "/players.json";

function Player(props) {
  let player = players[props.name];

  // if (player["hasIcon"] === true) {
  return (
    // render with profile picture
    <div
      style={{
        textAlign: "center",
        fontFamily: "Pacifico, cursive",
        fontFamily: "Work Sans, sans-serif",
        fontSize: "12px",
        height: "130px",
        fontWeight: "bold",
        width: "100px",
        border: "5px solid black",
        backgroundColor: player.color
      }}
    >
      <img
        style={{
          marginTop: "5px",
          width: "65px",
          height: "65px",
          borderRadius: "50%"
        }}
        src={player.icon}
      />
      <div className="player-title">
        <h1>{props.name}</h1>
      </div>
      <div className="player-info">${player.money}</div>
    </div>
  );
}

export default Player;
