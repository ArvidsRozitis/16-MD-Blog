import { useState, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getSinglePostData } from "../../modules/getData";

type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
};

const EditPostForm = ({ id }: any) => {
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getSinglePostData(id!),
  });

  const queryClient = useQueryClient();

  const [author, setAuthor] = useState(data?.author!);
  const [title, setTitle] = useState(data?.title!);
  const [content, setContent] = useState(data?.content!);

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => queryClient.invalidateQueries(["post"]),
  });

  const handleEditSubmit = () => {
    editPostMutation.mutate({
      id,
      title: title,
      author: author,
      content: content,
    });
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data) {
    throw Error("something went wrong!");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditSubmit;
      }}
    >
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Author
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label>
        Content
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
    </form>
  );
};

export { EditPostForm };

const editPost = (editPostData: Post) => {
  return axios.put(
    `http://localhost:3004/posts/${editPostData.id}`,
    editPostData
  );
};
