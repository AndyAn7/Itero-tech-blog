const delButtonHandler = async (event) => {
    if (event.target.hasAtrribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace = ('/dashboard');
        } else {
            alert('Something went wrong');
        }}};

document
.querySelector('.delete-button')
.addEventListener('click', delButtonHandler);