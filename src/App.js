import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './components/edit.js'
//==================================================
//============== Bootstrap imports =================
import 'bootstrap/dist/css/bootstrap.min.css';
//buttons
import Button from 'react-bootstrap/Button';
//navbar
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//cards for blog posts
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//=================================================

const App = () => {
  //================================================
  //===================== Hooks ====================
  // hook for subject
  const [blogSubject, setBlogSubject] = useState('');
  // hook for details
  const [blogDetails, setBlogDetails] = useState('');
  // blog hook
  const [blogs, setBlogs] = useState([]);

  //================================================
  //================= Hooks for updating ===========
  // updating subject
  const [updateSubject, setUpdateSubject] = useState();
  // updating details
  const [updateDetails, setUpdateDetails] = useState();

  //================================================
  //============== On change functions =============
  // subject change function
  const newSubjectChange = (event) => {
    setBlogSubject(event.target.value)
  }

  // details change function
  const newDetailsChange = (event) => {
    setBlogDetails(event.target.value)
  }

  //================================================
  //================ Update functions ==============
  // udpate subject
  const handleUpdateSubject = (event) => {
    setUpdateSubject(event.target.value)
  }

  // update details
  const handleUpdateDetails = (event) => {
    setUpdateDetails(event.target.value)
  }
  //================================================
  //=============== other functions ================
  // submit form function
  const newBlogFormSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    axios.post(
      'https://outdoor-blog.herokuapp.com/blogs', {
      subject: blogSubject,
      details: blogDetails
    }
    ).then(() => {
      axios.get('https://outdoor-blog.herokuapp.com/blogs').then((response) => {
        setBlogs(response.data)
      })
    })
  }

  //================================================
  //=============== Delete =========================
  const handleDelete = (blogData) => {
    axios.delete(`https://outdoor-blog.herokuapp.com/blogs/${blogData.id}`)
      .then(() => {
        axios.get('https://outdoor-blog.herokuapp.com/blogs').then((response) => {
          setBlogs(response.data)
        })
      })
  }

  //================================================
  //========== Submit for update ===================
  const updateSubmit = (blogData) => {
    axios.put(`https://outdoor-blog.herokuapp.com/blogs/${blogData.id}`,
      {
        subject: updateSubject,
        details: updateDetails
      }).then(() => {
        axios.get('https://outdoor-blog.herokuapp.com/blogs')
          .then((response) => {
            setBlogs(response.data)
          })
      })
  }

  //=================================================
  //============= Use Effect ========================
  useEffect(() => {
    axios.get('https://outdoor-blog.herokuapp.com/blogs').then((response) => {
      setBlogs(response.data)
    })
  }, [])

  //====================================================
  //====================================================
  return (
    <>
      <div>
        {/* nav bar bootstrap / react */}
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">About</Nav.Link>
                <Nav.Link href="#action2">Blogs</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <h1>Evin's Outdoor Blog</h1>
      </div>
      <section>
        {/* Create a blog section */}
        <form onSubmit={newBlogFormSubmit}>
          Title:<input type="text" onChange={newSubjectChange}></input><br /><br />
          Description:<textarea type="text" rows="20" cols="70" onChange={newDetailsChange}></textarea><br /><br />
          <Button variant="primary" size="lg" type="submit" value="submit blog">Submit Blog</Button>
        </form>
      </section>
      {/* Show blogs section */}
      <section>
        <h2>Blogs: </h2>
        <Row sm={1} md={3} className="g-4">
          {
            blogs.map((blog, i) => {
              return (<>
                <div key={i}>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Text>
                          <Blog key={i} blog={blog} updateSubmit={updateSubmit}
                            handleUpdateSubject={handleUpdateSubject}
                            handleUpdateDetails={handleUpdateDetails}
                            handleDelete={handleDelete} />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                </div>
              </>
              )
            })
          }
        </Row>
      </section>




    </>
  )
}


export default App;
