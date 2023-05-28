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

// const editBlogHandler = async (event) => {
//    const openBlog = doc 
// }
// const blog_id = document.querySelector('.blogid').dataset.id;