
import React from "react";

const EditDataModal = ({ isOpen, onClose, onUpdate, editingData, setEditingData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData({ ...editingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingData.ID);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={editingData.nama}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <input
              type="text"
              id="deskripsi"
              name="deskripsi"
              value={editingData.deskripsi}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDataModal;
