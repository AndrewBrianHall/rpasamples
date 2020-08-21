function Money(number, decPlaces, locale) {
    this.insertSeparators = function(num, thousSep) {
        if (num.length <= 3) {
            return num;
        }
        return this.insertSeparators(num.substr(0, num.length - 3)) + ',' + num.substr(num.length - 3);
    }

    this.formatDisplayValue = function() {
        let decSep = ".";
        let thouSep = ",";
        let number = this.number;
        let decPlaces = this.decPlaces;

        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSep = typeof decSep === "undefined" ? "." : decSep;
        thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var numStr = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));

        return sign + this.insertSeparators(numStr);
    }

    this.number = number;
    this.decPlaces = decPlaces;
    this.locale = locale === undefined ? "USA" : locale;
    this.displayValue = this.formatDisplayValue();
}

function DataEntry(id, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency) {
    this.id = id;
    this.accountName = accountName;
    this.country = country;
    this.stage = stage;
    this.quantity = quantity;
    this.unitSalesPrice = unitSalesPrice;
    this.displayListPrice = new Money(listPrice).displayValue;
    this.currency = currency;

    this.displayUnitPrice = this.currency + " " + new Money(this.unitSalesPrice, 0).displayValue;
    this.totalPrice = this.currency + " " + new Money(this.quantity * this.unitSalesPrice, 0).displayValue;

}

function DataCollection() {
    this.records = [];

    this.addEntry = function(accountName, country, stage, quantity, unitSalesPrice, listPrice, currency) {
        this.records.push(new DataEntry(this.records.length + 1, accountName, country, stage, quantity, unitSalesPrice, listPrice, currency));
    }

    this.addEntry("VPN Service", "France", "Closed Won Booked", 10, 7980, 4000, "EUR");
    this.addEntry('Wood Provider', 'USA', 'Closed Won Booked', 250, 3000, 4000, 'USD');
}

var data = new DataCollection();
// var data = [
//     new DataEntry(1, "VPN Service", "France", "Closed Won Booked", 10, 7980, 4000, "EUR"),
//     new DataEntry(2, 'Wood Provider', 'USA', 'Closed Won Booked', 250, 3000, 4000, 'USD')

//     //{ id: 1, accountName: "VPN Service", country: 'France', state: 'Closed Won Booked', quantity: 10, unitSalesPrice: { value: 7980, isMoney: true }, currency: "EUR" }
// ]

function initVue() {
    new Vue({
        el: '#fourthTable',
        data: {
            ascending: false,
            sortColumn: ''
        },
        methods: {
            "sortTable": function sortTable(col) {
                if (this.sortColumn === col) {
                    this.ascending = !this.ascending;
                } else {
                    this.ascending = true;
                    this.sortColumn = col;
                }

                var ascending = this.ascending;

                this.rows.sort(function(a, b) {
                    if (a[col] > b[col]) {
                        return ascending ? 1 : -1
                    } else if (a[col] < b[col]) {
                        return ascending ? -1 : 1
                    }
                    return 0;
                })
            }
        },
        computed: {
            "columns": function() {
                if (this.rows.length == 0) {
                    return [];
                }
                return [
                    ['accountName', 'Account Name'],
                    ['country', 'Country'],
                    ['stage', 'Stage'],
                    ['quantity', 'Quantity'],
                    ['displayUnitPrice', 'Unit Sales Price'],
                    ['totalPrice', 'Total Price'],
                    ['displayListPrice', 'List Price']
                ];
            },
            "rows": function() {
                return data.records;
            },
            "totalRecords": function() {
                return data.records.length;
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', function(event) { initVue(); });