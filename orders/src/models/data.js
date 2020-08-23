class Money {

    insertSeparators(num) {
        if (num.length <= 3) {
            return num;
        }
        return this.insertSeparators(num.substr(0, num.length - 3)) + ',' + num.substr(num.length - 3);
    }

    get displayWithCurrency() {
        let decSep = ".";
        let thouSep = ",";
        let number = this.number;
        let decPlaces = this.decPlaces;

        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSep = typeof decSep === "undefined" ? "." : decSep;
        // thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var numStr = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));

        return `${this.currency} ${sign} ${this.insertSeparators(numStr)}`;
    }

    constructor(number, decPlaces, currency, locale) {
        this.number = number;
        this.decPlaces = decPlaces;
        this.currency = currency;
        this.locale = locale === undefined ? "USA" : locale;
    }
}

class Opportunity {
    constructor(id, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency, opportunityOwner) {
        this.decimalPlaces = 0;

        this.id = id;
        this.accountName = accountName;
        this.country = country;
        this.stage = stage;
        this.quantity = quantity;
        this.unitSalesPrice = unitSalesPrice;
        this.listPrice = listPrice;
        this.currency = currency;
        this.opportunityOwner = opportunityOwner;

        this.totalPrice = this.quantity * this.unitSalesPrice;
    }

    get displayUnitPrice() {
        return new Money(this.unitSalesPrice, this.decimalPlaces, this.currency).displayWithCurrency;
    }

    get displayTotalPrice() {
        return new Money(this.totalPrice, this.decimalPlaces, this.currency).displayWithCurrency;
    }

    get displayListPrice() {
        return new Money(this.listPrice, this.decimalPlaces, this.currency).displayWithCurrency;
    }

    get displayOpportunityOwner() {
        return this.opportunityOwner.name;
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

export default class DataCollection {
    constructor() {
        this.opportunities = [];
        this.employees = [];

        this.addEmployee("Jane Pebble");
        this.addEmployee("Mark Stone");
        this.addEmployee("Helen Rock");

        this.addOpportunity("VPN Service", "France", "Closed Won Booked", 10, 7980, 4000, "EUR", this.employees[0]);
        this.addOpportunity('Wood Provider', 'USA', 'Closed Won Booked', 250, 3000, 4000, 'USD', this.employees[1]);
        this.addOpportunity("Metal Provider", "Germany", "Closed Won Booked", 15, 2000, 4000, "EUR", this.employees[2]);
    }

    addOpportunity(accountName, country, stage, quantity, unitSalesPrice, listPrice, currency, opportunityOwner) {
        this.opportunities.push(new Opportunity(this.opportunities.length + 1, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency, opportunityOwner));
    }

    addEmployee(name) {
        this.employees.push(new Employee(this.employees.length + 1, name));
    }

    get displayColumns() {
        return [
            new ColumnMapping("accountName", "Account Name"),
            new ColumnMapping("country", "Country"),
            new ColumnMapping("displayOpportunityOwner", "Opportunity Owner"),
            new ColumnMapping("stage", "Stage"),
            new ColumnMapping("quantity", "Quantity"),
            new ColumnMapping("displayUnitPrice", "Unit Sales Price"),
            new ColumnMapping("displayTotalPrice", "Total Price"),
            new ColumnMapping("displayListPrice", "List Price"),
        ];
    }

    get totalOpportunities() {
        return this.opportunities.length;
    }
}