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

    //=======================================================
    //=======================================================
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image">Image: </label>
                <input type="text" value={blogger.image} name="image" onChange={handleChange}></input><br /><br />
                <label htmlFor="subject">Subject: </label>
                <input type="text" value={blogger.subject} name="subject" onChange={handleChange}></input><br /><br />
                <label htmlFor="details">Details: </label>
                <textarea type="text" rows="20" cols="70" value={blogger.details} name="details" onChange={handleChange}></textarea><br /><br />
                <input type="submit"></input>
            </form>
        </>
    )

}

export default Add;
