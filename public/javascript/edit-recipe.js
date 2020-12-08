const recipeId = document.querySelector('input[name="recipe-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="recipe-title"]').value;
  const body = document.querySelector('textarea[name="recipe-body"]').value;

  await fetch(`/api/recipe/${recipeId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      comment_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
  await fetch(`/api/recipe/${recipeId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-recipe-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
