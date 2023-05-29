/**
 * The function handles the submission of a new blog post by sending a POST request to the server with
 * the title and content of the post.
 * @param event - The event parameter is an object that represents an event that has occurred, such as
 * a button click or form submission. It contains information about the event, such as the target
 * element and any data associated with the event. In this case, the event is a form submission
 * triggered by clicking a button.
 */
const blogHandler = async (event) => {
    event.preventDefault();


    const title = document.querySelector('#new-blog-title').value;
    const content = document.querySelector('#new-blog-content').value;
    
    const response = await fetch('/api/blogs', {
        method: "POST",
        body: JSON.stringify({ title, content }),   
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        window.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

const elementBlog = document.getElementById('new-blog-btn')
if(elementBlog){elementBlog.addEventListener('click', blogHandler)}
