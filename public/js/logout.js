/**
 * This is a JavaScript function that handles the logout process for a user by sending a POST request
 * to the server and redirecting the user to the homepage upon successful logout.
 * @param event - The `event` parameter is an object that represents the event that triggered the
 * function. In this case, it is the click event on the logout button. The `event` object contains
 * information about the event, such as the target element, the type of event, and any data associated
 * with the event
 */
const logoutHandler = async (event) => {
    event.preventDefault();
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                        document.location.replace('/homepage');
                    } else {
                        alert(response.statusText);
                    }

}

const elementLogout = document.querySelector('#logout')
if (elementLogout){
 elementLogout.addEventListener('click', logoutHandler)
}