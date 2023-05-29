/**
 * This function updates a blog post by replacing the current title and body with input fields, and
 * then saving the updated content when the save button is clicked.
 * @param event - The event parameter is an object that represents the event that triggered the
 * function. In this case, it is the click event on the "Update" button.
 */
const updateHandler = async (event) => {
    event.preventDefault();


    const currentTitle = document.getElementById('titleUpdate');
    const currentBody = document.getElementById('blogUpdate');
    const titleUpdate = document.createElement("input");
    const contentUpdate = document.createElement("textarea");
    const saveButton = document.createElement("button")
    const updateButton = document.getElementById('updateBtn')
    
    titleUpdate.value = currentTitle.textContent
    contentUpdate.value = currentBody.textContent
    titleUpdate.setAttribute("id", "titleUpdate")
    contentUpdate.setAttribute("id", "contentUpdate")

    currentTitle.replaceWith(titleUpdate)
    currentBody.replaceWith(contentUpdate)
    updateButton.replaceWith(saveButton)
    saveButton.id = "save"
    saveButton.setAttribute("class", "text-light btn btn-primary btn-sm")
    saveButton.textContent = "Save"
    const saveHandler = async (event) => {
        event.preventDefault();

        const title = document.getElementById('titleUpdate').value;
        const content = document.getElementById('contentUpdate').value;
        const id = parseInt(location.pathname.substring(10))
        const response = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),   
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            window.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }

    document.getElementById('save').addEventListener('click', saveHandler)
 
}

document.getElementById('updateBtn').addEventListener('click', updateHandler)



