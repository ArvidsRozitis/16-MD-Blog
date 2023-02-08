import style from "./Comment.module.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Comment = {
  id: number
  postId: string;
  author: string;
  commentText: string;
};

type CommentProps = {
  author: string;
  commentText: string;
  id: number;
  postId: string
  onClickDelete: () => void;
};

const Comment = ({ author, commentText, onClickDelete, id, postId }: CommentProps) => {
  const [comment, setComment] = useState(commentText);
  const { mutate: editComment } = useEditCommentData();

  const handleEditCommentSubmit = () => {
    const commentData = {
      id,
      commentText: comment,
      postId,
      author      
    }
    
    editComment(commentData);
  };

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
        <button className={style.buttonDelete} onClick={onClickDelete}>
          x
        </button>
        <button className={style.buttonDelete}>edit</button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditCommentSubmit();
          }}
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              e.preventDefault();
              console.log(comment);
              setComment(e.target.value);
            }}
          />
          <button>save</button>
          <button>cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;

const editComment = ({id, author, commentText, postId}: Comment) => {
  return axios.put(`http://localhost:3004/comments/${id}`,{
    author,
    commentText,
    postId,
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
