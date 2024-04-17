import React from "react";
import "./SignageComponents.css";
import "./ButtonStyle.css";
import "./BackgroundLayer.css";
import SignageSetting from "../SignageSetting";
import { Link } from "react-router-dom";

function getDoorStateClass(doorState) {
  if (doorState === "open") return "ButtonDoorStateOpen";
  if (doorState === "closed") return "ButtonDoorStateClosed";
  return "ButtonDoorStateDefault";
}

function getInnerStateClass(innerState) {
  if (innerState === "vacant") return "ButtonInnerStateVacant";
  if (innerState === "occupied") return "ButtonInnerStateOccupied";
  return "ButtonInnerStateDefault";
}

function SignageComponents({ name, doorState, innerState, lat, lng }) {
  let doorStateClass = getDoorStateClass(doorState);
  let innerStateClass = getInnerStateClass(innerState);

  return (
    <div className="SignageComponents">
      <div className="Name">{name}</div>
      <div className="Horizontal">
        <button className={doorStateClass}>
          <p>{doorState}</p>
        </button>
        <button className={innerStateClass}>
          <p>{innerState}</p>
        </button>
        <Link
          to={"/signagesetting"}
          state={{ name, doorState, innerState, lat, lng }}
        >
          <button className="ButtonBlueShort">
            <p style={{ textDecoration: "none" }}>setting</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignageComponents;
