import React from 'react';
import { Modal, Button } from 'react-daisyui';

const RemoveModal = ({ isOpen, onClose, removeData, handleDelete }) => {
  const handleSubmit = async () => {
    await handleDelete(removeData.ID); // Pastikan ID dalam huruf kapital
    onClose();
  };

  return (
    <Modal open={isOpen} onClickBackdrop={onClose}>
      <Modal.Header className="font-bold">
        Konfirmasi Penghapusan
      </Modal.Header>
      <Modal.Body>
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
        <p>Nama: {removeData.nama}</p>
        <p>Deskripsi: {removeData.deskripsi}</p>
      </Modal.Body>
      <Modal.Actions>
        <Button className="btn btn-error ml-12" onClick={handleSubmit}>
          Hapus
        </Button>
        <Button className="btn ml-12" onClick={onClose}>
          Batal
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveModal;
