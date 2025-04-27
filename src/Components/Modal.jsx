import React from "react";
import { Modal, Button } from "react-bootstrap";
import useModalStore from "../Store/modalStore";

const Dynamic_Modal = (props) => {
  const { isOpen, closeModal, content } = useModalStore();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isOpen} onHide={closeModal}>
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
