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

document.querySelector('#logout').addEventListener('click', logoutHandler)