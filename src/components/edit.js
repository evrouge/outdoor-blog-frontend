import React, { useState } from 'react';

//======= Bootstrap for React imports =======
import Button from 'react-bootstrap/Button';

//===========================================
//===========================================
const Edit = (props) => {

    //======================================================
    //================ Hooks ==============================
    //this gives it an id
    const [blogger, setBlogger] = useState({ ...props.blogger })
    // edit hook
    const [showEdit, setShowEdit] = useState(true);

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
        props.handleUpdate(blogger);
        setShowEdit(false);
    }

    //=======================================================
    //=======================================================
    return (
        <>
            {showEdit ?
                <details>
                    <summary>Edit</summary>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="image">Image: </label><br />
                        <input type="url" name="image" value={blogger.image} onChange={handleChange}></input><br /><br />
                        <label htmlFor="subject">Subject: </label>
                        <input type="subject" name="subject" value={blogger.subject} onChange={handleChange}></input><br /><br />
                        <label htmlFor="details">Details: </label>
                        <textarea type="text" name="details" rows="10" cols="25" value={blogger.details} onChange={handleChange}></textarea><br /><br />
                        <Button variant="warning" type="submit" onClick={() => setShowEdit(true)}>Update</Button>
                    </form>
                </details>
                : <> </>}
        </>
    )
}

export default Edit;
