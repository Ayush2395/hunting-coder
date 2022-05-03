import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { que } from "../service/firebase.service";
import Flip from "react-reveal/Flip";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    readAllBlogData();
  }, []);

  function readAllBlogData() {
    onSnapshot(que, (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }

  return (
    <>
      <Container className="my-4">
        <Row>
          {blogs.map((item) => {
            return (
              <Col
                xs="4"
                className="justify-content-center align-content-center mb-5"
                key={item.id}
              >
                <Flip left>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.content}</Card.Text>
                      <Card.Text>{item.author}</Card.Text>
                      <Card.Link as={Link} to={`blogs/${item.id}`}>
                        Read More
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Flip>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
