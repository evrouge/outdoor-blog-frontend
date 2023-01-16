import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add.js'
import Edit from './components/Edit.js'
//=======================================================
const App = () => {
  //=========================================
  //============= Hooks =====================
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
      (response) => setBlog(response.data),
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

  //========================================
  //======== Use Effect ====================
  useEffect(() => {
    getBlog()
  }, [])

  //=========================================
  return (
    <>
      <h1>App</h1>
      <Add handleCreate={handleCreate} />
      <div className="blog">
        {
          blog.map((blogger) => {
            return (
              <div className="blogger" key={blogger.id}>
                <h4>Image: {blogger.image}</h4>
                <h4>Subject: {blogger.subject}</h4>
                <h4>Details: {blogger.details}</h4>
                <Edit handleUpdate={handleUpdate} blogger={blogger} />
                <button onClick={handleDelete} value={blogger.id}>X</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App;
