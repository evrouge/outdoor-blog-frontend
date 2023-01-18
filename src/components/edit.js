import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

//===========================================
//===========================================
const Edit = (props) => {

    //======================================================
    //================ Hooks ==============================
    //this gives it an id
    const [blogger, setBlogger] = useState({ ...props.blogger })

    //===================================================
    //============= Functions ===========================
    //handle change function
    const handleChange = (event) => {
        setBlogger({ ...blogger, [event.target.name]: event.target.value })
    }

    //handle submit function
    const handleSubmit = (event) => {
        event.preventDefault();
        //pass in the state variable
        props.handleUpdate(blogger)
    }

    //=======================================================
    //=======================================================
    return (
        <>
            <details>
                <summary>Edit Blog</summary>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="image">Image: </label>
                    <input type="url" name="image" value={blogger.image} onChange={handleChange}></input><br /><br />
                    <label htmlFor="subject">Subject: </label>
                    <input type="subject" name="subject" value={blogger.subject} onChange={handleChange}></input><br /><br />
                    <label htmlFor="details">Details: </label>
                    <textarea type="text" name="details" rows="20" cols="25" value={blogger.details} onChange={handleChange}></textarea><br /><br />
                    <Button variant="warning" type="submit">Update</Button>
                </form>
            </details>
        </>
    )

}

export default Edit;
