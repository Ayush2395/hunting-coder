import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAppContext } from "../context/AppState";
import firebaseService, { timeStamp } from "../service/firebase.service";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const { message, setMessage, blogId, setBlogId } = useAppContext();

  const addBlogs = async (event) => {
    event.preventDefault();
    setMessage("");

    if (title === "" || content === "" || author === "") {
      setMessage({ error: true, msg: "Invalid inputs" });
      return;
    }

    const blogDetail = {
      title: title,
      content: content,
      author: author,
      timeStamp: timeStamp,
    };

    try {
      if (blogId !== undefined && blogId !== "") {
        await firebaseService.updateBlog(blogId, blogDetail);
        setMessage({ error: false, msg: "Blog is updated" });
        setBlogId("");
      } else {
        await firebaseService.addBlog(blogDetail);
        setMessage({ error: false, msg: "Your blog is added" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setContent("");
    setAuthor("");
  };

  useEffect(() => {
    if (blogId !== undefined && blogId !== "") {
      editHandler();
    }
  }, [blogId]);

  async function editHandler() {
    try {
      const snapShot = await firebaseService.getBlogDoc(blogId);
      setTitle(snapShot.data().title);
      setContent(snapShot.data().content);
      setAuthor(snapShot.data().author);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  }

  return (
    <>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <Card>
        <Card.Body>
          <Form onSubmit={addBlogs}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">Blog Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="content">Blog Content</Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as={"textarea"}
                id="content"
                type="text"
                placeholder="write content here"
                style={{ minHeight: "180px", resize: "none" }}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="author">Blog Author name</Form.Label>
              <Form.Control
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                id="author"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="date">Date</Form.Label>
              <Form.Control id="date" type="date" />
            </Form.Group>
            <Button
              type="submit"
              className="mb-3 w-100"
              variant="outline-warning"
            >
              Add Blog
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddBlog;
