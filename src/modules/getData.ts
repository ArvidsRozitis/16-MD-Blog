import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type PostProps = {
  title: string;
  author: string;
  content: string;
};

const getpostData = () => {
  return axios.get("http://localhost:3004/posts").then(({ data }) => data);
};

const getSinglePostData = (id: string) => {
  return axios
    .get(`http://localhost:3004/posts/${id}`)
    .then(({ data }) => data);
};

const getCommentsForPost = (postId: string) => {
  return axios
    .get(`http://localhost:3004/comments?postId=${postId}`)
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
    .then(({ data }) => data);
};





export {
  getpostData,
  getSinglePostData,
  getCommentsForPost,
  deletePost,
  createPost
};