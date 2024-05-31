import React, { useState, useEffect } from "react";
import axios from 'axios';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Card } from "react-daisyui";
import { Menu } from "react-daisyui";
import { Badge } from "react-daisyui";
import AddModal from "/components/AddModal";
import EditDataModal from "/components/EditDataModal";
import RemoveModal from "../Components/RemoveModal";

const Home = () => {
  const [notification, setNotification] = useState(null);
  const [posts, setPosts] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({ nama: "", deskripsi: "" }); //
  const [editingData, setEditingData] = useState({ id: "", nama: "", deskripsi: "" }); // edt data
  const [removeData, setRemoveData] = useState({ id: "", nama: "", deskripsi: "" }); // hapus data
  const apiEndPoint = 'http://localhost:5000/api/products'; // endPoint data 


  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 90);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiEndPoint}/`);
      setPosts(response.data.data); // Menggunakan if data kosong
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  //fetching data
  useEffect(() => {
    fetchData();
  }, []);


  // open modal tambah
  const handleOpenModal = (post = { nama: "", deskripsi: "" }) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  // modal edit
  const handleEditModalOpen = (post) => {
    setEditingData(post);
    setIsEditModalOpen(true);
  };

  //modal remove
  const handleRemoveModalOpen = (post) => {
    setRemoveData(post);
    setIsRemoveModalOpen(true);
  };


  // menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsRemoveModalOpen(false);
    setCurrentPost({ nama: "", deskripsi: "" });
    setEditingData({ id: "", nama: "", deskripsi: "" });
  };


  //// Fungsi untuk menangani submit form tambah/edit data
  const handleSubmit = async () => {
    console.log(currentPost)
    try {
      if (currentPost.id) {
        await axios.put(`${apiEndPoint}/${currentPost.id}`, currentPost);
        setPosts(posts.map((p) => (p.id === currentPost.id ? currentPost : p)));
        showNotification("Data berhasil diperbarui!");
      } else {
        const response = await axios.post(`${apiEndPoint}/`, currentPost);
        console.log(response.data.product)
        setPosts([...posts, response.data.product]);
        showNotification("Data berhasil ditambahkan!");
      }

    } catch (error) {
      console.error("Error:", error);
      showNotification("Terjadi kesalahan saat memproses data.");
    } finally {
      handleCloseModal();
      setTimeout(fetchData, 500);
    }
  };

  // Fungsi untuk mengupdate data yang sedang di-edit
  // const updateData = async () => {
  //   try {
  //     await axios.put(`${apiEndPoint}/${editingData.id}`, editingData);
  //     setPosts(posts.map((p) => (p.id === editingData.id ? editingData : p)));
  //     showNotification(`Data dengan ID ${editingData.id} dan nama ${editingData.nama} berhasil diperbarui!`);
  //     handleCloseModal();
  //     setTimeout(fetchData, 90);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     showNotification("Terjadi kesalahan saat memperbarui data.");
  //   }
  // };
  const updateData = async () => {
    // console.log("Memulai proses pembaruan data...");
    
    // Periksa apakah editingData dan editingData.id memiliki nilai yang valid
    // if (!editingData || !editingData.id) {
    //   console.error("Error: editingData atau editingData.id tidak valid.");
    //   return;
    // }
    // console.log(editingData.ID)
  
    try {
      // console.log(`Mengirim permintaan PUT ke ${apiEndPoint}/${editingData.ID} dengan data:`, editingData);
      await axios.put(`${apiEndPoint}/${editingData.ID}`, editingData);
    
      // console.log("Permintaan PUT berhasil. Memperbarui state posts.");
      setPosts(posts.map((p) => (p.id === editingData.id ? editingData : p)));
    
      const notificationMessage = `Data dengan ID ${editingData.id} dan nama ${editingData.nama} berhasil diperbarui!`;
      // console.log("Menampilkan notifikasi:", notificationMessage);
      showNotification(notificationMessage);
    
      // console.log("Menutup modal...");
      handleCloseModal();
    
      // console.log("Memulai ulang pengambilan data setelah 90ms.");
      setTimeout(fetchData, 90);
    
    } catch (error) {
      // console.error("Terjadi kesalahan saat memperbarui data:", error);
      showNotification("Terjadi kesalahan saat memperbarui data.");
    }
    
    console.log("Proses pembaruan data selesai.");
  };
  
  
  
  // Fungsi untuk menghapus data
  // const handleDelete = async (ID) => {
  //   try {
  //     await axios.delete(`${apiEndPoint}/${ID}`);
  //     console.log(`Data  with ID ${id} deleted successfully.`);
  //     setPosts(posts.filter((p) => p.ID !== ID));
  //     showNotification(`Data dengan ID ${id} berhasil dihapus!`);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //     showNotification("Terjadi kesalahan saat menghapus data.");
  //   }
  // };
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`${apiEndPoint}/${ID}`);
      console.log(`Data with ID ${ID} deleted successfully.`);
      setPosts(posts.filter((p) => p.id !== ID));
      showNotification(`Data dengan ID ${ID} berhasil dihapus!`);
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting data:", error);
      showNotification("Terjadi kesalahan saat menghapus data.");
    } finally {
      setTimeout(fetchData, 500); 
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Menu {...args}>
      <Menu.Item>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Inbox
          <Badge size="sm">99+</Badge>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updates
          <Badge color="warning" size="sm">
            NEW
          </Badge>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Stats
          <Badge color="info" size="xs" />
        </a>
      </Menu.Item>
    </Menu>
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

        <RemoveModal
          isOpen={isRemoveModalOpen}
          onClose={handleCloseModal}
          onUpdate={updateData}
          removeData={removeData}
          setRemoveData={setRemoveData}
          showNotification={showNotification}
          handleDelete={handleDelete}
        />

        <div className="table-container">
          <Card className="w-full">
            <Card.Body>
              <Card.Title tag="h2">
                <button className="btn btn-primary mb-2" onClick={() => handleOpenModal()}>Tambah</button>
              </Card.Title>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(posts) && posts.map((post, index) => (
                    <tr key={post.ID}>
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
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
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
