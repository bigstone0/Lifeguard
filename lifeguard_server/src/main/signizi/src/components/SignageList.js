import "./SignageList.css";
import "./res/ButtonStyle.css";
import BackgroundLayer from "./res/BackgroundLayer";
import SignageComponents from "./res/SignageComponents";
// import SignageSetting from './SignageSetting';
import React, { useEffect, useState } from "react";
import CustomModal from "./res/CustomModal";
import axios from "axios";

function SignageList() {
  let signizi_lat = [36.962751, 37.340864, 37.339688, 37.342061];
  let signizi_lng = [126.825249, 126.735699, 126.73558, 126.736551];
  const [doorState, setdoorState] = useState([]);
  const [innerState, setinnerState] = useState([]);
  const [name, setname] = useState([]);

  useEffect(() => {
    axios
      .get("/lifeguard/doorState")
      .then((response) => setdoorState(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/lifeguard/innerState")
      .then((response) => setinnerState(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/lifeguard/name")
      .then((response) => setname(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isTsunamiModalOpen, setIsTsunamiModalOpen] = useState(false);

  const openTsunamiModal = () => {
    setIsTsunamiModalOpen(true);
    axios
      .get("/lifeguard/alldooropen")
      .then((response) => setdoorState(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const closeTsunamiModal = () => {
    setIsTsunamiModalOpen(false);
  };

  return (
    <BackgroundLayer>
      <div className="SignageList">
        <p className="BackgroundSubtitle">Lifeguard List</p>

        <div className="Horizontal">
          <div className="Vertical">
            <SignageComponents
              name={name[0]}
              doorState={doorState[0]}
              innerState={innerState[0]}
              lat={signizi_lat[0]}
              lng={signizi_lng[0]}
            ></SignageComponents>
            <SignageComponents
              name={name[2]}
              doorState={doorState[2]}
              innerState={innerState[2]}
              lat={signizi_lat[2]}
              lng={signizi_lng[2]}
            ></SignageComponents>
          </div>
          <div className="Vertical">
            <SignageComponents
              name={name[1]}
              doorState={doorState[1]}
              innerState={innerState[1]}
              lat={signizi_lat[1]}
              lng={signizi_lng[1]}
            ></SignageComponents>
            <SignageComponents
              name={name[3]}
              doorState={doorState[3]}
              innerState={innerState[3]}
              lat={signizi_lat[3]}
              lng={signizi_lng[3]}
            ></SignageComponents>
          </div>
        </div>
        <button className="ButtonRed" onClick={openTsunamiModal}>
          <p>Tsunami Evacuation Drill</p>
        </button>
        <CustomModal
          isOpen={isTsunamiModalOpen}
          onRequestClose={closeTsunamiModal}
          classname={"TsunamiModal"}
        >
          <p className="BackgroundSubtitle">WARNING!!!</p>
          <p>
            An earthquake has been detected.
            <br />
            All signage opening soon.
          </p>
          <button className="ButtonBlueShort" onClick={closeTsunamiModal}>
            back
          </button>
        </CustomModal>
      </div>
    </BackgroundLayer>
  );
}

export default SignageList;