import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import style from "./BlogPost.module.scss";
import commentIcon from "../../assets/icons/comment-icon.svg";

type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
};

export const BlogPost = () => {
  const { id }: any = useParams();
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getpostData(id),
  });

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <img
          src="https://picsum.photos/400"
          alt="blog picture"
          className={style.picture}
        />
        <div className={style.infoWrapper}>
          <div className={style.topWrapper}>
            <h2 className={style.title}>{"title"}</h2>
            <span className={style.date}>2022.10.01.</span>
          </div>
          <div>
            <span className={style.helperText}>created by: </span>
            <span className={style.user}>{"author"}</span>
          </div>
          <p className={style.paragraph}>{"content"}</p>
          <div className={style.botWrapper}>
            <div className={style.commentCountContainer}>
              <img src={commentIcon} alt="icon" className={style.commentIcon} />
              <span className={style.commentCount}>0</span>
            </div>
            <a className={style.comments}>read more</a>
          </div>
        </div>
      </div>
      <hr className={style.hr} />
    </div>
  );
};

export default BlogPost;

const getpostData = (id : string) => {
  return axios.get(`http://localhost:3004/posts/${id}`).then(({ data }) => data);
};
