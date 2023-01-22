import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add.js'
import Edit from './components/Edit.js'
import './App.css'

//=========== Bootstrap for React imports =================
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

//=======================================================
//=======================================================
const App = () => {

  //=========================================
  //============= Hooks =====================
  // const [posts, setPosts] = useState([]);
  let [blog, setBlog] = useState([]);

  //=========================================
  //========== Functions ====================
  // delete function
  const handleDelete = (event) => {
    axios.delete('https://outdoor-blog.herokuapp.com/blogs/' + event.target.value)
      .then((response) => {
        getBlog();
      })
  }

  // handle create function
  const handleCreate = (addBlogger) => {
    axios.post('https://outdoor-blog.herokuapp.com/blogs', addBlogger)
      .then((response) => {
        console.log(response);
        //calling getBlog to get a refresh with new blog
        getBlog();
      })
  }

  // get request to api
  const getBlog = () => {
    axios.get('https://outdoor-blog.herokuapp.com/blogs').then(
      (response) => setBlog(response.data.sort((a, b) => {
        //sorting posts from newest to oldest
        return b.id - a.id;
      })),
      (err) => console.log(err),
    )
  }

  //handle update function
  const handleUpdate = (editBlogger) => {
    axios.put('https://outdoor-blog.herokuapp.com/blogs/' + editBlogger.id, editBlogger)
      .then((response) => {
        getBlog();
      })
  }

  //========================================
  //======== Use Effect ====================
  useEffect(() => {
    getBlog();
  }, [])

  //=========================================
  //=========================================
  return (
    <>
      <h1>Evin's Outdoor Blog<img class="profile-pic" src="https://i.imgur.com/ihTy0QQ.jpg"></img></h1><hr />
      <Add handleCreate={handleCreate} />
      <div className="container">
        <Row sm={1} md="3" className="g-4">
          {
            blog.map((blogger) => {
              return (
                <div>
                  <Col>
                    <Card style={{ width: '20rem' }}>
                      <div className="blogger" key={blogger.id}>
                        <Card.Img src={blogger.image} />
                        <Card.Body>
                          <Card.Title>{blogger.subject}</Card.Title>
                          <Card.Text>
                            <Accordion>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>Read more:</Accordion.Header>
                                <Accordion.Body>
                                  <h4>{blogger.details}</h4>
                                  <Edit handleUpdate={handleUpdate} blogger={blogger} /><br />
                                  <Button variant="danger" onClick={handleDelete} value={blogger.id}>Remove Blog</Button>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </Card.Text>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                </div>
              )
            })
          }
        </Row>
      </div >
    </>
  )
}

export default App;
