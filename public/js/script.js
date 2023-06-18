let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingedientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', function () {
    let newIngredients = ingredientDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients);
})


function deleteSubmission(id) {
    fetch(`/recipe/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      // update the UI to reflect the deletion
    })
    .catch(error => {
      console.error(error);
    });
  }

  
// create the delete button
const deleteButton = document.getElementById('deleteBtn');
deleteButton.innerHTML ="ark"
deleteButton.addEventListener('click', () => {
  deleteSubmission();
});