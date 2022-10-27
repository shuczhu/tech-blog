const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#log-email").value.trim();
    const password = document.querySelector("#log-password").value.trim();

    if (email && password) {
        
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            response.json().then((data) => {
                alert(data.message);
            })
 
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#sign-name").value.trim();
    const email = document.querySelector("#sign-email").value.trim();
    const password = document.querySelector("#sign-password").value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify({name, email, password}),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener("submit", loginFormHandler);

const signBtn = document.getElementById('sign-button');
signBtn.addEventListener('click', signupFormHandler);