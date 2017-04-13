const garageList = document.querySelector('.garage-container')
const garageItemList = document.querySelector('.garage-container')
const newJunk = document.querySelector('.junk-input')
const reason = document.querySelector('.reason-input')
const submitBtn = document.querySelector('.submit-btn')
const upBtn = document.querySelector('.up-btn')
const downBtn = document.querySelector('.down-btn')
const garageDoor = document.querySelector('.garage-door')
let selectedItem

getGarageItems()
getItemCount()
getSparklingCount()
getDustyCount()
getRancidCount()
checkForButton()

function getGarageItems() {
  fetch(`/api/junk`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.garage-container').innerHTML = response.reduce((acc, item) =>
  `${acc} <p class="single-item">${item.name}</p>`,''))
}

function getSingleItems(selectedItem) {
  fetch(`/api/junk/${selectedItem}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Application': 'application/json'
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.individual-item-container').innerHTML = response.reduce((acc, item) =>
  `${acc} <div>
            <p class='item-description'>item: ${item.name}</p>
            <p class='item-description'>reason for keeping: ${item.reason}</p>
            <p class='item-description'>how clean is it: ${item.cleanliness}</p>
            <p class='question'>Did you clean it or make it worse?</p>
            <select class='update-clean-menu'>
              <option value='sparkling'>sparkling</option>
              <option value='dusty'>dusty</option>
              <option value='rancid'>rancid</option>
            </select>
            <input class="update-cleanliness-btn" type="submit" value="update cleanliness" />
          </div>`,''))
  .then(response => checkForButton())
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

function updateExistingCleanliness() {
  const updateCleanMenu = document.querySelector('.update-clean-menu')
  let newCleanlinessOption = updateCleanMenu.options[updateCleanMenu.selectedIndex].text
  fetch(`http://localhost:3000/api/junk/${selectedItem}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      cleanliness: newCleanlinessOption
    })
  })
  .then(response => response.json())
  .then(response => getSparklingCount())
  .then(response => getDustyCount())
  .then(response => getRancidCount())
  .then(response => getSingleItems(selectedItem))
}

function checkForButton() {
  if(document.querySelector('.update-cleanliness-btn')) {
    const updateCleanlinessBtn = document.querySelector('.update-cleanliness-btn')
    updateCleanlinessBtn.addEventListener('click', ()=> {
      updateExistingCleanliness()
    })
  }
}

garageDoor.addEventListener('click', ()=> {
  const wholeApp = document.querySelector('.whole-app')
  const text = document.querySelector('.click-to-enter')
  garageDoor.style.display = 'none'
  text.style.display = 'none'
  wholeApp.style.visibility = 'visible'
})


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

garageItemList.addEventListener('click', (e)=> {
  selectedItem = e.target.innerHTML
  getSingleItems(selectedItem)
})
