const garageList = document.querySelector('.garage-container')

function getGarageItems() {
  fetch(`/api/junk`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.garage-container').innerHTML = response.reduce((acc, item) => `${acc} <p class="single-item">${item.name}</p>`,''))
}

getGarageItems()
