const commentHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector("#comment-content").value;
    const response = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector("#comment").addEventListener("click", commentHandler);