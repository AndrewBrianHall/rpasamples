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
        this.row = id;
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

const sortDirections = {
    None: 'None',
    Asc: 'Asc',
    Desc: 'Desc'
}

class ColumnMapping {
    constructor(property, displayName, columnType, sortColumn) {
        this.sortDirection = sortDirections.None;
        this.property = property;
        this.displayName = displayName;
        this.columnType = columnType === undefined ? columnTypes.Text : columnType;
        this.rightAlign = this.columnType === columnTypes.Text ? false : true;
        this.sortColumn = sortColumn === undefined ? this : sortColumn;
    }
}

export default class DataCollection {
    constructor() {
        this._opportunities = [];
        this.employees = [];

        this._sortColumn = undefined;
        this._columns = {};

        this._addColumns();

        this._addEmployee("Jane Pebble");
        this._addEmployee("Mark Stone");
        this._addEmployee("Helen Rock");
        this._addEmployee("John Granite");

        this._addOpportunity("VPN Service", "France", "Closed Won Booked", 10, 7980, 8000, "EUR", this.employees[0]);
        this._addOpportunity("HR Provider", "Germany", "Negotiation", 1, 10000, 10500, "EUR", this.employees[2]);
        this._addOpportunity('Wood Provider', 'USA', 'Closed Won Booked', 250, 3000, 4000, 'USD', this.employees[1]);
        this._addOpportunity('Bank', 'USA', 'Proposal', 50, 2895, 4000, 'USD', this.employees[1]);
        this._addOpportunity("Metal Provider", "Germany", "Closed Won Booked", 15, 2000, 3500, "EUR", this.employees[2]);
        this._addOpportunity("Energy Provider", "France", "Negotiation", 4, 1200, 1250, "EUR", this.employees[0]);
        this._addOpportunity("HR Top Recruitment", "France", "Closed Lost", 3, 2000, 2000, "EUR", this.employees[0]);
        this._addOpportunity('Godzilla LLC', 'Germany', 'Proposal', 20, 1300, 2000, 'EUR', this.employees[1]);
    }

    _addEmployee(name) {
        this.employees.push(new Employee(this.employees.length + 1, name));
    }

    _addColumns() {
        this._columns.accountName = new ColumnMapping("accountName", "Account Name");
        this._columns.country = new ColumnMapping("country", "Country");
        this._columns.displayOpportunityOwner = new ColumnMapping("displayOpportunityOwner", "Opportunity Owner");
        this._columns.stage = new ColumnMapping("stage", "Stage");
        this._columns.quantity = new ColumnMapping("quantity", "Quantity", columnTypes.Number);
        this._columns.unitPrice = new ColumnMapping("unitPrice", "Unit Sales Price", columnTypes.Price);
        this._columns.displayUnitPrice = new ColumnMapping("displayUnitPrice", "Unit Sales Price", columnTypes.Price, this._columns.unitPrice);
        this._columns.totalPrice = new ColumnMapping("totalPrice", "Total Price", columnTypes.Price);
        this._columns.displayTotalPrice = new ColumnMapping("displayTotalPrice", "Total Price", columnTypes.Price, this._columns.totalPrice);
        this._columns.listPrice = new ColumnMapping("listPrice", "List Price", columnTypes.Price);
        this._columns.displayListPrice = new ColumnMapping("displayListPrice", "List Price", columnTypes.Price, this._columns.listPrice);
    }

    _addOpportunity(accountName, country, stage, quantity, unitSalesPrice, listPrice, currency, opportunityOwner) {
        this._opportunities.push(new Opportunity(this._opportunities.length + 1, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency, opportunityOwner));
    }

    get displayColumns() {
        return [
            this._columns.accountName,
            this._columns.country,
            this._columns.displayOpportunityOwner,
            this._columns.stage,
            this._columns.quantity,
            this._columns.displayUnitPrice,
            this._columns.displayTotalPrice,
            this._columns.displayListPrice,
        ];
    }

    get exportColumns() {
        return [
            this._columns.accountName,
            this._columns.country,
            this._columns.displayOpportunityOwner,
            this._columns.stage,
            this._columns.quantity,
            this._columns.unitPrice,
            this._columns.totalPrice,
            this._columns.listPrice,
        ];
    }

    get opportunities() {
        return this._opportunities;
    }

    get totalOpportunities() {
        return this._opportunities.length;
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

        for (let row = 0; row < this._opportunities.length; row++) {
            let newRow = [];
            for (let col = 0; col < columns.length; col++) {
                const rowData = this._opportunities[row];
                let cellValue = rowData[columns[col].property];
                let cellLength = cellValue.toString().length;

                if (columns[col].columnType === columnTypes.Price) {
                    // cellValue = 10000;
                    newRow.push({ t: 'n', v: cellValue, z: `"${rowData.currency}" #,##0.00;"${rowData.currency}" -#,##0.00` });
                    cellLength = new Money(cellValue, 2, this._opportunities[row].currency).displayWithCurrency.length;
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

        XLSX.writeFile(wb, `Opportunities ${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.xlsx`);
        return wb;
    }

    sortOpportunities(col) {
        if (this._sortColumn !== undefined && this._sortColumn !== col) {
            this._sortColumn.sortDirection = sortDirections.None;
        }
        if (col.sortDirection === sortDirections.None || col.sortDirection === sortDirections.Desc) {
            col.sortDirection = sortDirections.Asc;
        } else {
            col.sortDirection = sortDirections.Desc;
        }
        this._sortColumn = col;

        this._opportunities.sort(function sortFunction(a, b) {
            if (a[col.sortColumn.property] === b[col.sortColumn.property]) {
                return 0;
            } else {
                if (col.sortDirection === sortDirections.Asc) {
                    return a[col.sortColumn.property] < b[col.sortColumn.property] ? -1 : 1;
                }
                return a[col.sortColumn.property] > b[col.sortColumn.property] ? -1 : 1;
            }
        });

        for (let i = 0; i < this._opportunities.length; i++) {
            this._opportunities[i].row = i + 1;
        }
    }
}