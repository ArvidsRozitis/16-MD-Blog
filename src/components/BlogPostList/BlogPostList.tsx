import BlogPostCard from "../BlogPostCard/BlogPostCard";
import { useQuery } from "@tanstack/react-query";
import style from "./BlogPostList.module.scss";
import { getpostData } from "../../modules/getData";

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

  return (
    <div className={style.postsWrapper}>
      {data.map((post) => (
        <BlogPostCard
          key={post.id}
          postId={post.id}
          title={post.title}
          author={post.author}
          content={post.content}
        />
      ))}
    </div>
  );
};

export default BlogPostList;
