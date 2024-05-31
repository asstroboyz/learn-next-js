import React, { useState, useEffect } from "react";
import axios from "axios";
import AddModal from "../Components/AddModal";
// Menggunakan jalur relatif untuk memuat global.css

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts();
  }, []);

  const handleOpenModal = (post = { id: "", title: "", body: "" }) => {
    setCurrentPost(post);
    setIsUpdating(!!post.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost({ id: "", title: "", body: "" });
    setIsUpdating(false);
  };

  const handleSubmit = async () => {
    if (isUpdating) {
      await axios.put(`${apiEndPoint}/${currentPost.id}`, currentPost);
      setPosts(posts.map((p) => (p.id === currentPost.id ? currentPost : p)));
    } else {
      const { data: newPost } = await axios.post(apiEndPoint, currentPost);
      setPosts([newPost, ...posts]);
    }
    handleCloseModal();
  };

  const handleDelete = async (post) => {
    await axios.delete(`${apiEndPoint}/${post.id}`);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  if (posts.length === 0) return <h2>There are no posts in the Database</h2>;

  return (
    <>
      <div className="container">
        <h2>There are {posts.length} posts in the Database</h2>
        <button
          onClick={() => handleOpenModal()}
          className="btn btn-primary btn-sm">
          Add Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    onClick={() => handleOpenModal(post)}
                    className="btn btn-info btn-sm">
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        post={currentPost}
        setPost={setCurrentPost}
      />
    </>
  );
};

export default Home;
