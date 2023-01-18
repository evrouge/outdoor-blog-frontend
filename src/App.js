import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add.js'
import Edit from './components/Edit.js'

//======= Bootstrap for React imports ===================
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        return b.id - a.id;
      })),
      (err) => console.log(err)
    )
  }

  //handle update function
  const handleUpdate = (editBlogger) => {
    axios.put('https://outdoor-blog.herokuapp.com/blogs/' + editBlogger.id, editBlogger)
      .then((response) => {
        getBlog();
      })
  }

  //post sort function


  //========================================
  //======== Use Effect ====================
  useEffect(() => {
    getBlog()
  }, [])

  //=========================================
  //=========================================
  return (
    <>
      <h1>Evin's Outdoor Blog</h1>
      <Add handleCreate={handleCreate} />
      <div className="blog">
        {
          blog.map((blogger) => {
            return (
              <>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={blogger.image} />
                  <Card.Body>
                    <Card.Title>{blogger.subject}</Card.Title>
                    <Card.Text>
                      <div className="blogger" key={blogger.id}>
                        <h4>{blogger.details}</h4>
                        <Edit handleUpdate={handleUpdate} blogger={blogger} /><br />
                        <Button variant="danger" onClick={handleDelete} value={blogger.id}>Remove Blog</Button>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default App;


///variant="top" src="holder.js/100px180"
