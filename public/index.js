const garageList = document.querySelector('.garage-container')
const newJunk = document.querySelector('.junk-input')
const reason = document.querySelector('.reason-input')
const submitBtn = document.querySelector('.submit-btn')
const upBtn = document.querySelector('.up-btn')
const downBtn = document.querySelector('.down-btn')

getGarageItems()
getItemCount()
getSparklingCount()
getDustyCount()
getRancidCount()

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

function getItemCount() {
  fetch(`/api/junk/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.count').innerHTML = response)
}

function getSparklingCount() {
  fetch(`/api/junk/sparkling`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.sparkling').innerHTML = response)
}

function getDustyCount() {
  fetch(`/api/junk/dusty`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.dusty').innerHTML = response)
}

function getRancidCount() {
  fetch(`/api/junk/rancid`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.rancid').innerHTML = response)
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
  .then(response => getItemCount())
  .then(response => getSparklingCount())
  .then(response => getDustyCount())
  .then(response => getRancidCount())
  newJunk.value = ''
  reason.value = ''
  cleanlinessOption = cleanliness.options[cleanliness.selectedIndex = 0]
})

upBtn.addEventListener('click', ()=> {
  fetch(`/api/junk/up`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Application': 'application/json'
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.garage-container').innerHTML = response.reduce((acc, item) => `${acc} <p class="single-item">${item.name}</p>`,''))
})

downBtn.addEventListener('click', ()=> {
  fetch(`/api/junk/down`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Application': 'application/json'
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.garage-container').innerHTML = response.reduce((acc, item) => `${acc} <p class="single-item">${item.name}</p>`,''))
})
