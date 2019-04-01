//Event types
export const EXPENSE = "EXPENSE";
export const INCOME = "INCOME";
export const NEUTRAL = "NEUTRAL";

export default class EventClass {
    constructor( event ) {
        //Time related properties
        this.year = event.year;
        this.month = event.month;
        this.day = event.day;
        this.hour = event.hour;
        this.minute = event.minute;
        this.duration = event.duration;

        //this.repeatInXDays = event.repeatInXDays;
        //this.repeatAtFrecuency = "";
        //this.alertBeforeXMinutes = event.alertBeforeXMinutes;


        this.title = event.title;
        //this.description = event.description;
        this.category = event.category;
        this.tags = event.tags;


        this.amount = event.amount;
        this.type = event.type;
        this.account = event.account;
    }

    getDayOfWeek() {
        var dayOfWeek = new Date(`${this.year}-${this.month}-${this.day}`).getDay();    
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }

    getEvent() {
        return { "duration": this.duration, "title": this.title, "type": this.type }
    }

    getYearMonthDay() {
        return `${this.year}-${this.month<10?'0'+this.month :this.month}-${this.day<10?'0'+this.day :this.day}`
    }
}

// Initialize a constructor from a class
//const constructorFromClass = new y();