import "./styles.css";
import Space from "/src/components/space/Space.jsx";
import players from "/players.json";
import properties from "/properties.json";
import propertyKeys from "/propertyKeys.js";
import Die from "/src/components/die/Die.jsx";
import Player from "/src/components/player/Player.jsx";
import { useState } from "react";
import PlayerChoices from "./PlayerChoices";
import ChangeBackground from "/src/ChangeBackground.jsx";

const playerOrder = ["nikita", "owasimul", "charlie", "justin"];

function App() {
  function changeSpaceNumber(spaceNum) {
    let arr = [];
    for (let i = 0; i < spaceNum; i++) {
      arr[i] = `space_${i + 1}`;
    }
    return arr;
  }

  function getSpaceWithRoll(key, roll) {
    const currentSpaceIndex = propertyKeys.indexOf(key);

    let targetSpaceIndex = -1;
    if (currentSpaceIndex + roll < propertyKeys.length) {
      targetSpaceIndex = currentSpaceIndex + roll;
    } else {
      targetSpaceIndex = (currentSpaceIndex + roll) % propertyKeys.length;
    }

    return propertyKeys[targetSpaceIndex];
  }

  function movePlayer(key, roll, player) {
    const updatedProperties = { ...propertiesState };
    const updatedPlayers = { ...playerState };

    const startingPropertyPlayers = updatedProperties[key].players;

    const landingPropertyKey = getSpaceWithRoll(key, roll);

    const landingPropertyPlayers =
      updatedProperties[landingPropertyKey].players;

    const playerPropertyIndex = startingPropertyPlayers.indexOf(player);
    if (playerPropertyIndex !== -1) {
      startingPropertyPlayers.splice(playerPropertyIndex, 1);
    }

    landingPropertyPlayers.push(player);

    updatedPlayers[player].currentSpace = landingPropertyKey;

    updatedPlayers[player].transferedMoney = false;
    setProperties(updatedProperties);
    setPlayerState(updatedPlayers);
  }

  function getNextPlayer() {
    let currentIndex = playerOrder.indexOf(activePlayer);
    // {Optional to change colors}
    // ChangeBackground(players[activePlayer].color);
    setActivePlayer(playerOrder[(currentIndex + 1) % playerOrder.length]);
  }

  function buyProperty(propertyKey, playerKey) {
    const updatedProperties = { ...propertiesState };
    const updatedPlayers = { ...playerState };

    updatedPlayers[playerKey].money -= updatedProperties[propertyKey].cost;
    updatedProperties[propertyKey].owner = playerKey;

    updatedPlayers[playerKey].properties.push(propertyKey);

    setProperties(updatedProperties);
    setPlayerState(updatedPlayers);
  }

  function transferMoney(amount, senderPlayer, recipientPlayer) {
    const updatedPlayers = { ...playerState };

    updatedPlayers[senderPlayer].money -= amount;
    updatedPlayers[recipientPlayer].money += amount;

    updatedPlayers[senderPlayer].transferedMoney = true;
    setPlayerState(updatedPlayers);
  }

  function setTransferMoneyState(player, value) {
    const updatedPlayers = { ...playerState };

    updatedPlayers[player].transferedMoney = value;

    setPlayerState(updatedPlayers);
  }

  function buyHouse(propertyKey, player) {
    const updatedProperties = { ...propertiesState };
    const updatedPlayers = { ...playerState };
    console.log(updatedProperties[propertyKey].buildingCost);
    updatedPlayers[player].money -= updatedProperties[propertyKey].buildingCost;
    updatedProperties[propertyKey].houses += 1;

    setProperties(updatedProperties);
    setPlayerState(updatedPlayers);
  }

  const [activePlayer, setActivePlayer] = useState("nikita");
  const [playerState, setPlayerState] = useState(players);
  const [propertiesState, setProperties] = useState(properties);

  let spaces = changeSpaceNumber(propertyKeys.length);

  return (
    <div className="App">
      <div className="start">
        <div className="start_board_title">
          <div className="title">
            <h1> It is {activePlayer}'s turn!</h1>
            <button
              onClick={() =>
                movePlayer(
                  players[activePlayer].currentSpace,
                  Math.floor(Math.random() * 11) + 2,
                  activePlayer
                )
              }
            >
              Roll Dice
            </button>
          </div>
          <div className="game">
            <div className="board">
              {spaces.map(function (value, index) {
                return (
                  <Space propertyKey={propertyKeys[index]} class={value} />
                );
              })}
              <PlayerChoices
                className="testing_space"
                player={activePlayer}
                playerState={playerState}
                getNextPlayer={getNextPlayer}
                buyProperty={buyProperty}
                transferMoney={transferMoney}
                setTransferMoneyState={setTransferMoneyState}
                buyHouse={buyHouse}
              />
            </div>
          </div>
        </div>
        <div className="players">
          {Object.keys(players).map(function (name) {
            return <Player name={name}></Player>;
          })}
        </div>

        {/* <Die die="/src/assets/oneDice.png"></Die> */}
      </div>
    </div>
  );
}
export default App;
