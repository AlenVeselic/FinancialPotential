/**
 * Description
 * @authors Alen Veselič ()
 * @date    2021-03-30 10:49:26
 * @version 1.0.0
 */

var enumDate = new Date(2021, 0, 1) // enumerating Date
var currentDate = new Date()        //present Date
var endDate = new Date(2022,0,1)    //final Date TODO: subject to change

var bodyEl = document.body

// compares two dates with a given mode of comparation, it can either check if they're the same or if one is greater than the other
// this function is contesting another in regular script
// might want to make a fourth script for date comparisons to reduce redundant functions
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

// returns the amount of days in a given month in a given year
function daysInMonth(month, year){
    return new Date(year, month, 0).getDate()
}
// calendar generation
while(!compareDate(enumDate,endDate, 'equals')){ // loops until the enumeration Date reaches the end date
    // on the first cycle the year container and all year data is initialized
    if(enumDate.getDate() == 1 && enumDate.getMonth() == 0){
        var year = enumDate.getFullYear()
        
        var yearDiv = document.createElement('div')
        yearDiv.classList.add('year')
        var yearText = document.createTextNode(enumDate.getFullYear())
        var yearTextH = document.createElement('h3')
        yearTextH.id = "yearTitle"
        yearTextH.appendChild(yearText)
        yearDiv.appendChild(yearTextH)
        
    }

    
    // everytime the first of a month is reached a new month container is created
    if(enumDate.getDate() === 1){
        
        // sections variable initialized, this would determine how many sections a month div would have
        var sections;
        // the name is formatted and put to the top of the month display
        var options = {month: 'long'};
        var monthName = new Intl.DateTimeFormat('en-US', options).format(enumDate)
        var monthText = document.createTextNode(monthName)
        var monthDiv = document.createElement('div')
        monthDiv.id = monthName
        monthDiv.classList.add('month')
        monthDiv.appendChild(monthText)
        yearDiv.appendChild(monthDiv)

        //this switch determines how many sections a month would have based on its amount of days.

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
    // creates a day
    var dayNumber = enumDate.getDate()
    var dayDiv = document.createElement('button') // the day is a button
    var dayText = document.createTextNode(dayNumber)
    if(dayNumber % 10 === 0 || dayNumber === 1 && sections > 0){// the day add to a section
    var monthSectionDiv = document.createElement('div')
    monthSectionDiv.classList.add('monthSection')
    sections--;
    }


    dayDiv.id = monthName + dayNumber.toString() 
    dayDiv.name = enumDate.toDateString() // the day's name attribute is used to set the date 
    dayDiv.classList.add('day')
    if(compareDate(enumDate, currentDate,  'greater')){ // if a day is past present day, then it is grayed out TODO: disabled
        dayDiv.classList.add('futureDay')
    }

    // here we set the onclick function,
    // using the name we set the date and go to the main index where we see, and can modify, the newly set date
    // note: using the name might be a copout, but for such a small program it's fine in my opinion
    dayDiv.onclick = function(){
        sessionStorage.setItem("setDate", this.name)
        window.location.href = "index.html"
    }

    // dominant category search for this day
    if(localStorage.getItem(enumDate.toDateString()) != null ){ // checks if this date exists in local storage
        var tranData = JSON.parse(localStorage.getItem(enumDate.toDateString()))
        var transactionCategories = {}
        for(transaction of tranData["transactions"]){ //loops through each transaction's category and makes a checklist of categories
            if(transactionCategories[transaction["category"]] == null){
                transactionCategories[transaction["category"]] = 0
            }else{
            transactionCategories[transaction["category"]]++
            }
        }

        if(Object.keys(transactionCategories).length > 1){// if there are multiple transaction categories in the day
            var biggestCategory = 0
            for(category of Object.keys(transactionCategories)){
                if(transactionCategories[category] > biggestCategory){
                    biggestCategory = transactionCategories[category]// find the biggest one
                }
            }
            var dominantCategory 
            for(category of Object.keys(transactionCategories)){
                
                if(transactionCategories[category] == biggestCategory){
                    
                    dominantCategory = category// and set it as the dominant one
                }
            }
        }else{// otherwise the only category is the dominant one by default
            var dominantCategory = Object.keys(transactionCategories)
        }
        // sets the dominant category's color as the background color for this day
        dayDiv.style.backgroundColor = JSON.parse(localStorage.getItem('categories'))[dominantCategory] 
    }
    //append everything and goes onto the next day
    dayDiv.appendChild(dayText)

    monthSectionDiv.appendChild(dayDiv)

    monthDiv.appendChild(monthSectionDiv)
    

    enumDate.setDate(enumDate.getDate() + 1)
}
//once the calendar is fully generated add it to the body 
bodyEl.appendChild(yearDiv)

