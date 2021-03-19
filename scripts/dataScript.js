/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-17 17:04:57
 * @version 1.0.0
 */

if(localStorage.getItem("transactionDates") == null){
    transactionDates = []
    localStorage.setItem("transactionDates", transactionDates)
}
if(localStorage.getItem('categories') == null){
    categories = []
    localStorage.setItem("categories", categories)
}

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
            localStorage.removeItem(date)
        }

    }

}

function addCategoryToStorage(newCat){

    categoryList = localStorage.getItem('categories').split(',')

    if(!categoryList.includes(newCat)){
        if(categoryList[0] == ""){
            categoryList[0] = newCat
        }else{
        categoryList.push(newCat)
        }

    }

    localStorage.setItem('categories', categoryList)

}