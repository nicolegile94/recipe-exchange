async function madeitClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
      ];
    
      const response = await fetch('/api/recipes/madeit', {
        method: 'PUT',
        body: JSON.stringify({
          recipe_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }    }
  
  document.querySelector('.madeit-btn').addEventListener('click', madeitClickHandler);