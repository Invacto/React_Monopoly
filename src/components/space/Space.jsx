import React from "react";
import "./space.css";
import commChest from "/src/assets/commChest.jpg";
import railroad from "/src/assets/railroad.png";
import tax from "/src/assets/tax.png";
import chance from "/src/assets/chance.png";
import properties from "/properties.json";
import PlayerIcon from "../player/PlayerIcon";
import players from "/players.json";

function Space(props) {
  let property = properties[props.propertyKey];

  if (property["hasImage"]) {
    return (
      <div
        style={{ backgroundColor: property.color }}
        className={props.class + " space-div"}
      >
        <p>{property.name}</p>
        {pickImage(property.name)}
        <p>
          {property.owner === undefined
            ? ""
            : property.owner === ""
            ? `${property.cost}`
            : ` Owner: ${property.owner}`}
        </p>
        {property.players.map(function (player) {
          return (
            <PlayerIcon
              name={player}
              color={players[player].color}
            ></PlayerIcon>
          );
        })}
      </div>
    );
  }
  // } else if (property.name.indexOf("Chance") !== -1) {
  else {
    return (
      <div
        style={{ backgroundColor: property.color }}
        className={props.class + " space-div"}
      >
        <p>{property.name}</p>

        <p>
          {property.owner === undefined
            ? ""
            : property.owner === ""
            ? `${property.cost}`
            : ` Owner: ${property.owner}`}
        </p>
        <p>
          {property.owner !== "" && property.owner !== undefined
            ? `Rent: ${property.rent[`${property.houses}_house`]}`
            : ""}
        </p>
        {property.players.map(function (player) {
          return (
            <PlayerIcon
              name={player}
              color={players[player].color}
            ></PlayerIcon>
          );
        })}
      </div>
    );
  }
}

function pickImage(name) {
  if (name.indexOf("Community Chest") !== -1) return <img src={commChest} />;
  else if (name.indexOf("Chance") !== -1) return <img src={chance} />;
  else if (name.indexOf("Railroad") !== -1) return <img src={railroad} />;
  else if (name.indexOf("Tax") !== -1) return <img src={tax} />;
}

export default Space;
