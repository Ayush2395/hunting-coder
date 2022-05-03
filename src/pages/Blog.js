import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collectionRef } from "../service/firebase.service";
import { doc } from "firebase/firestore";

export default function Blog() {
  const [blog, setBlog] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    blogDetail();
  }, []);

  function blogDetail() {
    collectionRef
      .doc()
      .get(id)
      .then((snapShot) => {
        const data = snapShot.data();
        setBlog(data);
      });
  }

  return (
    <>
      <Container>
        <h1>Title: {blog.title}</h1>
        <p>Content: {blog.content}</p>
        <p>Author: {blog.author}</p>
      </Container>
    </>
  );
}
