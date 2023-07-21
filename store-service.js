const fs = require("fs");
const path = require("path");

let items = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "./data/items.json"),
      "utf8",
      (err, data) => {
        if (err) {
          reject("Unable to read items.json file");
        } else {
          items = JSON.parse(data);

          fs.readFile(
            path.join(__dirname, "./data/categories.json"),
            "utf8",
            (err, data) => {
              if (err) {
                reject("Unable to read categories.json file");
              } else {
                categories = JSON.parse(data);
                resolve();
              }
            }
          );
        }
      }
    );
  });
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      reject("No items found");
    } else {
      resolve(items);
    }
  });
}

function getPublishedItems() {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter((item) => item.published === true);
    if (publishedItems.length === 0) {
      reject("No published items found");
    } else {
      resolve(publishedItems);
    }
  });
}

function getAllCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject("No categories found");
    } else {
      resolve(categories);
    }
  });
}

function addItem(itemData) {
  return new Promise((resolve, reject) => {
    if (!itemData) {
      reject("No item data provided");
    } else {
      if (itemData.published == undefined) {
        itemData.published = false;
      } else {
        itemData.published = true;
      }
      itemData.id = items.length + 1;
      itemData.postDate = new Date().toISOString().slice(0,10); 
      items.push(itemData);
      resolve(itemData);
    }
  });
}

function getItemsByCategory(category) {
  return new Promise((resolve, reject) => {
    const filteredItems = items.filter((item) => item.category == category);
    if (filteredItems.length === 0) {
      reject("No items found for this category");
    } else {
      resolve(filteredItems);
    }
  });
}

function getItemsByMinDate(minDateStr) {
  return new Promise((resolve, reject) => {
    const minDate = new Date(minDateStr);
    const filteredItems = items.filter(
      (item) => new Date(item.postDate) >= minDate
    );
    if (filteredItems.length === 0) {
      reject("No items found for this date");
    } else {
      resolve(filteredItems);
    }
  });
}

function getItemById(id) {
  return new Promise((resolve, reject) => {
    const item = items.find((item) => item.id == id);
    if (!item) {
      reject("No item found with this id");
    } else {
      resolve(item);
    }
  });
}
function getPublishedItemsByCategory(category) {
  return new Promise((resolve, reject) => {
    try {
      let filteredItems = items.filter(
        (item) => item.published === true && item.category == category
      );
      resolve(filteredItems);
    } catch (err) {
      reject(err);
    }
  });
}
module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getAllCategories,
  addItem,
  getItemsByCategory,
  getItemsByMinDate,
  getItemById,
  getPublishedItemsByCategory,
};
