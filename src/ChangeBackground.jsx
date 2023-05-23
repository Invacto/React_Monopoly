import players from "/players.json";

function ChangeBackground(color) {
  if (color == "yellow")
    document.body.style.animation = "yellowPlayer 3s linear absolute";
  else if (color == "red")
    document.body.style.animation = "redPlayer 3s linear absolute";
  else if (color == "orange")
    document.body.style.animation = "orangePlayer 3s linear absolute";
  else if (color == "aqua")
    document.body.style.animation = "aquaPlayer 3s linear absolute";
}

export default ChangeBackground;
