import style from "./BlogPostCard.module.scss";
import commentIcon from "../../assets/icons/comment-icon.svg";

type PostProps = {
  id: number;
  title: string;
  author: string;
  content: string;
};

export const BlogPostCard = ({ title, author, content, id }: PostProps) => {
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
            <h2 className={style.title}>{title}</h2>
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
              <span className={style.commentCount}>0</span>
            </div>
            <span className={style.comments}>read more</span>
          </div>
        </div>
      </div>
      <hr className={style.hr} />
    </div>
  );
};

export default BlogPostCard;
