import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
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

//=================================================

const App = () => {
  //================================================
  //===================== Hooks ====================
  // hook for subject
  const [blogSubject, setBlogSubject] = useState();
  // hook for details
  const [blogDetails, setBlogDetails] = useState();
  // blog hook
  const [blog, setBlog] = useState();

  //================================================
  //================= Hooks for updating ===========


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
        setBlog(response.data)
      })
    })
  }

  //================================================
  //=============== Delete =========================
  // const handleDelete = (blogData) => {
  //   axios.delete(`https://outdoor-blog.herokuapp.com/blogs/${blogData._id}`)
  //     .then(() => {
  //       axios.get('https://outdoor-blog.herokuapp.com/blogs').then((response) => {
  //         setBlog(response.data)
  //       })
  //     })
  // }

  //================================================
  //========== Submit for update ===================


  //=================================================
  //============= Use Effect ========================
  useEffect(() => {
    axios.get('https://outdoor-blog.herokuapp.com/blogs').then((response) => {
      setBlog(response.data)
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
      <div>
        {/* Create a blog section */}
        <form onSubmit={newBlogFormSubmit}>
          Title:<input type="text" onChange={newSubjectChange}></input><br /><br />
          Description:<textarea type="text" rows="20" cols="70" onChange={newDetailsChange}></textarea><br /><br />
          <input type="submit"></input>
        </form>
        {/* Show blogs section */}

      </div>
    </>
  )








}

export default App;
