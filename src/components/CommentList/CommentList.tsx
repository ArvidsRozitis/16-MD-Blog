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
  console.log("Coment list", id);

  const { data, isLoading } = useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: () => getCommentsForPost(id),
  });

  const { mutate } = useDeleteCommentData();

  const handleDeleteCommentClick = (id: number) => {
    mutate(id);
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
          author={comment.author}
          commentText={comment.commentText}
          onClick={() => handleDeleteCommentClick(comment.id)}
        />
      ))}
    </div>
  );
};

export default CommentList;


//===================================axios
const getCommentsForPost = (id: string) => {
  return axios
    .get(`http://localhost:3004/comments?postId=${id}`)
    .then(({ data }) => data);
};

const deleteComment = (commentId: number) => {
  return axios.delete(`http://localhost:3004/comments/${commentId}`);
};


//===================================hooks
//===================================hooks
//===================================hooks
//===================================hooks
const useDeleteCommentData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

