import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import style from "./BlogPost.module.scss";
import commentIcon from "../../assets/icons/comment-icon.svg";
import AddComment from "../../components/AddComment/AddComment";
import CommentList from "../../components/CommentList/CommentList";

type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
};

export const BlogPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getpostData(id!),
  });

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

  console.log(data);

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
            <button onClick={() => handleDeleteCommentClick(id!)}>delete</button>
          </div>
        </div>
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
  return axios.delete(`http://localhost:3004/posts/${id}`)
}

const useDeletePost = () => {
  const navigate = useNavigate();
  return useMutation(deletePost, {
    
    onSuccess: () => navigate(`/blogPage`),
  });
};