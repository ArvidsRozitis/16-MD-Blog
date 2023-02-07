import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  console.log(id)

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
