async function newFormHandler(event) {
    event.preventDefault();
  
    const blog_title = document.querySelector('#blog-post-title').value;
    console.log(blog_title);
    const blog_content = document.querySelector('#blog-post-content').value;
    console.log(blog_content);
  
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
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
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);