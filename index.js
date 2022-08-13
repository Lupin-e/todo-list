const newListBtn = document.querySelector('.new-list-btn')
const creationForm = document.querySelector('.creation-form')
const creationListBtn = document.querySelector('.creation-list-btn')
const declineListBtn = document.querySelector('.decline-btn')
const inputName = document.querySelector('.listname');
const liCreateForm = document.querySelector('.li-create-form')
const liCreateBtn = document.querySelector('.li-create-btn')
const liContent = document.querySelector('.li-content')
const saveListBtn = document.querySelector('.save-list-btn')
const currentDiv = document.querySelector('.div');
const currentUl = document.querySelector('.list');
let h2ListName = document.createElement('h2')
let liArray = []
const deleteList = document.querySelector('.delete-list')
const editList = document.querySelector('.edit-list-btn')
let liDelArray = []
let liEditArray = []

//--------------------functions----------------
function removeClass(element, removeClass) {
  element.classList.remove(removeClass)
}

function addClass(element, addClass) {
  element.classList.add(addClass)
}

function deleteAll() {
  h2ListName.remove()
  h2ListName.textContent = null
  liArray.forEach((li) => li.remove())
  liArray = []
  liDelArray.forEach((item) => item.remove())
  liEditArray.forEach((item) => item.remove())
  liDelArray = []
  liEditArray = []
  inputName.value = inputName.ariaPlaceholder
  liContent.value = inputName.ariaPlaceholder
  addClass(editList, 'hide')
  addClass(liCreateForm, 'hide')
  addClass(currentDiv, 'hide')
  if(document.querySelector('.li-save-btn')) {
    document.querySelector('.li-save-btn').remove()
    document.querySelector('.liInput').remove()
  }
}


function getNumber (paramIndex) {
  liArray.forEach((item, index) => {
    if (paramIndex < 9 && index === 8) {
      item.textContent = index + 1 + item.textContent.slice(2, item.textContent.length);
    }else {
      item.textContent = index + 1 + item.textContent.slice((index + 1 ).toString().length, item.textContent.length);
    }
  })
}


let createButtons = function (li) {
  
  const delLiBtn = document.createElement('button')
  delLiBtn.textContent = 'DEL'
  addClass(delLiBtn, 'li-del-btn')
  li.after(delLiBtn);
  liDelArray.push(delLiBtn)
  delLiBtn.onclick = () => {
    const neededLiIndex = liArray.findIndex(el => el === li);
    li.remove()
    liArray.splice(neededLiIndex, 1)
    getNumber (neededLiIndex)
    delLiBtn.remove()
    editLiBtn.remove()
    
    if (!document.querySelector('li')) {
      deleteAll()
    }

    if(liArray.length <= 9) {
      removeClass(liContent, 'hide')
      removeClass(liCreateBtn, 'hide')
    }
  }

  const editLiBtn = document.createElement('button')
  editLiBtn.textContent = 'EDIT'
  addClass(editLiBtn, 'li-edit-btn')
  li.after(editLiBtn);
  liEditArray.push(editLiBtn)
  editLiBtn.onclick = () => {
    addClass(li, 'hide')
    editLiBtn.insertAdjacentHTML('beforebegin', `<input class="liInput" maxlength="20" </input>`)
    let liInput = document.querySelector('.liInput')
    liInput.value = li.textContent
    liInput.insertAdjacentHTML('afterend', `<button class="li-save-btn">SAVE</button>`)
    let liSaveBtn = document.querySelector('.li-save-btn')
    addClass(editLiBtn, 'hide')
    liSaveBtn.onclick = () => {
      if (liInput.value) {
        removeClass(li, 'hide')
        li.textContent = liInput.value
        liInput.remove()
        removeClass(editLiBtn, 'hide')
        liSaveBtn.remove()
      } else {
        alert("Введіть значення");
      }
    }
  }
}
//------------------program flow--------------------
newListBtn.addEventListener('click', function () {
  if(!document.querySelector('h2')) {
    creationForm.classList.toggle('hide')
    inputName.focus()
  }else {
    alert('You can create only one todolist')
  }
  
})

declineListBtn.addEventListener('click', function () {
  addClass(creationForm, 'hide')
})

creationListBtn.addEventListener('click', function () {
  if (inputName.value) {
    addClass(creationForm, 'hide')
    removeClass(liCreateForm, 'hide')
    removeClass(editList, 'hide')
    h2ListName.textContent = `${inputName.value} :`
    currentDiv.before(h2ListName)
    removeClass(currentDiv, 'hide')
    liContent.focus()
  } else {
    alert("Введіть значення");
  }
})

liCreateBtn.addEventListener('click', function () {
  liContent.focus()
  if (liContent.value) {
    currentUl.insertAdjacentHTML('beforeend', `<li>${liArray.length + 1}. ${liContent.value}</li>`)
    const lastLi = document.querySelector('li:last-child')
    liArray.push(lastLi)
    liContent.value = "";
    createButtons(lastLi)
    if(liArray.length > 9) {
      addClass(liContent, 'hide')
      addClass(liCreateBtn, 'hide')
      setTimeout(()=> {alert("Максимум 10 завдань")}, 500) 
    }
  } else {
    alert("Введіть значення");
  }
})

saveListBtn.addEventListener('click', function () {
  addClass(liCreateForm, 'hide')
  liDelArray.forEach(item => addClass(item, 'hide'))
  liEditArray.forEach(item => addClass(item, 'hide'))
})

editList.addEventListener('click', function () {
  liCreateForm.classList.toggle('hide')
  liDelArray.forEach(item => {
    item.classList.toggle('hide')
  })
  liEditArray.forEach(item => {
    item.classList.toggle('hide')
  })
  liContent.value = ''
  liContent.focus()
})

deleteList.addEventListener('click', function () {
  let confirmation = confirm('Бажаєте видатити список?')
  if (confirmation) {
    deleteAll()
  }
})

