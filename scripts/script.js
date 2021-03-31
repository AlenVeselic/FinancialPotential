/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-16 12:15:42
 * @version 1.0.0
 */


// clears all displayed transaction divs
function clearTranDivs(){
    var transactionDivs = document.getElementsByClassName('transaction')
    while(transactionDivs.length != 0){
        transactionDivs[0].remove()
    }
}
    
// refreshes displayed transaction divs
function genTrans(){

    if(document.getElementsByClassName('transaction').length != 0){
        clearTranDivs()
    }
    

    var date = sessionStorage.getItem('setDate')
    
    var rawData = localStorage.getItem(date)

    if(rawData == null){ // if the given date has no transactions, the process is cut short
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

//creates and appends the add transaction button
var currentContents = document.getElementById('content')


var addButton = document.createElement('button')

var imageAdd = document.createElement('img')
imageAdd.src = "assets/buttAdd2.png"
addButton.appendChild(imageAdd)

addButton.id = "addTran"
addButton.onclick = function(){ //toggles the prompt window

    if(document.getElementsByClassName('promptWindow').length == 0){
    openInput(this);
    }else{
        document.getElementsByClassName('promptWindow')[0].remove()
    }

}

currentContents.appendChild(addButton);



function bkgColor(){ // generates a random color
    return Math.floor(Math.random() * 16777215).toString(16)
}

// creates and appends the forward and backward nav buttons for navigation by the day
// TODO: implement different movement methods(by month?, week?, user number choice?)

backButton = document.getElementById('dateBack')
backButton.onclick = function(){
    dateBack()
}

forwardButton = document.getElementById('dateForward')
forwardButton.onclick = function(){
    dateForward()
}

// checks wether a given date is equal to the present date
// TODO: either delete this one or the clone on in calendarScript
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
// TODO: make this function obsolete and replace all its appearances with the sessionStorage variable
function getHeaderDate(){
    return document.getElementById("date").innerText
}

//sets the inner date, the date displayed and refreshes all other displaying mechanisms(transactions, statistics) to match the new date
function setDateHeader(date){
var curDate = new Date(date)


sessionStorage.setItem("setDate", curDate.toDateString())

if (compareDateWithPresent(curDate)){
    document.getElementById('dateForward').disabled = true
}else{
    document.getElementById('dateForward').disabled = false
}

document.getElementById('date').innerHTML = curDate.getDate() + ". " + (curDate.getMonth() + 1) + ". " + curDate.getFullYear()

genTrans()
dayStats()
}

// by day date manipulation functions

function dateBack(){
    prevDate = new Date(sessionStorage.getItem("setDate"))
    prevDate.setDate(prevDate.getDate() - 1)
    setDateHeader(prevDate)

}

function dateForward(){
    nextDate = new Date(sessionStorage.getItem("setDate"))
    nextDate.setDate(nextDate.getDate() + 1)
    setDateHeader(nextDate)
}

// onload date setting function
if(sessionStorage.getItem("setDate") == null){// if no date is saved, the index window displays today's date
setDateHeader(new Date())
}else{ // else it displays the last one the user worked on
    setDateHeader(new Date(sessionStorage.getItem("setDate")))
}


// generates the prompt to add a transaction
function openInput(buttEl){

    // MAIN INPUT DIV SECTION //

    // base wrapper div creation and class assignment
    var inputDiv = document.createElement('div')
    inputDiv.classList.add('promptWindow')

    // main basic div creation
    var basicInput = document.createElement('div')
    basicInput.classList.add('inputMain')

    // prompt window title creation, initiation and appending
    var windowP = document.createElement('h3')
    var windowText = document.createTextNode('New transaction')
    windowP.classList.add('promptTitle')

    windowP.appendChild(windowText)

    basicInput.appendChild(windowP)

    // input form creation
    var transactionForm = document.createElement('form')
    transactionForm.name = "inputForm"

    // category component creation

    var categoryOptDiv = document.createElement('div')
    categoryOptDiv.classList.add('categorySection', 'inputSection')

    var categorySelection = document.createElement('select')
    categorySelection.name = "categories"

    // category component label creation
    var elPCategory = document.createElement('p')
    var elTextCategory = document.createTextNode('Category: ')
    elPCategory.appendChild(elTextCategory)

    // category option generation
    generateCategories(categorySelection)

    // appends both label and category 

    categoryOptDiv.appendChild(elPCategory)
    categoryOptDiv.appendChild(categorySelection)

    transactionForm.appendChild(categoryOptDiv)


    // short description component and label creation

    var descDiv = document.createElement('div')
    descDiv.classList.add('descSection', 'inputSection')

    var descEntry = document.createElement('input')
    descEntry.name = "description"
    descEntry.type = "text"
    descEntry.placeholder = "(optional)"

    var elPDesc = document.createElement('p')
    var elTextDesc = document.createTextNode('Short description: ')
    elPDesc.appendChild(elTextDesc)



    descDiv.appendChild(elPDesc)
    descDiv.appendChild(descEntry)

    transactionForm.appendChild(descDiv)

    // currency amount component and label creation

    var amountDiv = document.createElement('div')
    amountDiv.classList.add('amDiv', 'inputSection')

    var amountEntry = document.createElement('input')
    amountEntry.name = "amount"
    amountEntry.type = "number"
    amountEntry.step = "0.01" // this decides the amount's step/accuracy

    var elPAmount = document.createElement('p')
    var elTextAmount = document.createTextNode('Amount: ')
    elPAmount.appendChild(elTextAmount)

    amountDiv.appendChild(elPAmount)
    amountDiv.appendChild(amountEntry)

    transactionForm.appendChild(amountDiv)

    // OPTIONS DIV SECTION //

    /* base options div creation */
    var optionsDiv = document.createElement('div')
    optionsDiv.classList.add('inputOptions')

    /* Category option configuration section creation */
    var divCat = document.createElement('div')
    divCat.classList.add('catConfig')

    var labelCatSection = document.createElement('h4')
    labelCatSection.classList.add('promptTitle')

    var labelTextCatSection = document.createTextNode('Categories')
    labelCatSection.appendChild(labelTextCatSection)

    var lineCatSection = document.createElement('hr')

    divCat.appendChild(labelCatSection)
    divCat.appendChild(lineCatSection)

    // category name input and label creation
    var divCatMod = document.createElement('div')
    divCatMod.classList.add('inputSection')

    var categoryName = document.createElement("input")
    categoryName.type = "text"
    categoryName.name = "catName"

    var labelCatMod = document.createElement('p')
    var labelTextCatMod = document.createTextNode('Enter category to add/remove:')
    labelCatMod.appendChild(labelTextCatMod)

    divCatMod.appendChild(labelCatMod)
    divCatMod.appendChild(categoryName)

    //category color input and label creation

    // TODO: Decide wether I want to give users free reign over color choice or make a set list of colors to choose from

    var divCatColor = document.createElement('div')
    divCatColor.classList.add('inputSection')

    var categoryColor = document.createElement('input')
    categoryColor.type = "color" /* here I use the color input type, at first just to see how it works
    this is subject to change since you can choose some pretty bad colors by yourself */
    categoryColor.name = "catColor"

    var labelCatColor = document.createElement('p')
    var labelTextCatColor = document.createTextNode('Choose a color for this category:')
    labelCatColor.appendChild(labelTextCatColor)

    divCatColor.appendChild(labelCatColor)
    divCatColor.appendChild(categoryColor)

    // appending everything to the options portion of the prompt window
    divCat.appendChild(divCatMod)
    divCat.appendChild(divCatColor)

    

    /* remove category button creation
     gets category value from text input, removes it from storage and refreshes the options in the menu in basic input */

    // TODO: separate deletion and addition, so that deletion has you chose the categories from a menu  to avoid false input chances from the text field

    var removeCatButton = document.createElement('button')
    removeCatButton.classList.add('remCat')
    removeCatButton.innerText = "Remove Category"
    removeCatButton.onclick = function(){
        let category = document.getElementsByName("catName")[0].value
        removeCategoryFromStorage(category)
        generateCategories(document.getElementsByName('categories')[0])

    }

    /* category addition button creation
        The button takes the chosen name and category, sends them into storage and refreshes the category menu with the fresh category */

    var addCatButton = document.createElement('button')
    addCatButton.classList.add('addCat')
    addCatButton.innerText = "Add Category"
    addCatButton.onclick = function(){
            let newCategory = document.getElementsByName("catName")[0].value
            let catColor = document.getElementsByName('catColor')[0].value
            addCategoryToStorage(newCategory, catColor)
            generateCategories(document.getElementsByName('categories')[0])
            
        }
    
    // append both buttons
    divCat.appendChild(addCatButton)
    divCat.appendChild(removeCatButton)

    optionsDiv.appendChild(divCat)
    
    // append base form to input div
    basicInput.appendChild(transactionForm)

    /* 
        Apply button creation
        It takes the chosen category, written short description and given amount, with these values creating a new transaction, reevaluating the day's stats
        and closing the prompt.

        TODO: input validation, category and amount should be required 
    */
    applyButton = document.createElement('button')
    applyButton.classList.add('addButton', 'mainInput')
    applyButton.innerHTML = "Add"
    applyButton.onclick = function(){
        let cat = document.forms["inputForm"]["categories"].value
        let desc;
        if(document.forms["inputForm"]["description"].value != "(optional)"){
        desc = document.forms["inputForm"]["description"].value
        }else{
        desc = ""
        }
        let amount = document.forms["inputForm"]["amount"].value  

        let data = [cat, desc, amount]
        createTransaction(buttEl ,data)
        dayStats()
        inputDiv.remove()
    }

    // cancel/back button creation and initiation
    var cancelButton = document.createElement('button')
    cancelButton.innerHTML = "Back"
    cancelButton.classList.add('backButton', 'mainInput')

    // on cancellation the prompt closes(removes the div from the window)
    cancelButton.onclick = function(){
        inputDiv.remove()
    }

    /* options button creation
       this button toggles the display of the transaction config on the prompt window */
       var optionsButton = document.createElement('button')
       optionsButton.innerText = "..."
       optionsButton.classList.add('configButton')
       optionsButton.onclick = function (){
           document.getElementsByClassName('inputOptions')[0].classList.toggle('show')
       }

    // appends all buttons to basic input

    
    basicInput.appendChild(cancelButton)
    basicInput.appendChild(applyButton)
    basicInput.appendChild(optionsButton)


    // appends both big sections to the prompt window
    inputDiv.appendChild(basicInput)

    inputDiv.appendChild(optionsDiv)

    // after creating everything the prompt window materializes in front of the user ready for input

    document.body.appendChild(inputDiv)

}

// refreshes all saved categories as option elements for the window prompt's menu
function generateCategories(selectEl){

    var optionElements = selectEl.getElementsByTagName('option')
        while(optionElements.length != 0){
            selectEl.getElementsByTagName('option')[0].remove()
        }
    

    var categoryList = JSON.parse(localStorage.getItem('categories'))



    if(categoryList.length != 0){
        for(category of Object.keys(categoryList)){
            let newOption = document.createElement('option')
            newOption.value = category
            newOption.innerText = category
            selectEl.appendChild(newOption)
        }
    }

}

// generates a div for the created transaction and save said transaction into the appropriate local storage location

function createTransaction(buttEl, data){

    
    generateTransactionDiv(buttEl, data)

    addTransactionToStorage(sessionStorage.getItem('setDate'), data)

    

}

//gets an element's numeric index from a list of nodes 

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

    var newTransaction = document.createElement('div')
    newTransaction.classList.add('transaction')

    //gets that transaction's category and that category's color value
    var allCats = JSON.parse(localStorage.getItem('categories'))
    var backgroundColour = allCats[data[0]]

    if(backgroundColour != null){//if the cateogry exists, the color styles the appropriate attributes
        newTransaction.style.color = backgroundColour.toString()
        newTransaction.style.borderBottomColor = backgroundColour.toString()
    }else{ //otherwise the attributes are assigned random colors
            // TODO: assign default color for non-existent/deleted categories
        newTransaction.style.color = "#" + bkgColor()
        newTransaction.style.borderBottomColor = "#" + bkgColor()
    }

    // gets all data into their appropriate containers and formats it
    var categoryNode = document.createTextNode(data[0])
    var descNode = document.createTextNode(data[1])
    var amountNode = document.createTextNode(data[2].toString() + "€")
    //TODO: Implement other currencies

    var categoryP = document.createElement('p')
    categoryP.appendChild(categoryNode)
    categoryP.classList.add('cat')

    var descriptionP = document.createElement('p')
    descriptionP.appendChild(descNode)
    descriptionP.classList.add('desc')

    var amountP = document.createElement('p')
    amountP.appendChild(amountNode)
    amountP.classList.add('amount')

    //create button that deletes the transaction it is tied to. Both from local storage and the div displaying it

    var deleteButton = document.createElement('button')
    deleteButton.innerText = "X"
    deleteButton.classList.add('delButton')
    deleteButton.onclick = function (){
        let transactionArray = document.getElementsByClassName('transaction')
        itemIndex = getElIndex(transactionArray, this.parentElement)
        let itemDate = new Date(sessionStorage.getItem('setDate')).toDateString()

        removeTransactionFromStorage(itemDate, itemIndex)

        this.parentElement.remove()


    }

    // creates the data section of the transaction
    var transactionData = document.createElement('div')
    transactionData.classList.add('tranData')
    
    transactionData.appendChild(categoryP)
    transactionData.appendChild(descriptionP)
    transactionData.appendChild(amountP)

    // appends the data and delete button sections to the new transaction
    newTransaction.appendChild(transactionData)
    newTransaction.appendChild(deleteButton)

    // adds the transaction to the content div
    currentContents.insertBefore(newTransaction, buttEl)
}

// calculates the amount of money spent on the currently displayed day
function getDaySpent(){
    var date = getHeaderDate()

    var data = JSON.parse(localStorage.getItem(date))
    var sumAmount = 0.0
    if(data != null){
        for(transaction of data['transactions']){
                sumAmount += parseFloat(transaction['amount'])
            
        }
    }

    if(Number.isNaN(sumAmount)){
        return 0
    }
    return sumAmount
}

// displays the day's stats
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