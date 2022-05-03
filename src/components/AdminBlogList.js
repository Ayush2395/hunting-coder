import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import firebaseService, { que } from "../service/firebase.service";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Fade from "react-reveal/Fade";
import { useAppContext } from "../context/AppState";

function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);

  const { getBlogId } = useAppContext();

  useEffect(() => {
    readAllBlogData();
  }, []);

  function readAllBlogData() {
    onSnapshot(que, (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }

  async function deleteBlog(id) {
    await firebaseService.deleteBlog(id);
  }
  return (
    <>
      <Card
        style={{
          minWidth: "850px",
          position: "relative",
          right: "140px",
          marginTop: "20px",
        }}
      >
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Author</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <Fade top>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.content.substr(0, 30)}</td>
                      <td>{item.author}</td>
                      <td>
                        <Button
                          className="mx-1"
                          onClick={() => getBlogId(item.id)}
                          variant="outline-info"
                        >
                          <AiFillEdit />
                        </Button>
                        <Button
                          className="mx-1"
                          onClick={() => deleteBlog(item.id)}
                          variant="outline-danger"
                        >
                          <AiFillDelete />
                        </Button>
                      </td>
                    </Fade>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default AdminBlogList;
