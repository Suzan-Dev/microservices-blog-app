const CommentList = ({ comments }) => {
  const filterCommentContent = ({ status, content }) => {
    if (status === "approved") {
      return content;
    } else if (status === "pending") {
      return "This comment is awaiting approval";
    } else if (status === "rejected") {
      return "This comment has been rejected";
    } else {
      return "";
    }
  };

  return (
    <ul className="">
      {comments.map((comment) => (
        <li key={comment.id}>{filterCommentContent(comment)}</li>
      ))}
    </ul>
  );
};

export default CommentList;
