import EventClass from './eventClass.js';
import DayClass from './dayClass.js';

export default class MockDB {
    static getCategories() {
        return {
            REPORT: "REPORT",
            TRANSPORT: "TRANSPORT",
        }
    }
    static getAccounts() {
        return {
            NONE: "NONE",
            CASH: "CASH",
            DEBITO_BANCOLOMBIA: "DEBITO_BANCOLOMBIA",
            CREDITO_BANCOLOMBIA_AMERICAN: "CREDITO_BANCOLOMBIA_AMERICAN",
            CREDITO_BANCOLOMBIA_VISA: "CREDITO_BANCOLOMBIA_VISA",
        }
    }
    static getTypes() {
        return {
            EXPENSE: "EXPENSE",
            INCOME: "INCOME",
            NEUTRAL: "NEUTRAL",
        }
    }
    static getCalendar() {

        let calendar = {};
        let markedDates = {};

        let statusAccounts = {
            CASH: 10000,
            DEBITO_BANCOLOMBIA: 100000,
            CREDITO_BANCOLOMBIA_AMERICAN: 800000,
            CREDITO_BANCOLOMBIA_VISA: 900000,
        };
        calendar["2019-04-01"] = new DayClass({ year: 2019, month: 4, day: 1 }, statusAccounts);
        for (let i = 2; i < 10; i++) {
            calendar["2019-04-0" + i] = new DayClass(
                { year: 2019, month: 4, day: i }, calendar["2019-04-0" + i-1].remainingByAccount
            );
        }
        for (let i = 10; i < 32; i++) {
            calendar["2019-04-" + i] = new DayClass(
                { year: 2019, month: 4, day: i }, calendar["2019-04-0" + i-1].remainingByAccount
            );
        }

        const ev1 = new EventClass({
            year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90,
            title: "1", category: MockDB.getCategories().TRANSPORT, tags: ["SITP"],
            amount: 2200, type: MockDB.getTypes().EXPENSE,
            account: MockDB.getAccounts().DEBITO_BANCOLOMBIA
        });
        calendar["2019-04-10"].addEvent(ev1);

        const ev2 = new EventClass({
            year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90,
            title: "2", category: MockDB.getCategories().TRANSPORT, tags: ["UBER"],
            amount: 2200, type: MockDB.getTypes().INCOME,
            account: MockDB.getAccounts().DEBITO_BANCOLOMBIA
        });
        calendar["2019-04-10"].addEvent(ev2);

        const ev3 = new EventClass({
            year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90,
            title: "3", category: MockDB.getCategories().TRANSPORT, tags: ["UBER"],
            amount: 2200, type: MockDB.getTypes().INCOME,
            account: MockDB.getAccounts().DEBITO_BANCOLOMBIA
        });
        calendar["2019-04-10"].addEvent(ev3);

        const ev4 = new EventClass({
            year: 2019, month: 4, day: 11, hour: 10, minute: 0, duration: 90,
            title: "4", category: MockDB.getCategories().TRANSPORT, tags: ["SITP"],
            amount: 2200, type: MockDB.getTypes().EXPENSE,
            account: MockDB.getAccounts().DEBITO_BANCOLOMBIA
        });
        calendar["2019-04-11"].addEvent(ev4);
        const ev5 = new EventClass({
            year: 2019, month: 4, day: 11, hour: 10, minute: 0, duration: 90,
            title: "5", category: MockDB.getCategories().TRANSPORT, tags: ["SITP"],
            amount: 2200, type: MockDB.getTypes().EXPENSE,
            account: MockDB.getAccounts().DEBITO_BANCOLOMBIA
        });
        calendar["2019-04-11"].addEvent(ev5);
        const ev6 = new EventClass({
            year: 2019, month: 4, day: 20, hour: 10, minute: 0, duration: 90,
            title: "6", category: MockDB.getCategories().TRANSPORT, tags: ["SITP"],
            ammount: 0, type: MockDB.getTypes().NEUTRAL,
            account: MockDB.getAccounts().DEBITO_BANCOLOMBIA
        });
        calendar["2019-04-20"].addEvent(ev6);

        return calendar;
    }

}