/**
 * This is a JavaScript function that handles user login by sending a POST request to a server with the
 * user's email and password, and redirects the user to the homepage if the login is successful.
 * @param event - The `event` parameter is an object that represents the event that triggered the
 * function. In this case, it is the form submission event that is being handled by the `loginHandler`
 * function. The `event` object contains information about the event, such as the target element, the
 * type of event
 */
const loginHandler = async (event) => {
    event.preventDefault();
    
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
    
        if (email && password) {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                document.location.replace('/homepage');
            } else {
                alert(response.statusText);
            }
        }
}

const element = document.querySelector('.login-form')
if (element) {
element.addEventListener('submit', loginHandler)}