export default class Message {
    constructor(msg) {
        this.msg = msg;
    }
}

class Money {

    insertSeparators(num) {
        if (num.length <= 3) {
            return num;
        }
        return this.insertSeparators(num.substr(0, num.length - 3)) + ',' + num.substr(num.length - 3);
    }

    formatDisplayValue() {
        let decSep = ".";
        let thouSep = ",";
        let number = this.number;
        let decPlaces = this.decPlaces;

        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSep = typeof decSep === "undefined" ? "." : decSep;
        // thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var numStr = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));

        return sign + this.insertSeparators(numStr);
    }

    constructor(number, decPlaces, locale) {
        this.number = number;
        this.decPlaces = decPlaces;
        this.locale = locale === undefined ? "USA" : locale;
        this.displayValue = this.formatDisplayValue();
    }
}

class Opportunity {
    constructor(id, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency, opportunityOwnerId) {
        this.id = id;
        this.accountName = accountName;
        this.country = country;
        this.stage = stage;
        this.quantity = quantity;
        this.unitSalesPrice = unitSalesPrice;
        this.displayListPrice = new Money(listPrice).displayValue;
        this.currency = currency;
        this.opportunityOwnerId = opportunityOwnerId;

        this.displayUnitPrice = this.currency + " " + new Money(this.unitSalesPrice, 0).displayValue;
        this.totalPrice = this.currency + " " + new Money(this.quantity * this.unitSalesPrice, 0).displayValue;
    }

}

function Employee(id, name) {
    this.id = id;
    this.name = name;
}

class ColumnMapping {
    constructor(property, displayName) {
        this.property = property;
        this.displayName = displayName;
    }
}

export class DataCollection {
    constructor() {
        this.opportunities = [];
        this.employees = [];

        this.addOpportunity("VPN Service", "France", "Closed Won Booked", 10, 7980, 4000, "EUR", 0);
        this.addOpportunity('Wood Provider', 'USA', 'Closed Won Booked', 250, 3000, 4000, 'USD', 1);
        this.addOpportunity("Metal Provider", "Germany", "Closed Won Booked", 15, 2000, 4000, "EUR", 2);

        this.addEmployee("Jane Pebble");
        this.addEmployee("Mark Stone");
        this.addEmployee("Helen Rock");
    }

    addOpportunity(accountName, country, stage, quantity, unitSalesPrice, listPrice, currency) {
        this.opportunities.push(new Opportunity(this.opportunities.length + 1, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency));
    }

    addEmployee(name) {
        this.employees.push(new Employee(this.employees.length + 1, name));
    }

    get displayColumns() {
        return [
            new ColumnMapping("accountName", "Account Name"),
            new ColumnMapping("country", "Country"),
            new ColumnMapping("stage", "Stage"),
            new ColumnMapping("quantity", "Quantity"),
            new ColumnMapping("displayUnitPrice", "Unit Sales Price"),
            new ColumnMapping("totalPrice", "Total Price"),
            new ColumnMapping("displayListPrice", "List Price"),
        ];
    }

    get totalOpportunities() {
        return this.opportunities.length;
    }
}