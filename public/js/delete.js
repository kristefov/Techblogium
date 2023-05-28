const deleteHandler = async (event) => {
  event.preventDefault();

  const id = parseInt(location.pathname.substring(10));

  const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document.getElementById("deleteBtn").addEventListener("click", deleteHandler)
