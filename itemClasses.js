
const items = require("./fakedb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this)
    }

    static getAll() {
        return items;
    }
    static find(name) {
        const specificItem = items.find((item) => item.name === name);
        return specificItem;
    }
    static update(name, data) {
        const specificItem = items.find((item) => item.name === name);
        specificItem.name = data.name;
        specificItem.price = data.price;
        return specificItem;
    }
    static delete(name) {
        for (let i = 0; i < items.length; i++){
            if (items[i].name === name) {
                items.splice(i, 1);
            }
            return items;
        }
    }
}

module.exports = Item;