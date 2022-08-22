import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, status, postId } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.content = content;
    comment.status = status;
  }
};

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(8002, async () => {
  console.log("listening on port 8002");

  try {
    const res = await axios.get("http://localhost:8005/api/events");

    for (const event of res.data) {
      console.log("Processing event: ", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err.message);
  }
});
