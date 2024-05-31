// models/Product.js

class Product {
    constructor(id, nama, deskripsi) {
      this.id = id;
      this.nama = nama;
      this.deskripsi = deskripsi;
    }
  
    // Method untuk mengubah data produk
    update(nama, deskripsi) {
      this.nama = nama;
      this.deskripsi = deskripsi;
    }
  
    // Method untuk validasi data produk sebelum penyimpanan
    validate() {
      if (!this.nama || !this.deskripsi) {
        throw new Error('Nama and deskripsi are required fields');
      }
    }
  }
  
  export default Product;
  