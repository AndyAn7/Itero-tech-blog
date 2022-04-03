const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.getElementsByName('editContent')[0].value;
    const id = windowlocation.toString().split('/')[
        window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });

    if (response.ok) {
        document.location.replace = ('/dashboard');
    } else {
        alert('Something went wrong');
    }};

document
.querySelector('.edit-post-form')
.addEventListener('submit', editFormHandler);