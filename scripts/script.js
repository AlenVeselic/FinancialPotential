/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-16 12:15:42
 * @version 1.0.0
 */

function clearTranDivs(){
    transactionDivs = document.getElementsByClassName('transaction')
    while(transactionDivs.length != 0){
        transactionDivs[0].remove()
    }
}
    

function genTrans(){

    if(document.getElementsByClassName('transaction').length != 0){
    clearTranDivs()
}
    

    date = document.getElementById("date").innerText
    
    rawData = localStorage.getItem(date)

    if(rawData == null){
        return;
    }
    
    data = JSON.parse(rawData)
    
    
    addButton = document.getElementById('addTran')

    for(i=0; i < data['transactions'].length; i++){
        curItem = []
        curItem.push(data['transactions'][i]['category'])
        curItem.push(data['transactions'][i]['description'])
        curItem.push(data['transactions'][i]['amount'])
        generateTransactionDiv(addButton, curItem)
    }




}



function bkgColor(){
    return Math.floor(Math.random() * 16777215).toString(16)
}

daysBack = 0

backButton = document.getElementById('dateBack')
backButton.onclick = function(){
    dateBack()
}

forwardButton = document.getElementById('dateForward')
forwardButton.onclick = function(){
    dateForward()
}

function compareDateWithPresent(date){
    present = new Date()
    flags = 0

    if(present.getDate() == date.getDate()) flags += 1;
    if(present.getMonth() == date.getMonth()) flags += 1;
    if(present.getFullYear() == date.getFullYear()) flags += 1;

    if(flags == 3) return true;
    return false;
}

function setDateHeader(){
curDate = new Date()

curDate.setDate(curDate.getDate() + daysBack)

currentContents = document.getElementById('content')

if (compareDateWithPresent(curDate)){
    document.getElementById('dateForward').disabled = true
}else{
    document.getElementById('dateForward').disabled = false
}

document.getElementById('date').innerHTML = curDate.getDate() + ". " + (curDate.getMonth() + 1) + ". " + curDate.getFullYear()
genTrans()
}

setDateHeader()


addButton = document.createElement('button')
addButton.innerHTML = "+"
addButton.id = "addTran"
addButton.onclick = function(){

    openInput(this);

}

function dateBack(){
    daysBack -=  1
    setDateHeader()

}

function dateForward(){
    daysBack += 1
    setDateHeader()
}


currentContents.appendChild(addButton);

function openInput(buttEl){

    inputDiv = document.createElement('div')
    inputDiv.classList.add('promptWindow')
    

    cancelButton = document.createElement('button')
    cancelButton.innerHTML = "Back"
    cancelButton.onclick = function(){
        inputDiv.remove();
    }

    transactionForm = document.createElement('form')
    transactionForm.name = "inputForm"

    categorySelection = document.createElement('select')
    categorySelection.name = "categories"

    // temporary hardcoded category options

    categoryList = localStorage.getItem('categories').split(",")

    if(categoryList.length != 0){
        for(category of categoryList){
            newOption = document.createElement('option')
            newOption.value = category
            newOption.innerText = category
            categorySelection.appendChild(newOption)
        }
    }


    selectGas = document.createElement('option')
    selectGas.value = "gas"
    selectGas.innerText = "Gas"

    selectGroceries = document.createElement('option')
    selectGroceries.value = "grocery"
    selectGroceries.innerText = "Groceries"

    selectBills = document.createElement('option')
    selectBills.value = "bill"
    selectBills.innerText = "Bills"


    categorySelection.appendChild(selectGas)
    categorySelection.appendChild(selectGroceries)
    categorySelection.appendChild(selectBills)

    transactionForm.appendChild(categorySelection)

    descEntry = document.createElement('input')
    descEntry.name = "description"
    descEntry.type = "text"

    transactionForm.appendChild(descEntry)

    amountEntry = document.createElement('input')
    amountEntry.name = "amount"
    amountEntry.type = "number"
    amountEntry.step = "0.01"
    
    transactionForm.appendChild(amountEntry)

    /*
    cat = document.forms["inputForm"]["categories"].value
    desc = document.forms["inputForm"]["description"].value
    amount = document.forms["inputForm"]["amount"].value  
    */

    categoryText = document.createElement("input")
    categoryText.type = "text"
    categoryText.name = "newCat"

    transactionForm.appendChild(categoryText)

    addCatButton = document.createElement('button')
        addCatButton.innerText = "Add Category"
        addCatButton.onclick = function(){
            newCategory = document.forms["inputForm"]["newCat"].value
            addCategoryToStorage(newCategory)
        }
    




    inputDiv.appendChild(transactionForm)

    //inputDiv.innerHTML += "Current values: " + cat + " " + desc + " " + amount.toString()

    applyButton = document.createElement('button')
    applyButton.innerHTML = "Add"
    applyButton.onclick = function(){
        cat = document.forms["inputForm"]["categories"].value
        desc = document.forms["inputForm"]["description"].value
        amount = document.forms["inputForm"]["amount"].value  

        data = [cat, desc, amount]
        createTransaction(buttEl ,data)
        inputDiv.remove()
    }

    


inputDiv.appendChild(cancelButton)

inputDiv.appendChild(applyButton)

inputDiv.appendChild(addCatButton)


document.body.appendChild(inputDiv)

}

function createTransaction(buttEl, data){

    
    generateTransactionDiv(buttEl, data)

    addTransactionToStorage(transactionDate, data)

    

}

function getElIndex(nList, el){

    index = 0

for(element of nList){

    if(element == el){
            return index
        }
    index++
    }



}



function generateTransactionDiv(buttEl, data){

    newTransaction = document.createElement('div')
    newTransaction.classList.add('transaction')
    newTransaction.style.backgroundColor = "#" + bkgColor()

    categoryNode = document.createTextNode(data[0])
    descNode = document.createTextNode(data[1])
    amountNode = document.createTextNode(data[2].toString() + "€")

    categoryP = document.createElement('p')
    categoryP.appendChild(categoryNode)
    categoryP.classList.add('cat')

    descriptionP = document.createElement('p')
    descriptionP.appendChild(descNode)
    descriptionP.classList.add('desc')

    amountP = document.createElement('p')
    amountP.appendChild(amountNode)
    amountP.classList.add('amount')

    deleteButton = document.createElement('button')
    deleteButton.innerText = "X"
    deleteButton.onclick = function (){
        transactionArray = document.getElementsByClassName('transaction')
        itemIndex = getElIndex(transactionArray, this.parentElement)
        itemDate = document.getElementById('date').innerText

        removeTransactionFromStorage(itemDate, itemIndex)

        this.parentElement.remove()


    }

    
    newTransaction.appendChild(categoryP)
    newTransaction.appendChild(descriptionP)
    newTransaction.appendChild(amountP)
    newTransaction.appendChild(deleteButton)



    transactionDate = document.getElementById('date').innerText

    currentContents.insertBefore(newTransaction, buttEl)
}