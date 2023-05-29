/**
 * This function handles the submission of a user registration form and sends the form data to the
 * server using a POST request.
 * @param event - The event parameter is an object that represents the event that triggered the
 * function. In this case, it is the click event on the "register" button.
 */
const signupHandler = async (event) => {
    event.preventDefault();


    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    const response = await fetch('/api/user', {
        method: "POST",
        body: JSON.stringify({ email, first_name, last_name, password}),   
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}


const elementRegister = document.getElementById('register')
if(elementRegister){elementRegister.addEventListener('click', signupHandler);}