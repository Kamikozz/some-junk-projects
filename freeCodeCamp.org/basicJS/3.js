/* eslint-disable */
function checkCashRegister(price, cash, cid) {
    // Here is your change, ma'am.

    // deep copy of Arrays
    var origCid = [];
    cid.forEach(function (v) {
        origCid.push(v.slice());
    });
    // calc change
    var change = Number((cash - price).toFixed(2));

    // return {status: "INSUFFICIENT_FUNDS", change: []}
    // if cash-in-drawer is less than the change due
    var totalCash = 0;
    for (var i = 0; i < cid.length; i++) {
        var value = cid[i][1]; // ['PENNY', 1.01]
        totalCash += Number(value);
    }
    totalCash = Number(totalCash.toFixed(2));
    if (totalCash < change) return { status: "INSUFFICIENT_FUNDS", change: [] }
    var newCid = [];
    for (var i = cid.length - 1; i >= 0; i--) {
        var currency = cid[i][0];
        var currentValue;
        switch (currency) {
            case 'ONE HUNDRED':
                currentValue = 100;
                break;
            case 'TWENTY':
                currentValue = 20;
                break;
            case 'TEN':
                currentValue = 10;
                break;
            case 'FIVE':
                currentValue = 5;
                break;
            case 'ONE':
                currentValue = 1;
                break;
            case 'QUARTER':
                currentValue = 0.25;
                break;
            case 'DIME':
                currentValue = 0.10;
                break;
            case 'NICKEL':
                currentValue = 0.05;
                break;
            case 'PENNY':
                currentValue = 0.01;
                break;
        }
        if (change === 0) break;
        if (change < currentValue) continue;
        var qHave = Math.floor(cid[i][1] / currentValue);
        if (qHave === 0) continue;
        var qNeed = Math.floor(change / currentValue);
        var difference = qHave - qNeed;

        if (difference >= 0) {
            cid[i][1] = Number((difference * currentValue).toFixed(2));
            var taken = Number((qNeed * currentValue).toFixed(2));
            change = Number((change - taken).toFixed(2));
            newCid.push([currency, taken]);
        } else {
            cid[i][1] = 0;
            var taken = Number((qHave * currentValue).toFixed(2));
            change = Number((change - taken).toFixed(2));
            newCid.push([currency, taken]);
        }
    }

    // check if cash-in-drawer is empty
    totalCash = 0;
    cid.forEach(function (v, i) {
        totalCash += v[1];
    })

    if (change) {
        // return {status: "INSUFFICIENT_FUNDS", change: []}
        // if cash-in-drawer cannot return the exact change
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    } else if (!change && !totalCash) {
        // return {status: "CLOSED", change: [...]}
        // with cash-in-drawer as the value for the key change 
        // if it is equal to the change due
        return { status: "CLOSED", change: origCid }
    } else {
        // return {status: "OPEN", change: [...]}
        // with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key
        return { status: "OPEN", change: newCid }
    }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", "100"]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));