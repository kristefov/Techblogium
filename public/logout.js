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