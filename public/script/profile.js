
const submit = document.getElementById('post-submit');
const deleteBtn = document.querySelector('.post-container-large');

const submitPost = async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title-input').value.trim();
    const bodyContent = document.getElementById('post-input').value.trim();
    
    if (title && bodyContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, bodyContent}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            alert("Post Created!");
            location.reload();
        }
    }

}

const deletePost = async (event) => {
    // event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert('Failed to delete project');
          }
        }

}

submit.addEventListener('click', submitPost)
deleteBtn.addEventListener('click', deletePost)