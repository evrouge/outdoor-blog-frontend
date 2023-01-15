import { useState } from 'react';
import '../App.css';
//==================
import Button from 'react-bootstrap/Button';

//========================================
const Blog = (props) => {
    let emptyBlog = { subject: '', details: '' }
    //====================================
    //======== Edit hook =================
    const [edits, setEdits] = useState(false);
    const [blogs, setBlogs] = useState(emptyBlog)
    //====================================
    //======== Edit function =============
    const handleEdit = (event) => {
        // setEdits(!edits);
        setEdits({ ...edits, [event.target.subject]: event.target.value })
    }

    const updateSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(edits)
    }



    return (
        <>
            <div>
                <form>
                    Title of Blog: <p>{props.blog.subject}</p><br />
                    Description: <p>{props.blog.details}</p>
                </form>

                {/* bootstap / react buttons */}
                {/* <Button variant="outline-primary" onClick={(event) => { props.handleDelete(props.blog) }}>Delete</Button> */}
                <Button variant="outline-primary" onClick={handleEdit}>Edit</Button>

                {edits ?
                    <>
                        {/* Edit blog form / shows when edit button is clicked */}
                        <h2>Edit Blog</h2>
                        {/* handleEdit() allows the update book button to disappear after editing book */}
                        <form onSubmit={(event) => { event.preventDefault(); props.updateSubmit(props.blog); handleEdit(); }}>
                            Title: <input type="text" defaultValue={props.blog.subject} onChange={props.handleUpdateSubject} /><br />
                            Description: <input type="text" defaultValue={props.blog.details} onChange={props.handleUpdateDetails} /><br />
                            <Button variant="primary" size="sm" type="submit" value="Update Book">Update Post</Button>
                            <Button variant="outline-primary" onClick={(event) => { props.handleDelete(props.blog) }}>Delete</Button>

                        </form>
                    </>
                    // If not being updated, null will allow the edit to be hidden
                    : null}
            </div>
        </>
    )

}

export default Blog;
