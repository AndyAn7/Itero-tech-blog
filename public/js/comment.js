const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_comment = document.querySelector('textarea[name="post-comment"]').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (post_comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_comment,
                post_id
            })});

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Something went wrong');
            }}};

document
.querySelector('.comment-form')
.addEventListener('submit', commentFormHandler);