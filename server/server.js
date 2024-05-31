const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Menambahkan middleware CORS ke aplikasi

// Endpoint untuk mengambil data produk
app.get('/api/products', (req, res) => {
  // Logika untuk mengambil data produk
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
