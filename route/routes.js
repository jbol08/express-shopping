const express = require("express")
const Item = require("../itemClasses")
const router = express.Router()




router.get("", function (req, res, next) {
  try {
    return res.json({ items: Item.getAll() });
  } catch (error) {
    return next(error)
  }
});

router.post("", function (req, res, next) {
  try {
    //adding new item
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (error) {
    return next(error)
  }
});

router.get('/:name', function (req, res, next) {
  try {
    //finding a specific item
    let specificItem = Item.find(req.params.name);
    return res.json({ item: specificItem });
  } catch (error) {
    return next(error)
  }
});

router.patch("/:name", function (req, res, next) {
  try {
    //update a specific item
    let specificItem = Item.update(req.params.name, req.body);
    return res.json({ item: specificItem });
  } catch (error) {
    return next(error)
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    //delete specific item
    Item.delete(req.params.name);
    return res.json({ msg: "Item Deleted!" })
  } catch (error) {
    return next(error)
  }
});

module.exports = router;