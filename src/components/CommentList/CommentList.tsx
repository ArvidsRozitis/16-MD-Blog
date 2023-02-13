import Comment from "../Comment/Comment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CommentType = {
  author: string;
  commentText: string;
  postId: string;
  id: number;
};

const CommentList = ({ id }: any) => {
  const { data, isLoading } = useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: () => getCommentsForPost(id),
  });
  console.log(data)

  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });

  const handleDeleteCommentClick = (id: number) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data) {
    throw Error("something went wrong!");
  }

  return (
    <div>
      {data.map((comment) => (
        <Comment
          key={Math.random()}
          id={comment.id}
          postId={id}
          author={comment.author}
          commentText={comment.commentText}
          onClickDelete={() => handleDeleteCommentClick(comment.id)}
        />
      ))}
    </div>
  );
};

export default CommentList;

const getCommentsForPost = (id: string) => {
  return axios
    .get(`http://localhost:3004/posts/comments/${id}`)
    .then(({ data }) => data);
};

const deleteComment = (commentId: number) => {
  return axios.delete(`http://localhost:3004/posts/comments/${commentId}`);
};
