import Comment from "../Comment/Comment";
import { useQuery } from "@tanstack/react-query";
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
    queryFn: () => getCommentData(id),
  });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data) {
    throw Error("something went wrong!");
  }
  console.log(data);

  return (
    <div>
      {data.map((comment) => (
        <Comment
          key={Math.random()}
          author={comment.author}
          commentText={comment.commentText}
        />
      ))}
    </div>
  );
};

export default CommentList;

const getCommentData = (id: string) => {
  return axios
    .get(`http://localhost:3004/comments?postId=${id}`)
    .then(({ data }) => data);
};
