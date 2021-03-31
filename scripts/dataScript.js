/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-17 17:04:57
 * @version 1.0.0
 */

// checks if certain keys exist and if they don't, initializes them
if(localStorage.getItem("transactionDates") == null){
    var transactionDates = []
    localStorage.setItem("transactionDates", transactionDates)
}
if(localStorage.getItem('categories') == null){
    var categories = {}
    localStorage.setItem("categories", JSON.stringify(categories))
}

// logs a transaction for a given date, checks wether the date exists in the base and creates/overwrites the transaction list with this new transaction
function addTransactionToStorage(date, data){

    item = {category: data[0], description: data[1], amount:data[2]}

    itemList = JSON.parse(localStorage.getItem(date))
    if(itemList == null){
        itemList = {}
        itemList["transactions"] = []
    }
    
    itemList["transactions"].push(item)

    checkDate(date, "add")
    localStorage.setItem(date, JSON.stringify(itemList))

}


// checks wether a date exists on the list of dates on which transactions have happened
//  if a transaction is being added it checks if it exists, if it does it exits, if it doesn't, the date is added to the list
//  if a transaction is being removed, the date is checked if it's empty after removal, if it is the date is removed
function checkDate(date, modType){


    if(localStorage.getItem("transactionDates") == "" || localStorage.getItem("transactionDates") == null){
        transactionDates = []
        }else{
        transactionDates = localStorage.getItem("transactionDates").split(",")
        }

        

        if(!transactionDates.includes(date)){
            if(modType == "add"){
                transactionDates.push(date)
            }else if(modType == "del"){
                return false;
            }
        }else if(transactionDates.includes(date) && modType == "del"){
                return true;
        }


        localStorage.setItem("transactionDates",transactionDates)
}

//removes a transaction from the list, this is a bit more complex since you can't delete an item from an array without leaving a hole in it's place.
// so I make a new array, taking only the indexes that have values in them into it and save that as the new list of transactions. Shifting the 
// empty index into oblivion.

// Otherwise if the resulting new array is empty, the date is removed from the transaction dates list and also removed as a key in local storage
function removeTransactionFromStorage(date, transactionIndex){
    if(checkDate(date, "del")){
        data = JSON.parse(localStorage.getItem(date))

        delete data["transactions"][transactionIndex]

        newTransactionList = []

        while(data["transactions"].length != 0){
            if(data["transactions"][0] != null){
            newTransactionList.push(data["transactions"].shift())
            }else{
                data["transactions"].shift()
            }
        }

        data["transactions"] = newTransactionList

        if(data["transactions"].length != 0){
            localStorage.setItem(date, JSON.stringify(data))
        }else{
            allDates = localStorage.getItem("transactionDates").split(',')
            allDates.splice(allDates.indexOf(date), 1)

            localStorage.setItem("transactionDates", allDates)

            localStorage.removeItem(date)
        }

    }

}

// add a category object to local storage, that holds the value of it's own color, but not before checking if it already exists
// TODO: Add more customization to categories(Icons? patterns?, borders?)
function addCategoryToStorage(newCat, catColor){

    categoryList = JSON.parse(localStorage.getItem('categories'))

    if(!Object.keys(categoryList).includes(newCat)){
        categoryList[newCat] = catColor
    }

    localStorage.setItem('categories', JSON.stringify(categoryList))

}

// removes a category from local storage
function removeCategoryFromStorage(category){

    categoryList = JSON.parse(localStorage.getItem('categories'))

    if(Object.keys(categoryList).includes(category)){
        delete categoryList[category]
    }

    localStorage.setItem('categories', JSON.stringify(categoryList))

}

//TODO: make category date validation case insensitive and diplay them with capitals