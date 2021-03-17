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
    
    
    addButton = document.getElementById('addTrans')

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

function setDateHeader(){
curDate = new Date()
if(curDate.getDate() != 1){
curDate.setDate(curDate.getDate() + daysBack)
}

currentContents = document.getElementById('content')

document.getElementById('date').innerHTML = curDate.getDate() + ". " + curDate.getMonth() + ". " + curDate.getFullYear()
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
    inputDiv.style.height = "300px"
    inputDiv.style.width = "300px"
    inputDiv.style.backgroundColor = "gray"
    inputDiv.style.position = "absolute"
    inputDiv.style.left = "50%"

    cancelButton = document.createElement('button')
    cancelButton.innerHTML = "Back"
    cancelButton.onclick = function(){
        window.alert("You cancelled the input.")
        inputDiv.remove();
    }

    cat = "Gas"
    desc = "12L"
    amount = 24.32
    inputDiv.innerHTML += "Current hardcoded values: " + cat + " " + desc + " " + amount.toString()

    applyButton = document.createElement('button')
    applyButton.innerHTML = "Add"
    applyButton.onclick = function(){
        data = [cat, desc, amount]
        createTransaction(buttEl ,data)
        inputDiv.remove()
    }


inputDiv.appendChild(cancelButton)
inputDiv.appendChild(applyButton)

document.body.appendChild(inputDiv)

}

function createTransaction(buttEl, data){

    
    generateTransactionDiv(buttEl, data)

    addTransactionToStorage(transactionDate, data)

    

}





function generateTransactionDiv(buttEl, data){

    newTransaction = document.createElement('div')
    newTransaction.classList.add('transaction')
    newTransaction.style.height = "30px"
    newTransaction.style.width = "100%"
    newTransaction.style.backgroundColor = "#" + bkgColor()

    categoryNode = document.createTextNode(data[0])
    descNode = document.createTextNode(data[1])
    amountNode = document.createTextNode(data[2].toString() + "€")

    newTransaction.appendChild(categoryNode)
    newTransaction.appendChild(descNode)
    newTransaction.appendChild(amountNode)

    transactionDate = document.getElementById('date').innerText

    currentContents.insertBefore(newTransaction, buttEl)
}