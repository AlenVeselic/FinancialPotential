/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-17 17:04:57
 * @version 1.0.0
 */

function addTransactionToStorage(date, data){
    item = {category: data[0], description: data[1], amount:data[2]}

    itemList = JSON.parse(localStorage.getItem(date))
    if(itemList == null){
        itemList = {}
        itemList["transactions"] = []
        itemList["transactions"].push(item)
    }
    
    itemList["transactions"].push(item)
    

    
    localStorage.setItem(date, JSON.stringify(itemList))


}