import "./SignageSetting.css";
import "./res/ButtonStyle.css";
import "./res/SignageComponents.css";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useMemo } from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import CustomModal from "./res/CustomModal";
import ToggleSwitch from "./res/ToggleSwitch"; // ToggleSwitch 컴포넌트를 가져옵니다.
import BackgroundLayer from "./res/BackgroundLayer";
import InputComponents from "./res/InputComponents";
import ListView from "./res/ListView";
import TimeSelector from "./res/TimeSelector";
import moment from "moment";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

// prop 값에 따라 css 달리 적용하기
function getDoorStateClass(doorState) {
  if (doorState === "closed") return "ButtonDoorStateClosed";
  if (doorState === "open") return "ButtonDoorStateOpen";
  return "ButtonDoorStateDefault";
}
function getInnerStateClass(innerState) {
  if (innerState === "vacant") return "ButtonInnerStateVacant";
  if (innerState === "occupied") return "ButtonInnerStateOccupied";
  return "ButtonInnerStateDefault";
}

function SignageSetting() {
  const location = useLocation();

  // let location = props.location || {};
  let state = location.state || {};

  let name = state.name || "";
  let sig_lat = state.lat;
  let sig_lng = state.lng;

  const [doorState, setdoorState] = useState("");
  const [innerState, setinnerState] = useState("");
  const [video, setvideo] = useState("");

  const center = useMemo(() => ({ lat: sig_lat, lng: sig_lng }), []);

  // 토글 스위치 state
  const [isChecked, setIsChecked] = useState();

  const interval = useRef();

  useEffect(() => {
    name_d_state();
    name_i_state();
    interval.current = setInterval(() => {
      name_d_state();
      name_i_state();
    }, 5000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const name_d_state = () => {
    axios
      .get("/lifeguard/namedoorState", {
        params: {
          name: name,
        },
      })
      .then((response) => setdoorState(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const name_i_state = () => {
    axios
      .get("/lifeguard/nameinnerState", {
        params: {
          name: name,
        },
      })
      .then((response) => setinnerState(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (doorState == "open") {
      setIsChecked(true);
    }
    if (doorState == "closed") {
      setIsChecked(false);
    }
  }, [doorState]);

  // modal창 state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const openSelectModal = () => {
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const playvideo = () => {
    setvideo(selectedItem);
    axios
      .get("/lifeguard/video", {
        params: {
          name: name,
          video: selectedItem,
        },
      })
      .catch(function () {
        console.log("실패함");
      });
    closeSelectModal();
  };

  const handleToggleChange = (checked) => {
    setIsChecked(checked);
    if (isChecked == false) {
      setdoorState("open");
      axios
        .get("/lifeguard/serverdoorclose", {
          params: {
            name: name,
            doorState: "open",
          },
        })
        .catch(function () {
          console.log("실패함");
        });
    }
    if (isChecked == true) {
      setdoorState("closed");
      axios
        .get("/lifeguard/serverdoorclose", {
          params: {
            name: name,
            doorState: "closed",
          },
        })
        .catch(function () {
          console.log("실패함");
        });
    }
  };

  let doorStateClass = getDoorStateClass(doorState);
  let innerStateClass = getInnerStateClass(innerState);

  // 비디오 관련 변수들

  const [playList, setPlayList] = useState([
    { index: 0, title: "safety_rulse.mp4", reserveTime: null },
    { index: 1, title: "advertise.mp4", reserveTime: null },
    { index: 2, title: "caution_level.mp4", reserveTime: null },
    { index: 3, title: "alert_level.mp4", reserveTime: null },
    { index: 4, title: "serious_level.mp4", reserveTime: null },
  ]);

  // 목록에서 항목 클릭했을 때 해당 item 처리
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <BackgroundLayer>
      <div className="SignageSetting">
        <div className="BackgroundSubtitle">Lifeguard Setting</div>
        <div className="Horizontal">
          <div className="Vertical">
            <Wrapper>
              <LoadScriptNext
                googleMapsApiKey={"AIzaSyBanJucK4ssBh_ZsNlLDjfxcV0IGJJvwnk"}
              >
                <GoogleMap
                  zoom={15}
                  center={center}
                  mapContainerClassName="map-container"
                >
                  <MarkerF position={center}></MarkerF>
                </GoogleMap>
              </LoadScriptNext>
            </Wrapper>
          </div>
          <div className="Vertical">
            <div className="Setting">
              <p className="SignageName">{name}</p>
              <div className="State">
                <p>state : </p>
                <button className={doorStateClass}>{doorState}</button>
                <button className={innerStateClass}>{innerState}</button>
              </div>
              <InputComponents
                label="CurrentVideo"
                placeholder={video}
                isdisabled={true}
              ></InputComponents>
              <div className="SelectButtonWrapper">
                <button className="ButtonBlueShort" onClick={openSelectModal}>
                  <p>select</p>
                </button>
                <CustomModal
                  isOpen={isSelectModalOpen}
                  onRequestClose={closeSelectModal}
                  classname={"SelectModal"}
                >
                  <div className="ModalSelectWrapper">
                    <p className="BackgroundSubtitle">Playlist</p>
                    <ListView items={playList} onItemClick={handleItemClick} />
                  </div>
                  <button className="ButtonBlueShort" onClick={playvideo}>
                    play
                  </button>
                </CustomModal>
              </div>
              <div className="DoorControl">
                <p>DoorControl</p>
                <div className="SwitchModule">
                  <ToggleSwitch
                    isChecked={isChecked}
                    onToggleChange={handleToggleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ButtonWrapper">
          <Link to={"/signagelist"}>
            <button className="ButtonWhite">
              <p>back</p>
            </button>
          </Link>
          <CustomModal
            isOpen={isSaveModalOpen}
            onRequestClose={closeSaveModal}
            classname={"SaveModal"}
          >
            <p className="BackgroundSubtitle">Saved!</p>
            <button className="ButtonBlueShort" onClick={closeSaveModal}>
              back
            </button>
          </CustomModal>
        </div>
      </div>
    </BackgroundLayer>
  );
}

export default SignageSetting;

const Wrapper = styled.div`
  .map-container {
    width: 100%;
    height: 360px;
  }
`;
