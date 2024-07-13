document.querySelector('.login-form-container').addEventListener('submit', function(event) {
    event.preventDefault();

    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";

    let email = document.querySelector('.email-err');
    let password = document.querySelector('.password-err');
    let err_email = document.querySelector('.err-email');
    let err_name = document.querySelector('.err-name');
    let err_password = document.querySelector('.err-password');
    let err_password_confirmation = document.querySelector('.err-password_confirmation');



    email.innerHTML = "";
    password.innerHTML = "";
    err_email.innerHTML = "";
    err_name.innerHTML = "";
    err_password.innerHTML = "";
    err_password_confirmation.innerHTML = "";


    let form = document.querySelector('.login-form-container');
    let formData = new FormData(form);

    fetch('http://127.0.0.1:8000/api/login-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            if (data.errors.email) {
                email.innerHTML = data.errors.email;
            }
            if (data.errors.password) {
                password.innerHTML = data.errors.password;
            }
        } else if (data.message) {
            let alert = document.querySelector('.alert-box');
            alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${data.message}</div>`;
            form.reset();
        } else if (data.access_token) {
            sessionStorage.setItem('access_token', data.access_token);
            window.location.href = 'dashboard.html';
        }

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        let alert = document.querySelector('.alert-box');
        alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${error.message}</div>`;
    });
});

document.querySelector('.registration-form-container').addEventListener('submit', function(event) {
    event.preventDefault();


    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";


    let email = document.querySelector('.email-err');
    let password = document.querySelector('.password-err');
    let err_email = document.querySelector('.err-email');
    let err_name = document.querySelector('.err-name');
    let err_password = document.querySelector('.err-password');
    let err_password_confirmation = document.querySelector('.err-password_confirmation');



    email.innerHTML = "";
    password.innerHTML = "";
    err_email.innerHTML = "";
    err_name.innerHTML = "";
    err_password.innerHTML = "";
    err_password_confirmation.innerHTML = "";

    let form = document.querySelector('.registration-form-container');
    let formData = new FormData(form);

    fetch('http://127.0.0.1:8000/api/post-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log((data.errors))
        if(data.errors)
        {
            if(data.errors.email)
            {
                let err = document.querySelector('.err-email');
                err.innerHTML = data.errors.email;
            }


            if(data.errors.name)
            {
                let err = document.querySelector('.err-name');
                err.innerHTML = data.errors.name;
            }


            if(data.errors.password)
            {
                let err = document.querySelector('.err-password');
                err.innerHTML = data.errors.password;
            }


            if(data.errors.password_confirmation)
            {
                let err = document.querySelector('.err-password_confirmation');
                err.innerHTML = data.errors.password_confirmation;
            }
        }
        if(data.success)
        {
            let alert = document.querySelector('.alert-box');
            alert.innerHTML = `<div class="alert alert-success text-center mt-2">${data.success}</div>`;
            form.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        let alert = document.querySelector('.alert-box');
        alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${error}</div>`;
    });
});