let access_token = sessionStorage.getItem('access_token');
window.addEventListener("load", (event) => {
    fetch('http://127.0.0.1:8000/api/dashboard', {
        headers: {
            'Authorization': `Bearer ${access_token}`  // accessToken is your Santum token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.fail)
        {
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        window.location.href = 'index.html';
    });
});

function addPost()
{
    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";
    
    let container = document.querySelector('.post-container');
    container.innerHTML = '';

    let updateForm = document.querySelector('.updatePost-form');
    updateForm.innerHTML = '';

    let value = sessionStorage.getItem('access_token');
    let form = document.querySelector('.addPost-form');
    form.innerHTML = `
        <h3>Add Post</h3>
        <hr>
        <div class="mb-3 mt-3">
            <input type="hidden" name="access_token" value="${value}">
        </div>
        <div class="mb-3 mt-3">
            <label class="form-label">Title</label>    
            <input type="text" name="title" class="form-control mt-2" placeholder="Title">
        </div>
        <div class="mb-3  mt-3">
            <label class="form-label">Body</label>    
            <input type="text" name="body" class="form-control mt-2" placeholder="Body">
        </div>
        <input type="submit" class="btn btn-success m-1 submit" id="submit"> 
    `;

    let box = form.parentElement;
    box.classList.add('border', 'rounded', 'shadow', 'p-3', 'w-50');
}

function sendData(event)
{
    event.preventDefault();
    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";

    let form = document.querySelector('.addPost-form');

    let data = new FormData(form);

    let access_token = sessionStorage.getItem('access_token');


    fetch('http://127.0.0.1:8000/api/post/create', {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': `Bearer ${access_token}`  // accessToken is your Santum token
        }
    })
    .then(response => response.json())
    .then(data => {
        let alert = document.querySelector('.alert-box');
        alert.innerHTML = `<div class="alert alert-success text-center mt-2">${data.success}</div>`;
        form.innerHTML = "";
        let box = form.parentElement;
        box.classList.remove('border', 'rounded', 'shadow', 'p-3', 'w-50');
    })
    .catch(error => {
        alert('Invalid Entry');
        console.error('Error:', error);
    });
}

function showPost()
{
    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";


    let form = document.querySelector('.addPost-form');
    form.innerHTML = "";

    let updateForm = document.querySelector('.updatePost-form');
    updateForm.innerHTML = '';

    let box = form.parentElement;
    box.classList.remove('border', 'rounded', 'shadow', 'p-3', 'w-25');
    
    fetch('http://127.0.0.1:8000/api/post/get', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayPost(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function displayPost(posts)
{
    let container = document.querySelector('.post-container');
    container.innerHTML = '';

    posts.forEach(post => {
        let postElement = document.createElement('div');
        postElement.classList.add('post-item', 'row', 'mt-3', 'p-3', 'border', 'shadow', 'rounded-2');
        postElement.innerHTML = `
                <div class="col-4">${post.title}</div>
                <div class="col-4">${post.body}</div>
                <div class="col-2"> <button id="${post.id}" class="btn btn-success" onclick="update(this)">Update</button></div>
                <div class="col-2"> <button id="${post.id}" class="btn btn-danger" onclick="remove(this)">Delete</button></div>
        `;
        container.appendChild(postElement);
    });
}


function update(ele)
{
    console.log(ele);
    let body = ele.parentElement.previousElementSibling;
    let title = body.previousElementSibling;

    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";
    
    let container = document.querySelector('.post-container');
    container.innerHTML = '';

    let value = sessionStorage.getItem('access_token');
    let form = document.querySelector('.updatePost-form');
    form.setAttribute('id',`${ele.id}`)
    console.log(form);
    form.innerHTML = `
        <h3>Update Post</h3>
        <hr>
        <div class="mb-3 mt-3">
            <input type="hidden" name="access_token" value="${value}">
        </div>
        <div class="mb-3 mt-3">
            <label class="form-label">Title</label>    
            <input type="text" name="title" class="form-control mt-2" placeholder="Title" value="${title.textContent}">
        </div>
        <div class="mb-3  mt-3">
            <label class="form-label">Body</label>    
            <input type="text" name="body" class="form-control mt-2" placeholder="Body" value="${body.textContent}">
        </div>
        <input type="submit" class="btn btn-success m-1 submit" id="submit" value="Update"> 
    `;

    let box = form.parentElement;
    box.classList.add('border', 'rounded', 'shadow', 'p-3', 'w-50');
}









function updateData(event)
{
    event.preventDefault();
    let alert = document.querySelector('.alert-box');
    alert.innerHTML = "";

    let form = document.querySelector('.updatePost-form');

    let data = new FormData(form);

    let access_token = sessionStorage.getItem('access_token');


    fetch(`http://127.0.0.1:8000/api/post/update/${form.id}`, {
        method: 'post',
        body: data,
        headers: {
            'Authorization': `Bearer ${access_token}`  // accessToken is your Santum token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message)
        {
            let alert = document.querySelector('.alert-box');
            alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${data.message}</div>`;
        }
        else
        {
            let alert = document.querySelector('.alert-box');
            alert.innerHTML = `<div class="alert alert-success text-center mt-2">${data.success}</div>`;
            form.innerHTML = "";
            let box = form.parentElement;
            box.classList.remove('border', 'rounded', 'shadow', 'p-3', 'w-50');
        }
        
    })
    .catch(error => {
        let alert = document.querySelector('.alert-box');
        alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${error}</div>`;
        form.reset();
    });
}









function remove(ele)
{
    let alert = document.querySelector('.alert-box');

    let id = ele.id;
    fetch(`http://127.0.0.1:8000/api/post/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message)
        {
            alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${data.message}</div>`;
        }
        else
        {
            alert.innerHTML = `<div class="alert alert-success text-center mt-2">${data.success}</div>`;

            let container = document.querySelector('.post-container');
            container.innerHTML = '';
        }
    })
    .catch(error => {
        alert.innerHTML = `<div class="alert alert-danger text-center mt-2">${error}</div>`;
    });
}