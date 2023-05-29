/**
 * This function handles the deletion of a blog post by sending a DELETE request to the server and
 * redirecting the user to the dashboard if successful.
 * @param event - The event parameter is an object that represents the event that triggered the
 * function. In this case, it is the click event on the "delete" button.
 */
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
