import { useEffect, useState } from "react";
import axios from "axios";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:8001/api/posts/${props.postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <ul className="">
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
