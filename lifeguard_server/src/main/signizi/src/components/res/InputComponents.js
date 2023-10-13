import React, { useState } from "react";
import "./InputComponents.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

// 여러곳에서 쓰일 입력을 담당하는 컴포넌트
// 텍스트와 input태그가 세로로 배치되어 있는 형태

function InputComponents({
  type = "text",
  label,
  inputName,
  placeholder,
  isdisabled = false,
}) {
  return (
    <div className="InputComponents">
      <p>{label}</p>
      <input
        type={type}
        name={inputName}
        placeholder={placeholder}
        disabled={isdisabled}
      />
    </div>
  );
}

export default InputComponents;
