import style from "./BlogPostCard.module.scss";
import commentIcon from "../../assets/icons/comment-icon.svg";
import { Link } from "react-router-dom";

type PostProps = {
  postId: number;
  title: string;
  author: string;
  content: string;
};

export const BlogPostCard = ({ title, author, content, postId }: PostProps) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <img
          src={`https://picsum.photos/id/${postId}/400`}
          alt="blog picture"
          className={style.picture}
        />
        <div className={style.infoWrapper}>
          <div className={style.topWrapper}>
            <Link className={style.cardlink} to={`/blogPost/${postId}`}>
              <h2 className={style.title}>{title}</h2>
            </Link>
            <span className={style.date}>created: 2022.10.01.</span>
          </div>
          <div>
            <span className={style.helperText}>created by: </span>
            <span className={style.user}>{author}</span>
          </div>
          <p className={style.paragraph}>{content}</p>
          <div className={style.botWrapper}>
            <div className={style.commentCountContainer}>
              <img src={commentIcon} alt="icon" className={style.commentIcon} />
              <span className={style.commentCount}>{0}</span>
            </div>
            <Link className={style.cardlink} to={`/blogPost/${postId}`}>
              <span className={style.readMore}>read more</span>
            </Link>
          </div>
        </div>
      </div>
      <hr className={style.hr} />
    </div>
  );
};

export default BlogPostCard;
