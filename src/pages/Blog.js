import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import firebaseService from "../service/firebase.service";
import Slide from "react-reveal/Slide";

export default function Blog() {
  const [blog, setBlog] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function readBlog() {
      try {
        const blogData = await firebaseService.getBlogDoc(id);
        setBlog(blogData.data());
      } catch (err) {
        console.log(err.message);
      }
    }
    readBlog();
  }, [id]);

  return (
    <>
      <section className="section blog_show">
        <Container
          className="d-flex justify-content-center my-5"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "850px" }}>
            <Slide left>
              <h1>{blog.title}</h1>
              <p style={{ textAlign: "justify" }}>{blog.content}</p>
              <h4 style={{ display: "inline" }}>Author: &nbsp;</h4>
              <span>{blog.author}</span>
            </Slide>
          </div>
        </Container>
      </section>
    </>
  );
}
