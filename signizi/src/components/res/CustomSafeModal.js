import React from "react";
import Modal from "react-modal";
import "./CustomModal.css";

// 모달창을 만들어 주는 컴포넌트.
// 투명한 검정배경을 오버레이
// ClassName을 넘겨받아 css에서 다르게 서식 적용

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0)", // 배경색과 동일한 색상 적용
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CustomModal({ isOpen, onRequestClose, children, classname }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={classname}>{children}</div>
    </Modal>
  );
}

export default CustomModal;
