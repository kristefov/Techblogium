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



