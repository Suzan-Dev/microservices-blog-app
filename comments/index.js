import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";

const commentsByPostId = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/posts/:postId/comments", (req, res) => {
  res.send(commentsByPostId[req.params.postId] || []);
});

app.post("/api/posts/:postId/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.postId] || [];
  comments.push({
    id,
    content,
  });
  commentsByPostId[req.params.postId] = comments;

  res.status(201).send(commentsByPostId[req.params.postId]);
});

app.listen(8001, () => {
  console.log("listening on port 8001");
});
