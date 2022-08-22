import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

const handleEvent = async (type, data) => {
  if (type === "CommentCreated") {
    const status = data.content.toLowerCase().includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:8005/api/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }
};

app.post("/api/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(8003, async () => {
  console.log("listening on port 8003");

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
