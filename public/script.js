function onOff(div){
  document
    .querySelector(div)
    .classList
    .toggle('hide')

  document
    .querySelector("body")
    .classList
    .toggle("hideScroll")
  
  document
    .querySelector(div)
    .classList
    .toggle("addScroll")
}

function checkFields(event){

  const valuesToCheck= [
    "title",
    "image",
    "category",
    "description",
    "link"
  ]

  const isEmpty = valuesToCheck.find(function(value){
    
    const checkIfIsString = typeof event.target[value].value === "string"
    const checkIsEmpty = ! event.target[value].value.trim()

    if (checkIfIsString && checkIsEmpty){
      return true

    }

  })
  if (isEmpty) {
    event.preventDefault()
    alert("Por favor, preencha todos os campos.")
  }

}
//----------------------------------------------------//

const showImg = document.querySelector("#show")
const inputImg = document.querySelector(".input-wrapper input[name=image]")
console.log(inputImg.value)
function imgSelected(e){
  showImg.setAttribute('src', e.target.currentSrc)
  inputImg.setAttribute('value', e.target.currentSrc)
  onOff('#modal-form') 
}

const imgs = document.querySelectorAll(".img-select li")
for (const img of imgs){
  img.addEventListener("click",imgSelected)
}