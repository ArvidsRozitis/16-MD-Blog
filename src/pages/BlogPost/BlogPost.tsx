import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import style from "./BlogPost.module.scss";
import commentIcon from "../../assets/icons/comment-icon.svg";
import AddComment from "../../components/AddComment/AddComment";
import CommentList from "../../components/CommentList/CommentList";
import { useRef, useState } from "react";

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
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getpostData(id!),
  });

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
  const { mutate: deletePost } = useDeletePost();
  const handleDeleteCommentClick = (id: string) => {
    deletePost(id);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data) {
    throw Error("something went wrong!");
  }

  return (
    <div className={style.postWrapper}>
      <div className={style.postContainer}>
        <img
          src="https://picsum.photos/400"
          alt="blog picture"
          className={style.picture}
        />
        <div className={style.infoWrapper}>
          <div className={style.topWrapper}>
            <h2 className={style.title}>{data.title}</h2>
            <span className={style.date}>created: 2022.10.01.</span>
          </div>
          <div className={style.secoundWrapper}>
            <div>
              <span className={style.helperText}>created by: </span>
              <span className={style.user}>{data.author}</span>
            </div>
            <div className={style.commentCountContainer}>
              <label className={style.helperText}>
                last activity: 2022.10.13.
              </label>
              <img src={commentIcon} alt="icon" className={style.commentIcon} />
              <span className={style.commentCount}>0</span>
            </div>
          </div>
          <p className={style.paragraph}>{data.content}</p>
          <div>
            <button onClick={() => handleDeleteCommentClick(id!)}>
              delete
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit(String(data.id));
          }}
        >
          <label>
            Title
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            />
          </label>
        </form>
      </div>
      <AddComment postId={id} />
      <CommentList id={id} />
    </div>
  );
};

export default BlogPost;

const getpostData = (id: string) => {
  return axios
    .get(`http://localhost:3004/posts/${id}`)
    .then(({ data }) => data);
};

const deletePost = (id: string) => {
  return axios.delete(`http://localhost:3004/posts/${id}`);
};

const editPost = ({ id, title }: PostProps) => {
  return axios.put(`http://localhost:3004/posts/${id}`, { title });
};

const useDeletePost = () => {
  const navigate = useNavigate();
  return useMutation(deletePost, {
    onSuccess: () => navigate(`/blogPage`),
  });
};
