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

document.getElementById('register').addEventListener('click', signupHandler);