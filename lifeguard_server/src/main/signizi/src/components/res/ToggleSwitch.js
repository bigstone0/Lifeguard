import React from "react";
import "./ToggleSwitch.css"; // 이 경로는 CSS 파일이 위치한 곳을 가리키도록 수정해야 합니다.

// 토글스위치
// 애니메이션이 바뀌고 텍스트도 변경된다.

function ToggleSwitch({ isChecked, onToggleChange }) {
  const handleToggleChange = (e) => {
    onToggleChange(e.target.checked);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleChange}
        />
        <span className="switch-slider"></span>
      </label>
      <span style={{ marginLeft: "10px" }}>{isChecked ? "Open" : "Close"}</span>
    </div>
  );
}

export default ToggleSwitch;
