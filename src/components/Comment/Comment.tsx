import deleteIcon from "../../assets/icons/delete-icon.svg";
import style from "./Comment.module.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Comment = {
  id: number;
  postId: string;
  author: string;
  commentText: string;
};

type CommentProps = {
  author: string;
  commentText: string;
  id: number;
  postId: string;
  onClickDelete: () => void;
};

const Comment = ({
  author,
  commentText,
  onClickDelete,
  id,
  postId,
}: CommentProps) => {
  const [comment, setComment] = useState('');
  const [visableEditField, setVisableEditField] = useState(false);
  const { mutate: editComment } = useEditCommentData();

  const handleEditCommentSubmit = () => {
    const commentData = {
      id,
      commentText: comment,
      postId,
      author,
    };

    editComment(commentData);
  };

  return (
    <div className={style.comment}>
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
          <div className={style.buttonContainer}>
            <button
              className={style.buttonEdit}
              onClick={() => setVisableEditField(!visableEditField)}
            >
              edit
            </button>
            <button className={style.buttonDelete} onClick={onClickDelete}>
              <img src={deleteIcon} alt="del" className={style.iconDelete} />
            </button>
          </div>

          {visableEditField ? <h1>heiii</h1> : null}

          <div className={style.formContainer}>
            <form
              className={style.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleEditCommentSubmit();

              }}
            >
              <input
                className={style.inputField}
                type="text"
                value={comment}
                onChange={(e) => {
                  e.preventDefault();
                  setComment(e.target.value);
                }}
              />
              <div>
                <button>save</button>
              </div>
            </form>
            <div className={style.buttonWrapper}>
              <button
                className={style.button}
                onClick={() => setVisableEditField(!visableEditField)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className={style.hr} />
    </div>
  );
};

export default Comment;

const editComment = ({ id, author, commentText, postId }: Comment) => {
  return axios.put(`http://localhost:3004/posts/comments/${id}`, {
    author,
    commentText,
    postId,
  }).then((res)=> {
    console.log('res', res)
  });
};

const useEditCommentData = () => {
  const queryClient = useQueryClient();
  return useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

function commentForm() {}
