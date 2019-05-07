import MockDB from './mockDB.js';
export default class DayClass {
    constructor(date, accountStatusPreviousDay) {

        this.dayIncome = 0;
        this.dayExpenses = 0;

        this.remainingByAccount = accountStatusPreviousDay;

        //Time related properties
        this.year = date.year;
        this.month = date.month;
        this.day = date.day;

        this.events = [];
    }

    addEvent(event) {
        this.events.push(event.getEvent());
        if (event.type === MockDB.getTypes().EXPENSE) {
            this.dayExpenses += event.amount;
            remainingByAccount[event.account] -= event.amount; //En teoria baja en todos
        }
        else if (event.type === MockDB.getTypes().INCOME) {
            this.dayIncome += event.amount;
            remainingByAccount[event.account] += event.amount;
        }
    }

    getDayOfWeek() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = new Date(`${this.year}-${this.month}-${this.day}`).getDay();
        return isNaN(dayOfWeek) ? null : days[dayOfWeek];
    }
    getYearMonthDay() {
        return `${this.year}-${this.month < 10 ? '0' + this.month : this.month}-${this.day < 10 ? '0' + this.day : this.day}`
    }
    getYesterday() {
        return `${this.year}-${this.month < 10 ? '0' + this.month : this.month}-${this.day <= 10 ? '0' + this.day - 1 : this.day - 1}`
    }
    getDay() {
        return this.day;
    }
    getEvents() {
        const report = new EventClass({
            year: this.year, month: this.month, day: this.day, hour: 1, minute: 0, duration: 90,
            title: "Report", category: EventClass.getCategories().REPORT, tags: [],
            amount: 0, type: EventClass.getTypes().NEUTRAL,
            account: EventClass.getAccounts().NONE, info
        });
        this.events.unshift(report.getEvent());
        return this.events;
    }
}