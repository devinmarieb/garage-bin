const garageList = document.querySelector('.garage-container')
const submitBtn = document.querySelector('.submit-btn')

getGarageItems()

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

submitBtn.addEventListener('click', ()=> {
  const newJunk = document.querySelector('.junk-input')
  const reason = document.querySelector('.reason-input')
  const cleanliness = document.querySelector('.cleanliness-dropdown')
  let cleanlinessOption = cleanliness.options[cleanliness.selectedIndex].text
  fetch(`http://localhost:3000/api/junk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application': 'application/json'
    },
    body: JSON.stringify({
      name: newJunk.value,
      reason: reason.value,
      cleanliness: cleanlinessOption
    })
  })
  .then(response =>  response.json())
  .then(response => getGarageItems())
})
