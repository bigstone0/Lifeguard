import React from "react";
import Header from "./Header";
import "./BackgroundLayer.css";

// 타이틀과 아이콘, 흰배경을 만들어주는 컴포넌트

function BackgroundLayer({ children }) {
  return (
    <div className="BackgroundLayer">
      <div className="HeaderWrapper">
        <Header />
      </div>
      <div className="BackgroundBoard">{children}</div>
    </div>
  );
}

export default BackgroundLayer;
