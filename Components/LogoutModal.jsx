// components/LogoutModal.js
import React from 'react';
import { Modal, Button } from 'react-daisyui';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClickBackdrop={onClose} centered>
      <Modal.Header>
        <span className="font-bold">Confirm Logout</span>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to logout?</p>
      </Modal.Body>
      <Modal.Actions>
        <div className="flex justify-end">
          <Button className="btn-logout mr-9" onClick={onClose}>Cancel</Button>
          <Button className="btn-logout btn-primary ml-19" onClick={onConfirm}>Logout</Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};

export default LogoutModal;
