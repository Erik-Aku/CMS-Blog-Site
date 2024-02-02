async function editFormHandler(event) {
    event.preventDefault();
  
    const blog_title = document.querySelector('#blog-post-title').value;
    const blog_content = document.querySelector('#blog-content').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      console.log(blog_title, blog_content)

    const response = await fetch(`/api/blogpost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog_title,
            blog_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);