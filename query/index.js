import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/events", (req, res) => {
  const { type, data } = req.body;

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

  res.send({});
});

app.listen(8002, () => {
  console.log("listening on port 8002");
});
