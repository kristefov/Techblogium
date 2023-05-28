const updateHandler = async (event) => {
    event.preventDefault();


    const currentTitle = document.getElementById('titleUpdate');
    const currentBody = document.getElementById('blogUpdate');
    const titleUpdate = document.createElement("input");
    const bodyUpdate = document.createElement("textarea");
    titleUpdate.value = currentTitle.textContent
    bodyUpdate.value = currentBody.textContent
    tit
    currentTitle.replaceWith(titleUpdate)
    currentBody.replaceWith(bodyUpdate)
 
}

document.getElementById('updateBtn').addEventListener('click', updateHandler)



