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

function addTransactionToStorage(date, data){

    

    item = {category: data[0], description: data[1], amount:data[2]}

    itemList = JSON.parse(localStorage.getItem(date))
    if(itemList == null){
        itemList = {}
        itemList["transactions"] = []
    }
    
    itemList["transactions"].push(item)

    checkDate(date)
    localStorage.setItem(date, JSON.stringify(itemList))


}

function checkDate(date){

    if(localStorage.getItem("transactionDates") == "" || localStorage.getItem("transactionDates") == null){
        transactionDates = []
        }else{
        transactionDates = localStorage.getItem("transactionDates").split(",")
        }
        if(!transactionDates.includes(date)) transactionDates.push(date)

        localStorage.setItem("transactionDates",transactionDates)
}