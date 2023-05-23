import React from "react";
import "./die.css";
import oneDice from "/src/assets/oneDice.png";
function Die(props) {
  const styles = {
    die: {
      width: "100px",
      height: "100px"
    }
  };
  return (
    <div className="die">
      <img style={styles.die} alt="die" src={oneDice} />
    </div>
  );
}

export default Die;
