import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "/styles/Home.module.css";
import { Card, Form, Input } from "react-daisyui";
import AddModal from "/components/AddModal";
import EditDataModal from "/components/EditDataModal";
import RemoveModal from "/components/RemoveModal";
import LogoutModal from "/components/LogoutModal";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Home = () => {
  const [notification, setNotification] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({ nama: "", deskripsi: "" });
  const [editingData, setEditingData] = useState({ id: "", nama: "", deskripsi: "" });
  const [removeData, setRemoveData] = useState({ id: "", nama: "", deskripsi: "" });
  const apiEndPoint = 'http://localhost:5000/api/products/';
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data hanya sekali saat komponen dimuat

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        showNotification("Anda belum login. Silakan login terlebih dahulu.");
        router.push("/auth/register");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(apiEndPoint, config); // metode cari
      console.log("Response:", response.data.data); // Tambahkan baris ini untuk memeriksa respons dari backend
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      showNotification("Terjadi kesalahan saat mengambil data.");
    }
  };

  // const searchProductByID = async (ID) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/products/Find/${ID}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error searching product by ID:", error);
  //     showNotification("Terjadi kesalahan saat mencari produk.");
  //     return null;
  //   }
  // };
  const searchProductByID = async (ID) => {
    const token = Cookies.get('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get(`http://localhost:5000/api/products/Find/${ID}`, config);
      return response.data;
    } catch (error) {
      console.error("Error searching product by ID:", error);
      showNotification("Terjadi kesalahan saat mencari produk.");
      return null;
    }
  };


  const searchProductByFilter = async (filter = null) => {
    const token = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const req = {
        "search": filter,
      }
      const response = await axios.post(`http://localhost:5000/api/products/cari`, req, config);
      return response.data.data;
    } catch (error) {
      console.error("Error searching product by filter:", error);
      showNotification("Terjadi kesalahan saat mencari produk.");
      return [];
    }
  };
  const searchProductBySelect = async (cari = null) => {
    const token = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const req = {
        "search": filter,
      }
      const response = await axios.get(`http://localhost:5000/api/products/FindSelect/${cari}`, req, config);
      return response.data;
    } catch (error) {
      console.error("Error searching product by select:", error);
      showNotification("Terjadi kesalahan saat mencari produk.");
      return [];
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault(); // Mencegah form untuk melakukan submit default

    try {
      // Lakukan pencarian produk berdasarkan filter dengan nilai searchQuery
      const searchResult = await searchProductByFilter(searchQuery);

      // Lakukan sesuatu dengan hasil pencarian (misalnya, menampilkan hasilnya)
      console.log("Search Result:", searchResult);
      setPosts(searchResult); // Atur hasil pencarian ke state posts
    } catch (error) {
      console.error("Error searching product:", error);
      showNotification("Terjadi kesalahan saat mencari produk.");
    }
  };

  const handleOpenModal = (post = { nama: "", deskripsi: "" }) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const handleEditModalOpen = (post) => {
    setEditingData(post);
    setIsEditModalOpen(true);
  };

  const handleRemoveModalOpen = (post) => {
    setRemoveData(post);
    setIsRemoveModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsRemoveModalOpen(false);
    setIsLogoutModalOpen(false);
    setCurrentPost({ nama: "", deskripsi: "" });
    setEditingData({ id: "", nama: "", deskripsi: "" });
  };

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    if (!token) {
      showNotification("Anda belum login. Silakan login terlebih dahulu.");
      router.push("/auth/register");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };

      let response;

      if (currentPost.id) {
        response = await axios.put(`${apiEndPoint}/${currentPost.id}`, currentPost, config);
      } else {
        response = await axios.post(apiEndPoint, currentPost, config);
      }

      console.log("Response:", response.data);
      showNotification(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      showNotification("Terjadi kesalahan saat memproses data.");
    } finally {
      handleCloseModal();
      fetchData();
    }
  };


  const updateData = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      showNotification("Anda belum login. Silakan login terlebih dahulu.");
      router.push("/auth/register");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Mengonversi ID menjadi huruf besar
      // const formattedId = ID.toUpperCase();
      const formattedId = typeof id === 'string' ? id.toUpperCase() : id;
      console.log("Updating data with ID:", formattedId);
      console.log("this is real id:", id);
      await axios.put(`${apiEndPoint}${formattedId}`, editingData, config);
      setPosts(posts.map((p) => (p.id === editingData.id ? editingData : p)));
      showNotification(`Data dengan ID ${formattedId} berhasil diperbarui!`);
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error("Error:", error);

      showNotification("Terjadi kesalahan saat memperbarui data.");
    }
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      showNotification("Anda belum login. Silakan login terlebih dahulu.");
      router.push("/auth/register");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };

      // Ensure ID is a string and convert it to uppercase
      const formattedId = typeof id === 'string' ? id.toUpperCase() : id;

      await axios.delete(`${apiEndPoint}${formattedId}`, config);
      showNotification(`Data dengan ID ${formattedId} berhasil dihapus!`);
      fetchData();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error deleting data:", error.response.data);
        showNotification("Terjadi kesalahan saat menghapus data.");
      } else {
        console.error("Error deleting data:", error);
        showNotification("Terjadi kesalahan saat menghapus data. Mohon coba lagi nanti.");
      }
    }
  };


  //     await axios.delete(`${apiEndPoint}/${formattedid}`, config);
  //     setPosts(posts.filter((p) => p.id !== id));
  //     showNotification(`Data dengan ID ${id} berhasil dihapus!`);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error deleting data:", error.response.data.data.message);
  //     showNotification("Terjadi kesalahan saat menghapus data.");
  //   } finally {
  //     fetchData().catch(err => {
  //       console.error("Error fetching data:", err.response.data.data.message);
  //       showNotification("Terjadi kesalahan saat mengambil data.");
  //     });
  //   }
  // };



  const handleLogoutConfirm = () => {
    Cookies.remove('token');
    Cookies.remove('user'); // Hapus cookie pengguna lain jika ada
    router.push("/auth/login");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full bg-gray-800 p-4">
        <nav className="flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/crud" className="text-white hover:text-gray-300">CRUD</Link>
            </li>
            <li>
              <Link href="/#" className="text-white hover:text-gray-300">Profile</Link>
            </li>
          </ul>
          <ul className="flex space-x-4">
            <li>
              <a onClick={() => setIsLogoutModalOpen(true)} className="text-white hover:text-gray-300 cursor-pointer">Logout</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Data Produk</h1>
        </div>
        {notification && <div className="notification bg-white p-2 my-2 text-slate-900 rounded-md">{notification}</div>}

        <AddModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          post={currentPost}
          setPost={setCurrentPost}
        />

        <EditDataModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onUpdate={updateData}
          editingData={editingData}
          setEditingData={setEditingData}

        />

        {/* <RemoveModal
          isOpen={isRemoveModalOpen}
          onClose={handleCloseModal}
          onUpdate={updateData}
          removeData={removeData}
          setRemoveData={setRemoveData}
          showNotification={showNotification}
          handleDelete={handleDelete}
        /> */}
        <RemoveModal
          isOpen={isRemoveModalOpen}
          onClose={handleCloseModal}
          removeData={removeData}
          handleDelete={handleDelete}
        />

        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleLogoutConfirm}
        />
        <div className="table-container w-full h-full overflow-auto">
          <Card className="w-full h-full">
            <Card.Body>
              <Card.Title tag="h2" className="flex justify-between items-center">
                <button className="btn btn-primary mb-4" onClick={() => handleOpenModal()}>Tambah Data</button>
                <Form onSubmit={handleSearch}>
                  <Input
                    bordered
                    type="text"
                    placeholder="Search"
                    className="w-24 md:w-auto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form>
              </Card.Title>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="th-id">NO</th>
                      <th className="th-name">Nama</th>
                      <th className="th-description">Deskripsi</th>
                      <th className="th-update">Update</th>
                      <th className="th-delete">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(posts) && posts.map((post, index) => (
                      <tr key={post?.id}>
                        <td>{index + 1}</td>
                        <td>{post?.nama}</td>
                        <td>{post?.deskripsi}</td>
                        <td>
                          <button
                            onClick={() => handleEditModalOpen(post)}
                            className="btn btn-info btn-sm">
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleRemoveModalOpen(post)}
                            className="btn btn-danger btn-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Tambahkan kondisi jika tidak ada hasil pencarian */}
                    {Array.isArray(posts) && posts.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">Tidak ada hasil pencarian.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

        </div>

      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Home;
