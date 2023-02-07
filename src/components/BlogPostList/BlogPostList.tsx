import BlogPostCard from "../BlogPostCard/BlogPostCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import style from "./BlogPostList.module.scss";

type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
};

const BlogPostList = () => {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getpostData,
  });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data) {
    throw Error("something went wrong!");
  }
  console.log(data);

  return (
    <div className={style.postsWrapper}>
      {data.map((post) => (
        <Link
          className={style.cardlink}
          key={post.id}
          to={`/blogPost/${post.id}`}
        >
          <BlogPostCard
            id={post.id}
            title={post.title}
            author={post.author}
            content={post.content}
          />
        </Link>
      ))}
    </div>
  );
};

export default BlogPostList;

const getpostData = () => {
  return axios.get("http://localhost:3004/posts").then(({ data }) => data);
};
