import React from "react"
import Modal from "react-modal"

const smallModalSize = {
  maxWidth: "400px",
  maxHeight: "300px",
}

const largeModalSize = {
  maxHeight: "400px",
  maxWidth: "600px",
}

export const ReactModal = ({
  isModalOpen,
  closeModal,
  children,
  heading,
  size,
  contentLabel,
}) => {
  const modalSize =
    size === "sm"
      ? smallModalSize
      : size === "lg"
      ? largeModalSize
      : smallModalSize

  const customModalStyles = {
    content: {
      ...modalSize,
      margin: "auto",
      borderRadius: "6px",
      border: "none",
      padding: "0px",
      overflow: "hidden",
    },
    overlay: { zIndex: 100, background: "rgba(0,0,0,0.5)" },
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel={contentLabel}
    >
      <div className="flex justify-between modal-header items-center shadow-xs">
        <span className="font-semibold">{heading}</span>
        <div
          className="flex items-center justify-center w-8 h-8 rouded close-btn"
          role="button"
          onClick={closeModal}
        >
          <img src="/closeIcon.svg" alt="close-icon" className="w-3" />
        </div>
      </div>
      <div className="p-5">{children}</div>
    </Modal>
  )
}
