import React from "react";

const DetailModal = ({ isOpen, onClose, detailData }) => {
  if (!isOpen || !detailData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detail Produk</h2>
        <div>
          <p><strong>ID:</strong> {detailData.id}</p>
          <p><strong>Nama:</strong> {detailData.nama}</p>
          <p><strong>Deskripsi:</strong> {detailData.deskripsi}</p>
          {/* Tambahkan lebih banyak detail sesuai kebutuhan */}
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="btn btn-secondary">Tutup</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
