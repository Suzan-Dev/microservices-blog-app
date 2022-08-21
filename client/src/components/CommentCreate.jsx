import axios from "axios";
import { useRef } from "react";

const CommentCreate = (props) => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.content.value) {
      return;
    }

    await axios.post(
      `http://localhost:8001/api/posts/${props.postId}/comments`,
      {
        content: e.target.content.value,
      }
    );

    formRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="form-group">
        <label htmlFor="comment">Add Comment</label>
        <input
          type="text"
          className="form-control"
          id="comment"
          name="content"
        />
      </div>
      <button className="btn btn-primary my-3">Submit</button>
    </form>
  );
};

export default CommentCreate;
