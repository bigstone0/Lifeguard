import "./SignageSetting.css";
import "./res/ButtonStyle.css";
import "./res/SignageComponents.css";
import React, { useEffect, useState } from "react";
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
  let doorState = state.doorState || "";
  let innerState = state.innerState || "";
  let sig_lat = state.lat;
  let sig_lng = state.lng;

  const [door, setdoor] = useState(doorState);
  useEffect(() => {
    axios
      .get("/lifeguard/doorclose", {
        params: {
          name: name,
          doorState: door,
        },
      })
      .catch(function () {
        console.log("실패함");
      });
  }, [door]);

  const center = useMemo(() => ({ lat: sig_lat, lng: sig_lng }), []);

  let innerStateClass = getInnerStateClass(innerState);

  // 토글 스위치 state
  const [isChecked, setIsChecked] = useState();

  useEffect(() => {
    if (door == "open") {
      setIsChecked(true);
    }
    if (door == "closed") {
      setIsChecked(false);
    }
  }, []);

  // modal창 state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const openSaveModal = () => {
    setIsSaveModalOpen(true);
  };

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const openSelectModal = () => {
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const handleToggleChange = (checked) => {
    setIsChecked(checked);
    if (isChecked == false) {
      setdoor("open");
    }
    if (isChecked == true) {
      setdoor("closed");
    }
  };

  let doorStateClass = getDoorStateClass(door);

  // 비디오 관련 변수들
  let currentVideoName = "safety_rulse.mp4"; //state로 만들기? 몰라 나중에

  const [playList, setPlayList] = useState([
    { index: 0, title: "safety_rulse.mp4", reserveTime: null },
    { index: 1, title: "advertise.mp4", reserveTime: null },
    { index: 2, title: "work_information.mp4", reserveTime: null },
  ]);

  // 목록에서 항목 클릭했을 때 해당 item 처리
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  // time picker 초기값 설정
  const [selectedTime, setSelectedTime] = useState(moment().format("HH:mm"));

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  // Reservation 버튼 눌렀을 때 동작
  // 선택한 항목의 reserveTime값이 HH:mm 형식으로 저장되고 우측에 표시된다.
  const handleReservationClick = () => {
    if (selectedItem !== null && selectedTime !== null) {
      const selectedItemCopied = selectedItem.slice();
      const index = parseInt(selectedItemCopied.replace("item", ""), 10);
      const updatedPlayList = playList.slice();
      updatedPlayList[index].reserveTime = selectedTime;
      setPlayList(updatedPlayList);
    }
  };

  return (
    <BackgroundLayer>
      <div className="SignageSetting">
        <div className="BackgroundSubtitle">Lifeguard Setting</div>
        <div className="Horizontal">
          <div className="Vertical">
            <Wrapper>
              <LoadScriptNext
                googleMapsApiKey={"AIzaSyBI2WU1RZr3FTqlW81ih4OvP1S6V1vbZPU"}
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
                <button className={doorStateClass}>{door}</button>
                <button className={innerStateClass}>{innerState}</button>
              </div>
              <InputComponents
                label="CurrentVideo"
                placeholder={currentVideoName}
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
                    <div className="ModalSelectButtonWrapper">
                      <div className="ReserveTime">
                        <TimeSelector
                          onTimeChange={handleTimeChange}
                        ></TimeSelector>
                        <button
                          className="ButtonReservation"
                          onClick={handleReservationClick}
                        >
                          <p>Reservation</p>
                        </button>
                      </div>
                      <div className="ModifyPlaylist">
                        <button className="ButtonModifyPlaylist">
                          <p>+</p>
                        </button>
                        <button className="ButtonModifyPlaylist">
                          <p>-</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="ButtonBlueShort"
                    onClick={closeSelectModal}
                  >
                    done
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

          <button className="ButtonBlueShort" onClick={openSaveModal}>
            <p>save</p>
          </button>
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
