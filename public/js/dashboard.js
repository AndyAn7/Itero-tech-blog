const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            document.location.replace = ('/dashboard');
        } else {
            alert('Something went wrong');
        }}};

document
.querySelector('.new-post-form')
.addEventListener('submit', newFormHandler);