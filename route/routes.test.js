process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakedb");

let item = { name: 'zoro', price: 1000 };

beforeEach(function () {
   items.push(item);
});

afterEach(function () {
    items = [];
});



describe("GET /items", () => {
    test("Get all itemss", async () => {
        const res = await request(app).get(`/items`);
        const { items } = res.body;
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items })
    })
});

describe("GET /items/:name", () => {
    test("Get a specific item", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.item).toEqual( item )
    })
});

describe("POST /items", () => {
    test("create an Item", async () => {
        const res = await request(app).post("/items").send({ name: 'luffy', price: 500000 })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: { name: "luffy",price:500000 } })
    })
});

describe("/PATCH /items/:name", () => {
    test("Updating an items name", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({ name: "Monster" });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual( { name: "Monster" });
    })
});
  
describe("/DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ msg: 'Item Deleted!' })
    })
});
  
