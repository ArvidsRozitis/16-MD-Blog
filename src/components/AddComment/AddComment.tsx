import style from "./AddComment.module.scss";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CommentProps = {
  postId: string;
  author: string;
  commentText: string;
};

export const AddComment = ({ postId }: any) => {
  const commentRef: any = useRef();

  const { mutate } = useAddCommentData();

  const handleAddCommentSubmit = () => {
    const comment = {
      postId: postId,
      author: "Arvīds",
      commentText: commentRef.current.value,
    };
    mutate(comment);
  };

  return (
    <form
      className={style.addCommentFormWrapper}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddCommentSubmit();
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

const addComment = (commentData: CommentProps) => {
  return axios.post(`http://localhost:3004/comments`, commentData);
};

const useAddCommentData = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};
