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
    
// displays all transactions for the current day
function genTrans(){

    if(document.getElementsByClassName('transaction').length != 0){
    clearTranDivs()
}
    

    var date = getHeaderDate()
    
    var rawData = localStorage.getItem(date)

    if(rawData == null){
        return;
    }
    
    var data = JSON.parse(rawData)
    
    
    var addButton = document.getElementById('addTran')

    for(var i=0; i < data['transactions'].length; i++){
        let curItem = []
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

//get date from header
function getHeaderDate(){
    return document.getElementById("date").innerText
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

if(JSON.parse(localStorage.getItem(getHeaderDate()))['transactions'].length > 0){
    dayStats()
}


//creates the add transaction button

addButton = document.createElement('button')
imageAdd = document.createElement('img')
imageAdd.src = "assets/buttAdd2.png"
addButton.appendChild(imageAdd)
//addButton.innerHTML = "+"
addButton.id = "addTran"
addButton.onclick = function(){

    if(document.getElementsByClassName('promptWindow').length == 0){
    openInput(this);
    }else{
        document.getElementsByClassName('promptWindow')[0].remove()
    }

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

// generates the prompt to add a transaction
function openInput(buttEl){

    inputDiv = document.createElement('div')
    inputDiv.classList.add('promptWindow')

    basicInput = document.createElement('div')
    

    cancelButton = document.createElement('button')
    cancelButton.innerHTML = "Back"
    cancelButton.onclick = function(){
        dayStats()
        inputDiv.remove()
    }

    windowP = document.createElement('h3')
    windowText = document.createTextNode('New transaction')
    windowP.appendChild(windowText)

    basicInput.appendChild(windowP)

    transactionForm = document.createElement('form')
    transactionForm.name = "inputForm"

    categorySelection = document.createElement('select')
    categorySelection.name = "categories"

    elPCategory = document.createElement('p')
    elTextCategory = document.createTextNode('Category: ')
    elPCategory.appendChild(elTextCategory)

    generateCategories(categorySelection)

    transactionForm.appendChild(elPCategory)
    transactionForm.appendChild(categorySelection)

    descEntry = document.createElement('input')
    descEntry.name = "description"
    descEntry.type = "text"

    elPDesc = document.createElement('p')
    elTextDesc = document.createTextNode('Short description: (optional)')
    elPDesc.appendChild(elTextDesc)

    transactionForm.appendChild(elPDesc)
    transactionForm.appendChild(descEntry)

    amountEntry = document.createElement('input')
    amountEntry.name = "amount"
    amountEntry.type = "number"
    amountEntry.step = "0.01"

    elPAmount = document.createElement('p')
    elTextAmount = document.createTextNode('Amount: ')
    elPAmount.appendChild(elTextAmount)
    
    transactionForm.appendChild(elPAmount)
    transactionForm.appendChild(amountEntry)

    optionsButton = document.createElement('button')
    optionsButton.innerText = "..."
    optionsButton.onclick = function (){
        document.getElementsByClassName('inputOptions')[0].classList.toggle('show')
    }

    optionsDiv = document.createElement('div')
    optionsDiv.classList.add('inputOptions')

    labelCatSection = document.createElement('h4')
    labelTextCatSection = document.createTextNode('Categories')
    labelCatSection.appendChild(labelTextCatSection)

    lineCatSection = document.createElement('hr')

    optionsDiv.appendChild(labelCatSection)
    optionsDiv.appendChild(lineCatSection)

    categoryName = document.createElement("input")
    categoryName.type = "text"
    categoryName.name = "catName"

    labelPCatMod = document.createElement('p')
    labelTextCatMod = document.createTextNode('Enter category to add/remove:')
    labelPCatMod.appendChild(labelTextCatMod)

    categoryColor = document.createElement('input')
    categoryColor.type = "color"
    categoryColor.name = "catColor"

    labelCatColor = document.createElement('p')
    labelTextCatColor = document.createTextNode('Choose a color for this category:')
    labelCatColor.appendChild(labelTextCatColor)

    optionsDiv.appendChild(labelPCatMod)
    optionsDiv.appendChild(categoryName)
    optionsDiv.appendChild(labelCatColor)
    optionsDiv.appendChild(categoryColor)

    removeCatButton = document.createElement('button')
    removeCatButton.innerText = "Remove Category"
    removeCatButton.onclick = function(){
        category = document.getElementsByName("catName")[0].value
        removeCategoryFromStorage(category)
        generateCategories(document.getElementsByName('categories')[0])

    }

    // initializes the category submit button

    addCatButton = document.createElement('button')
    addCatButton.innerText = "Add Category"
    addCatButton.onclick = function(){
            newCategory = document.getElementsByName("catName")[0].value
            catColor = document.getElementsByName('catColor')[0].value
            addCategoryToStorage(newCategory, catColor)
            generateCategories(document.getElementsByName('categories')[0])
            
        }
    optionsDiv.appendChild(addCatButton)
    optionsDiv.appendChild(removeCatButton)

    basicInput.appendChild(transactionForm)

    //inputDiv.innerHTML += "Current values: " + cat + " " + desc + " " + amount.toString()

    applyButton = document.createElement('button')
    applyButton.innerHTML = "Add"
    applyButton.onclick = function(){
        cat = document.forms["inputForm"]["categories"].value
        desc = document.forms["inputForm"]["description"].value
        amount = document.forms["inputForm"]["amount"].value  

        data = [cat, desc, amount]
        createTransaction(buttEl ,data)
        dayStats()
        inputDiv.remove()
    }

    


basicInput.appendChild(cancelButton)

basicInput.appendChild(applyButton)

basicInput.appendChild(optionsButton)

inputDiv.appendChild(basicInput)

inputDiv.appendChild(optionsDiv)


document.body.appendChild(inputDiv)

}

function generateCategories(selectEl){

    optionElements = selectEl.getElementsByTagName('option')
        while(optionElements.length != 0){
            selectEl.getElementsByTagName('option')[0].remove()
        }
    

    categoryList = JSON.parse(localStorage.getItem('categories'))



    if(categoryList.length != 0){
        for(category of Object.keys(categoryList)){
            newOption = document.createElement('option')
            newOption.value = category
            newOption.innerText = category
            selectEl.appendChild(newOption)
        }
    }

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


// generates a single transaction div
function generateTransactionDiv(buttEl, data){

    newTransaction = document.createElement('div')
    newTransaction.classList.add('transaction')

    allCats = JSON.parse(localStorage.getItem('categories'))
    backgroundColour = allCats[data[0]]

    if(backgroundColour != null){
        newTransaction.style.color = backgroundColour.toString()
        newTransaction.style.borderBottomColor = backgroundColour.toString()
    }else{
        newTransaction.style.color = "#" + bkgColor()
        newTransaction.style.borderBottomColor = "#" + bkgColor()
    }

    categoryNode = document.createTextNode(data[0])
    descNode = document.createTextNode(data[1])
    amountNode = document.createTextNode(data[2].toString() + "€")

    categoryP = document.createElement('p')
    categoryP.appendChild(categoryNode)
    categoryP.classList.add('cat')

    descriptionP = document.createElement('p')
    descriptionP.appendChild(descNode)
    descriptionP.classList.add('desc')

    //creates the paragraph element that would display the transaction's amount

    amountP = document.createElement('p')
    amountP.appendChild(amountNode)
    amountP.classList.add('amount')

    //create button that deletes the current transaction and it's div

    deleteButton = document.createElement('button')
    deleteButton.innerText = "X"
    deleteButton.classList.add('delButton')
    deleteButton.onclick = function (){
        transactionArray = document.getElementsByClassName('transaction')
        itemIndex = getElIndex(transactionArray, this.parentElement)
        itemDate = document.getElementById('date').innerText

        removeTransactionFromStorage(itemDate, itemIndex)

        this.parentElement.remove()


    }

    transactionData = document.createElement('div')
    transactionData.classList.add('tranData')
    
    transactionData.appendChild(categoryP)
    transactionData.appendChild(descriptionP)
    transactionData.appendChild(amountP)

    newTransaction.appendChild(transactionData)
    newTransaction.appendChild(deleteButton)



    transactionDate = document.getElementById('date').innerText

    currentContents.insertBefore(newTransaction, buttEl)
}

function getDaySpent(){
    var date = getHeaderDate()

    var data = JSON.parse(localStorage.getItem(date))
    var sumAmount = 0.0
    for(transaction of data['transactions']){
        sumAmount += parseFloat(transaction['amount'])
    }
    return sumAmount
}


function dayStats(){

    var moneySpentToday = getDaySpent()

    var daySpentP = document.createElement('p')
    daySpentP.appendChild(document.createTextNode(moneySpentToday))
    daySpentP.id="spentInDay"

    var existCheck = document.getElementById("spentInDay")
    if(existCheck === null){
        document.getElementsByClassName('dayStats')[0].appendChild(daySpentP)
    }else{
        document.getElementsByClassName('dayStats')[0].replaceChild(daySpentP, existCheck)
    }

}