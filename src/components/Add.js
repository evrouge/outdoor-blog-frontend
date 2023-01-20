import React, { useState, useEffect } from 'react'

//=================================================
//==================================================
const Add = (props) => {
    let emptyBlogger = { image: '', subject: '', details: '' }

    //=========================================================
    //============== Hooks ====================================
    const [blogger, setBlogger] = useState(emptyBlogger);


    //=========================================================
    //================ Functions ==============================
    //handle change function
    const handleChange = (event) => {
        setBlogger({ ...blogger, [event.target.name]: event.target.value })
    }

    // handle submit function
    const handleSubmit = (event) => {
        //so form doesn't submit
        event.preventDefault()
        //passes state of blogger into the <Add/> on app.js
        props.handleCreate(blogger)
    }

    // refresh the page after submit button is clicked
    const refreshPage = () => {
        window.location.reload()
    }

    //=======================================================
    //=======================================================
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h5>Image URL:</h5>
                <input type="text" value={blogger.image} name="image" onChange={handleChange}></input><br /><br />
                <h5>Subject:</h5>
                <input type="text" value={blogger.subject} name="subject" onChange={handleChange}></input><br /><br />
                <h5>Details:</h5>
                <textarea type="text" rows="10" cols="60" value={blogger.details} name="details" onChange={handleChange}></textarea><br /><br />
                <input type="submit" value="Create Blog" onClick={refreshPage}></input>
            </form><hr />
        </>
    )

}

export default Add;
