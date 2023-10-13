import React from "react";
import "./VideoListComponents.css";

// Select 모달창에서 사용할 컴포넌트
// 좌측엔 비디오이름, 우측엔 예약시간이 나온다.

function VideoListComponents({ videoName, reserveTime }) {
  return (
    <div className="VideoListComponents">
      <div className="VideoName">
        <p>{videoName}</p>
      </div>
      <div className="ReserveTime">
        <p>{reserveTime}</p>
      </div>
    </div>
  );
}

export default VideoListComponents;
