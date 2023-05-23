import players from "/players.json";
import properties from "/properties.json";
import sets from "/sets.json";

function PlayerChoices({
  player,
  playerState,
  getNextPlayer,
  buyProperty,
  transferMoney,
  setTransferMoneyState,
  buyHouse
}) {
  let buttons = [];
  let currentSpaceKey = players[player].currentSpace;

  const propertyOwner = properties[currentSpaceKey].owner;

  buttons.push(
    <button
      onClick={() => {
        setTransferMoneyState(player, false);
        getNextPlayer();
      }}
    >
      END TURN
    </button>
  );

  if (
    properties[currentSpaceKey].cost != null &&
    properties[currentSpaceKey].owner === ""
  ) {
    buttons.push(
      <button
        onClick={() => {
          buyProperty(currentSpaceKey, player);
        }}
      >
        Buy Property
      </button>
    );
  }

  if (
    propertyOwner !== player &&
    propertyOwner !== "" &&
    propertyOwner !== undefined &&
    players[player].transferedMoney === false &&
    properties[currentSpaceKey].houses !== undefined
  ) {
    let rent = 0;
    let numOfHouses = properties[currentSpaceKey].houses;

    rent = properties[currentSpaceKey].rent[`${numOfHouses}_house`];

    if (rent !== 0) {
      buttons.push(
        <button
          onClick={() => {
            transferMoney(rent, player, properties[currentSpaceKey].owner);
          }}
        >
          PAY RENT
        </button>
      );
    }
  }

  //if (playerState[playerKey].properties.includes(""))

  let foundSets = [];

  for (let setColor in sets) {
    const setArray = sets[setColor];
    let isSubset = setArray.every((element) =>
      playerState[player].properties.includes(element)
    );
    if (isSubset) {
      foundSets.push(setColor);
    }
  }

  console.log(foundSets);

  if (propertyOwner === player) {
    buttons.push(
      <button
        onClick={() => {
          buyHouse(currentSpaceKey, player);
        }}
      >
        BUY HOUSE
      </button>
    );
  }

  return buttons;
}

export default PlayerChoices;
