/**
 * This function handles the submission of a comment form by sending a POST request to the server with
 * the comment content and associated blog ID, and then reloading the page if the request is
 * successful.
 * @param event - The event parameter is an object that represents the event that triggered the
 * function. In this case, it is the click event on the "commentBtn" button.
 */
const commentHandler = async (event) => {
    event.preventDefault();


const content = document.getElementById("textAreaExample").value
const blog_id = parseInt(location.pathname.substring(10))



const response = await fetch('/api/comments', {
    method: "POST",
    body: JSON.stringify({ content, blog_id}),   
    headers: { "Content-Type": "application/json" },
});
if (response.ok) {
    window.location.reload()
} else {
    alert(response.statusText);
}
}

document.getElementById("commentBtn").addEventListener("click",  commentHandler);