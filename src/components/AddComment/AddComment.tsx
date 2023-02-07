import style from "./AddComment.module.scss";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type CommentProps = {
  postId: string;
  author: string;
  commentText: string;
};

export const AddComment = ({ postId }: any) => {
  const commentRef: any = useRef();

  const createPostMutation = useMutation({
    mutationFn: UploadComment,
  });

  const handleAddComment = () => {
    createPostMutation.mutate({
      author: "Arvīds",
      commentText: commentRef.current.value,
      postId: postId,
    });
  };

  return (
    <form
      className={style.addCommentFormWrapper}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddComment();
      }}
    >
      <img
        src="https://picsum.photos/200"
        alt="user image"
        className={style.userPicture}
      />
      <div className={style.commentWrapper}>
        <input
          ref={commentRef}
          className={style.commentField}
          type="text"
          placeholder="write Your comment..."
        />
        <button>post</button>
      </div>
    </form>
  );
};

export default AddComment;

const UploadComment = ({ author, commentText, postId }: CommentProps) => {
  return axios
    .post(`http://localhost:3004/comments`, {
      author,
      commentText,
      postId,
    })
    .then(({ data }) => data);
};
