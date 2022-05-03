import React from "react";
import { Container } from "react-bootstrap";
import AddBlog from "./AddBlog";
import AdminBlogList from "./AdminBlogList";

function Admin() {
  return (
    <>
      <section className="section admin_panel">
        <Container
          className="d-flex justify-content-center align-items-center my-5"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <AddBlog />
            <AdminBlogList />
          </div>
        </Container>
      </section>
    </>
  );
}

export default Admin;
