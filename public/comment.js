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