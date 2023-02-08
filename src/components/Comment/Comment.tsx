import style from "./Comment.module.scss";

type CommentProps = {
  author: string;
  commentText: string;
  id: number;
  onClick: () => void;
};

const Comment = ({ author, commentText, onClick }: CommentProps) => {
  return (
    <div className={style.commentContainer}>
      <img
        src="https://picsum.photos/200"
        alt="user image"
        className={style.userPicture}
      />
      <div className={style.commentWrapper}>
        <div className={style.commentInfoWrapper}>
          <h3 className={style.user}>{author}</h3>
          <h3 className={style.helperText}>date: 2023.12.12</h3>
        </div>
        <p className={style.paragraph}>{commentText}</p>
        <button className={style.buttonDelete} onClick={onClick}>
          x
        </button>
      </div>
    </div>
  );
};

export default Comment;
