
function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then (states => {

        for(const state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
     })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue =  event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value=>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then((res)=>{return res.json()})
    .then (cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false

     })
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// itens de coleta
//pegar todos os LI's

const itemsToCollet = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollet){
    item.addEventListener("click", handleSlectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selecteditems = []

function handleSlectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe com java script
    itemLi.classList.toggle("selected")


    const itemId = event.target.dataset.id

    //console.log('ITEM ID: ', itemId)

    // verificar se existem items selecionados, se sim
    //pegar os itnms selecinados

    const alreadySlected = selecteditems.findIndex(function(item){
        const itemFound = item == itemId //isso será verdadeiro ou falso
        return itemFound
    })

    //se já estiver slecioando, tirar da selecao

    if( alreadySlected >= 0){
        const filteredItems = selecteditems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selecteditems = filteredItems
            // se não estiver selecionaodo, adicionar a selecao
    }else {
        selecteditems.push(itemId)
    }

        // atualizar o campo escondido com os itens selecionados - varial collectedItems acima
        collectedItems.value = selecteditems


}