import XLSX from "xlsx";
import { thistle } from "color-name";

class Money {

    insertSeparators(num) {
        if (num.length <= 3) {
            return num;
        }
        return this.insertSeparators(num.substr(0, num.length - 3)) + ',' + num.substr(num.length - 3);
    }

    insertDecimalPlaces() {
        if (this.decPlaces === 0) {
            return '';
        } else if (Number.isInteger(this.number)) {
            return `${this.decSep}00`;
        }

        return `${this.decSep}${this.numStr.substr(this.numStr.indexOf(this.decSep))}`;
    }

    get displayWithCurrency() {
        let thouSep = ",";
        let number = this.number;
        let decPlaces = this.decPlaces;

        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            this.decSep = typeof this.decSep === "undefined" ? "." : this.decSep;
        // thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var numStr = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));

        return `${this.currency} ${sign} ${this.insertSeparators(numStr)}${this.insertDecimalPlaces()}`;
    }

    constructor(number, decPlaces, currency, localeFormat) {
        this.decSep = '.';
        this.number = number;
        this.decPlaces = decPlaces;
        this.currency = currency;
        this.localeFormat = localeFormat === undefined ? "USA" : localeFormat;
    }
}

class Opportunity {
    constructor(id, accountName, country, stage, quantity, unitPrice, listPrice, currency, opportunityOwner) {
        this.decimalPlaces = 0;

        this.id = id;
        this.accountName = accountName;
        this.country = country;
        this.stage = stage;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.listPrice = listPrice;
        this.currency = currency;
        this.opportunityOwner = opportunityOwner;

        this.totalPrice = this.quantity * this.unitPrice;
    }

    get displayUnitPrice() {
        return new Money(this.unitPrice, this.decimalPlaces, this.currency).displayWithCurrency;
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

    getExcelRow() {

    }

}

function Employee(id, name) {
    this.id = id;
    this.name = name;
}

const columnTypes = {
    Text: 'text',
    Number: 'number',
    Price: 'price'
}

class ColumnMapping {
    constructor(property, displayName, columnType) {
        this.property = property;
        this.displayName = displayName;
        this.columnType = columnType === undefined ? columnTypes.Text : columnType;
    }
}

export default class DataCollection {
    constructor() {
        this.opportunities = [];
        this.employees = [];

        this.addEmployee("Jane Pebble");
        this.addEmployee("Mark Stone");
        this.addEmployee("Helen Rock");

        this.addOpportunity("VPN Service", "France", "Closed Won Booked", 10, 7980, 8000, "EUR", this.employees[0]);
        this.addOpportunity("HR Provider", "Germany", "Negotiation", 1, 10000, 10500, "EUR", this.employees[2]);
        this.addOpportunity('Wood Provider', 'USA', 'Closed Won Booked', 250, 3000, 4000, 'USD', this.employees[1]);
        this.addOpportunity('Bank', 'USA', 'Proposal', 50, 2895, 4000, 'USD', this.employees[1]);
        this.addOpportunity("Metal Provider", "Germany", "Closed Won Booked", 15, 2000, 3500, "EUR", this.employees[2]);
        this.addOpportunity("Energy Provider", "France", "Negotiation", 4, 1200, 1250, "EUR", this.employees[0]);
        this.addOpportunity("HR Top Recruitment", "France", "Closed Lost", 3, 2000, 2000, "EUR", this.employees[0]);
        this.addOpportunity('Godzilla LLC', 'Germany', 'Proposal', 20, 1300, 2000, 'EUR', this.employees[1]);
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

    get exportColumns() {
        return [
            new ColumnMapping("accountName", "Account Name"),
            new ColumnMapping("country", "Country"),
            new ColumnMapping("displayOpportunityOwner", "Opportunity Owner"),
            new ColumnMapping("stage", "Stage"),
            new ColumnMapping("quantity", "Quantity", columnTypes.Number),
            new ColumnMapping("unitPrice", "Unit Sales Price", columnTypes.Price),
            new ColumnMapping("totalPrice", "Total Price", columnTypes.Price),
            new ColumnMapping("listPrice", "List Price", columnTypes.Price),
        ];
    }

    get totalOpportunities() {
        return this.opportunities.length;
    }

    getExcelWorkbook() {
        let now = new Date();
        let wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "Sample Sales Report",
            Subject: "Sales Report",
            Author: "rpasamples.com",
            CreatedDate: new Date()
        };

        wb.SheetNames.push("Report");

        let columns = this.exportColumns;
        let ws_data = [ /*            [{ t: "n", v: 10000 }, { t: "n", v: 10000, z: '"USD" #,##0.00;"USD" -#,##0.00' }] */ ];
        let headers = [];
        let colWidths = [];
        for (let col = 0; col < columns.length; col++) {
            const displayName = columns[col].displayName;
            headers.push(displayName);
            colWidths.push(displayName.length);
        }

        ws_data.push(headers);

        for (let row = 0; row < this.opportunities.length; row++) {
            let newRow = [];
            for (let col = 0; col < columns.length; col++) {
                const rowData = this.opportunities[row];
                let cellValue = rowData[columns[col].property];
                let cellLength = cellValue.toString().length;

                if (columns[col].columnType === columnTypes.Price) {
                    // cellValue = 10000;
                    newRow.push({ t: 'n', v: cellValue, z: `"${rowData.currency}" #,##0.00;"${rowData.currency}" -#,##0.00` });
                    cellLength = new Money(cellValue, 2, this.opportunities[row].currency).displayWithCurrency.length;
                    console.log(`${new Money(cellValue, 2, this.opportunities[row].currency).displayWithCurrency} ${cellLength}`);
                } else if (columns[col].columnType === columnTypes.Number) {
                    newRow.push({ t: 'n', v: cellValue });
                } else {
                    newRow.push(cellValue);
                }

                if (cellLength > colWidths[col]) {
                    colWidths[col] = cellLength;
                }
            }
            ws_data.push(newRow);
        }

        var wscols = [];
        for (let idx = 0; idx < colWidths.length; idx++) {
            wscols.push({ wch: colWidths[idx] + 1 });
        }



        let ws = XLSX.utils.aoa_to_sheet(ws_data);
        ws['!cols'] = wscols;
        wb.Sheets["Report"] = ws;

        return wb;
    }
}