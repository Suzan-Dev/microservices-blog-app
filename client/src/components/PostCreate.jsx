import axios from "axios";
import { useRef } from "react";

const PostCreate = () => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.title.value) {
      return;
    }

    await axios.post("http://localhost:8000/api/posts", {
      title: e.target.title.value,
    });

    formRef.current?.reset();
  };

  return (
    <>
      <h2 className="mt-3">Create Post</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" />
        </div>
        <button className="btn btn-primary my-3">Submit</button>
      </form>
    </>
  );
};

export default PostCreate;
