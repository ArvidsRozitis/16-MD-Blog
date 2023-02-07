
import BlogPostList from "../../components/BlogPostList/BlogPostList";
import style from "./Blog.module.scss"

export const Blog = () => {
    return (
        <div>
            <div>
                <h1>Welcome to the Blog page, <br /> here You can find some information </h1>
            </div>
            <BlogPostList />
        </div>
    );
};

export default Blog;