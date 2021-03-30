/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-30 10:49:26
 * @version 1.0.0
 */

enumDate = new Date(2021, 0, 1)
currentDate = new Date()
endDate = new Date(2022,0,1)

bodyEl = document.body

function compareDate(date1, date2, mode){
    var flags = 0

    switch(mode){

    case "equals":
        if(date1.getFullYear() == date2.getFullYear()){
            flags++
        }

        if(date1.getMonth() == date2.getMonth()){
            flags++
        }

        if(date1.getDate() == date2.getDate()){
            flags++
        }

        if(flags === 3){
            return true
        }else{
            return false
        }
    case "greater":
        if(date1.getFullYear() > date2.getFullYear()){
            return true
        }else{
            if(date1.getMonth() > date2.getMonth()){
                return true
            }else if(date1.getMonth() == date2.getMonth()){
                    if(date1.getDate() > date2.getDate()){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }
        }

    }

function daysInMonth(month, year){
    return new Date(year, month, 0).getDate()
}

while(!compareDate(enumDate,endDate, 'equals')){
    if(enumDate.getDate() == 1 && enumDate.getMonth() == 0){
        var year = enumDate.getFullYear()
        
        yearDiv = document.createElement('div')
        yearDiv.classList.add('year')
        yearText = document.createTextNode(enumDate.getFullYear())
        yearTextH = document.createElement('h3')
        yearTextH.id = "yearTitle"
        yearTextH.appendChild(yearText)
        yearDiv.appendChild(yearTextH)
        
    }

    

    if(enumDate.getDate() === 1){

        var options = {month: 'long'};
        var monthName = new Intl.DateTimeFormat('en-US', options).format(enumDate)
        var sections;
        var monthText = document.createTextNode(monthName)
        var monthDiv = document.createElement('div')
        monthDiv.id = monthName
        monthDiv.classList.add('month')
        monthDiv.appendChild(monthText)
        yearDiv.appendChild(monthDiv)

        switch (daysInMonth(enumDate.getMonth(), enumDate.getFullYear())){
            case 31:
    
            sections = 4;
            
    
            break;
            case 30:
    
            case 28:
            
            case 29:
    
            sections = 3;
    
            break;
        }

    }

    var dayNumber = enumDate.getDate()
    var dayDiv = document.createElement('button')
    var dayText = document.createTextNode(dayNumber)
    if(dayNumber % 10 === 0 || dayNumber === 1 && sections > 0){
    var monthSectionDiv = document.createElement('div')
    monthSectionDiv.classList.add('monthSection')
    sections--;
    }


    dayDiv.id = monthName + dayNumber.toString()
    dayDiv.name = enumDate.toDateString()
    dayDiv.classList.add('day')
    if(compareDate(enumDate, currentDate,  'greater')){
        dayDiv.classList.add('futureDay')
    }

    dayDiv.onclick = function(){
        sessionStorage.setItem("setDate", this.name)
        window.location.href = "index.html"
    }

    if(localStorage.getItem(enumDate.toDateString()) != null ){
        tranData = JSON.parse(localStorage.getItem(enumDate.toDateString()))
        var transactionCategories = {}
        for(transaction of tranData["transactions"]){
            if(transactionCategories[transaction["category"]] == null){
                transactionCategories[transaction["category"]] = 0
            }else{
            transactionCategories[transaction["category"]]++
            }
        }

        console.log(JSON.stringify(transactionCategories))

        if(Object.keys(transactionCategories).length > 1){
            var biggestCategory = 0
            for(category of Object.keys(transactionCategories)){
                if(transactionCategories[category] > biggestCategory){
                    biggestCategory = transactionCategories[category]
                }
            }
            console.log(biggestCategory)
            var dominantCategory 
            for(category of Object.keys(transactionCategories)){
                
                if(transactionCategories[category] == biggestCategory){
                    
                    dominantCategory = category
                }
            }
        }else{
            var dominantCategory = Object.keys(transactionCategories)
        }
        console.log(dominantCategory.toString())

        dayDiv.style.backgroundColor = JSON.parse(localStorage.getItem('categories'))[dominantCategory]
    }

    dayDiv.appendChild(dayText)

    monthSectionDiv.appendChild(dayDiv)

    monthDiv.appendChild(monthSectionDiv)
    

    enumDate.setDate(enumDate.getDate() + 1)
}

bodyEl.appendChild(yearDiv)

