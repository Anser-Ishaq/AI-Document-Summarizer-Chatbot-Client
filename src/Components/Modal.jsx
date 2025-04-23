import React from "react";
import { Modal, Button } from "react-bootstrap";
import useModalStore from "../Store/modalStore";

const Dynamic_Modal = () => {
  const { isOpen, closeModal, content } = useModalStore();

  return (
    <Modal show={isOpen} onHide={closeModal}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Global Modal</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Dynamic_Modal;
