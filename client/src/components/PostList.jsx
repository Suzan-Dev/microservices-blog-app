import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:8000/api/posts");
    setPosts(Object.values(res.data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <hr />
      <h2>Posts</h2>
      <div className="mt-2 row row-cols-3 g-4">
        {posts.map((post) => (
          <div key={post.id} className="column">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
