// components/AddModal.js

import React from "react";

const AddModal = ({ isOpen, onClose, onSubmit, post, setPost }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tambah Data Produk</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={post.nama}
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
              value={post.deskripsi}
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

export default AddModal;
