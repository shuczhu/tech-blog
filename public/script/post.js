
const submit = document.getElementById('comment-submit');

const submitComment = async (event) => {
    event.preventDefault();

    const title = document.getElementById('comment-title-input').value.trim();
    const bodyContent = document.getElementById('comment-input').value.trim();
    const postId = document.getElementById('post-card-title').getAttribute('data-id');

    if (title && bodyContent && postId) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({title: title, bodyContent: bodyContent, post_id: postId}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            alert("Comment Posted!");
            location.reload();
        }
    }
}

submit.addEventListener('click', submitComment);
