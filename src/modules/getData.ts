import axios from "axios";

type PostProps = {
  title: string;
  author: string;
  content: string;
};

type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
};

const getpostData = () => {
  return axios.get("http://localhost:3004/posts").then((res) => res.data);
};

const getSinglePostData = (id: string) => {
  return axios
    .get<Post>(`http://localhost:3004/posts/${id}`)
    .then(({ data }) => data);
};

const deletePost = (id: string) => {
  return axios.delete(`http://localhost:3004/posts/${id}`);
};

const createPost = ({ title, author, content }: PostProps) => {
  return axios
    .post(`http://localhost:3004/posts`, {
      title,
      author,
      content,
    })
    .then(({ data }) => {
      return data;
    });
};

export {
  getpostData,
  getSinglePostData,
  // getCommentsForPost,
  deletePost,
  createPost,
};
