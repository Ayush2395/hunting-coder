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
      <section className="section">
        <Container className="my-4">
          <Row className="justify-content-md-center">
            {blogs.map((item) => {
              return (
                <Col
                  xs="md"
                  className="justify-content-center align-content-center mb-5"
                  key={item.id}
                >
                  <Flip left>
                    <Card style={{ width: "auto" }}>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.content.substr(0, 30)}...</Card.Text>
                        <Card.Text>{item.author}</Card.Text>
                        <Card.Link as={Link} to={`${item.id}`}>
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
      </section>
    </>
  );
}
