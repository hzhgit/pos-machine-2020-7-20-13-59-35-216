const barcodes = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];


let result = printReceipt(barcodes);

function printReceipt(barcodes) {
    //     console.log(`
    // ***<store earning no money>Receipt ***
    // Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
    // Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
    // Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
    // ----------------------
    // Total: 23 (yuan)
    // **********************`)

    if (isValid(barcodes)) {
        let goods = classifyGoods(barcodes)
        return getPrintReceiptStr(goods);
    }
    return null;
}

function isValid(barcodes) {
    if (barcodes.length > 0) {
        return true;
    }
    return false;
}

function classifyGoods(barcodes) {
    var goods = {};
    var data = loadAllItem().data;

    for (let i in barcodes) {
        if (!goods.hasOwnProperty(barcodes[i])) {
            let res = data.filter((item) => {
                return item.barcode == barcodes[i];
            });
            goods[barcodes[i]] = { 'barcode': barcodes[i], 'name': res[0].name, 'price': res[0].price, 'count': 1 };
        } else {
            goods[barcodes[i]]['count']++;
        }
    }

    return goods;
}

function loadAllItem() {
    return require('./data');
}


function getPrintReceiptStr(goods) {
    var str = "\n***<store earning no money>Receipt ***\n"
    var total = 0;

    for (let barcode in goods) {
        str += 'Name: ' + goods[barcode].name + ', Quantity: '
            + goods[barcode].count + ', Unit price: '
            + goods[barcode].price + ' (yuan), Subtotal: '
            + goods[barcode].price * goods[barcode].count + ' (yuan)\n';


        total += goods[barcode].price * goods[barcode].count;
    }

    str += "----------------------\nTotal: " + total + " (yuan)\n**********************";
    console.log(str)
    return str;
}


module.exports = {
    printReceipt
};