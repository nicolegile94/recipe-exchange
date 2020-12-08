async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="recipe-title"]').value;
    const recipe_url = document.querySelector('input[name="recipe-url"]').value;
  
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        recipe_url
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
  
  document.querySelector('.new-recipe-form').addEventListener('submit', newFormHandler);