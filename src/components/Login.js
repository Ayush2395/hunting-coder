import React from "react";
import { Card, Container, Form } from "react-bootstrap";

function Login() {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}></div>
        <Card>
          <Card.Body>
            <h1 className="fs-2 mb-3">Login</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter your mail" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Admin Password" />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
