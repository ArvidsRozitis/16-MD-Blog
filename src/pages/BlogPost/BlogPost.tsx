import axios from "axios";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import style from "./BlogPost.module.scss";
import AddComment from "../../components/AddComment/AddComment";
import CommentList from "../../components/CommentList/CommentList";
import { useRef, useState } from "react";
import BlogPostSingle from "../../components/BlogPostSingle/BlogPostSingle";

type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
};

type PostProps = {
  id: string;
  title: string;
};

export const BlogPost = () => {
  const [title, setTitle] = useState(" ");
  const titleRef: any = useRef();
  const queryClient = useQueryClient();
  const { id } = useParams();

  //========================================
  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => queryClient.invalidateQueries(["post"]),
  });

  const handleEditSubmit = (id: string) => {
    editPostMutation.mutate({
      id: id,
      title: titleRef.current.value,
    });
  };

  //========================================

  return (
    <div className={style.pageWrapper}>
      <BlogPostSingle postId={id} />
      <AddComment postId={id} />
      <CommentList id={id} />
    </div>
  );
};

export default BlogPost;

const editPost = ({ id, title }: PostProps) => {
  return axios.put(`http://localhost:3004/posts/${id}`, { title });
};
