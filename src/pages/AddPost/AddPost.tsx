import style from "./AddPost.module.scss";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../modules/getData";

export const AddPost = () => {
  const authorRef: any = useRef();
  const titleRef: any = useRef();
  const contentRef: any = useRef();
  const navigate = useNavigate();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => navigate(`/blogPost/${data.insertId}`),
  });

  const handleSubmit = () => {
    createPostMutation.mutate({
      title: titleRef.current.value,
      author: authorRef.current.value,
      content: contentRef.current.value,
    });
  };

  return (
    <div>
      <form
        className={style.addPostContainer}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label className={style.inputLabel}>
          Author
          <input type="text" ref={authorRef} />
        </label>
        <label className={style.inputLabel}>
          Title
          <input type="text" ref={titleRef} />
        </label>
        <label className={style.inputLabel}>
          your content
          <input type="text" ref={contentRef} />
        </label>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
