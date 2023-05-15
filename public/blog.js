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
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.getElementById('new-blog-btn').addEventListener('click', blogHandler);