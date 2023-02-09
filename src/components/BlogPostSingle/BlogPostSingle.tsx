import style from "./BlogPostSingle.module.scss";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import commentIcon from "../../assets/icons/comment-icon.svg";
import { useNavigate } from "react-router-dom";
import { deletePost, getSinglePostData } from "../../modules/getData";
import deleteIcon from "../../assets/icons/delete-icon.svg";

type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
};

const BlogPostSingle = ({ postId }: any) => {
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getSinglePostData(postId!),
  });

  const navigate = useNavigate();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => navigate(`/blogPage`),
  });
  const handleDeletePostClick = (id: string) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data) {
    throw Error("something went wrong!");
  }
  return (
    <div className={style.postWrapper}>
      <div className={style.postContainer}>
        <img
          src={`https://picsum.photos/id/${postId}/400`}
          alt="blog picture"
          className={style.picture}
        />
        <div className={style.infoWrapper}>
          <div className={style.topWrapper}>
            <h2 className={style.title}>{data.title}</h2>
            <span className={style.date}>created: 2022.10.01.</span>
          </div>
          <div className={style.secoundWrapper}>
            <div>
              <span className={style.helperText}>created by: </span>
              <span className={style.user}>{data.author}</span>
            </div>
          </div>
          <p className={style.paragraph}>{data.content}</p>
          <div className={style.bottomInfoWrapper}>
            <div className={style.commentCountContainer}>
              <label className={style.helperText}>
                last activity: 2022.10.13.
              </label>
              <img src={commentIcon} alt="icon" className={style.commentIcon} />
              <span className={style.commentCount}>{0}</span>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleDeletePostClick(postId!)}
              className={style.buttonDelete}
            >
              <img src={deleteIcon} alt="del" className={style.iconDelete} />
              delete post
            </button>
          </div>
        </div>

        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit(String(data.id));
          }}
        >
          <label>
            Title
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            />
          </label>
        </form> */}
      </div>
    </div>
  );
};

export default BlogPostSingle;
