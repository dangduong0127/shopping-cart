let total = document.getElementById("total");
let ShoppingCart = document.getElementById("Shopping-Cart");
let max = document.getElementById("max");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

let Calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  let S = 0;
  for (let i in basket) {
    S += basket[i].item;
  }
  cartIcon.innerHTML = S;
};

Calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = null;
    for (let key in basket) {
      for (let i in ShopItemsData) {
        if (ShopItemsData[i].id == basket[key].ID) {
          let search = basket.find((x) => x.ID == ShopItemsData[i].id) || [];
          ShoppingCart.innerHTML += `
          <div class="single-prs-bill">
            <div id="product-id-${ShopItemsData[i].id}" class="single-product">
            <img src="${ShopItemsData[i].image}">
            <div class="pr-content">
                <h5 class="product-name">${ShopItemsData[i].name}<span>(x${
            basket[key].item
          })</span></h5>
                
                <h5>${VND.format(
                  basket[key].item * ShopItemsData[i].price
                )}</h5>
                <div class="buttons">
                  <i onclick="decrement(${
                    ShopItemsData[i].id
                  })" class="fa-solid fa-minus"></i>
                  <div id=${ShopItemsData[i].id} class="quantity">${
            search.item === undefined ? 0 : search.item
          }</div>
                  <i onclick="increment(${
                    ShopItemsData[i].id
                  })" class="fa-solid fa-plus"></i>
                </div>
                <div class="Delete">
                <i class="fa-solid fa-x"></i>
                  <p onclick="removeItems(${ShopItemsData[i].id})">Delete</p>
                </div>
            </div>
          </div>
          </div>
          `;
        }
      }
    }
  } else {
    ShoppingCart.innerHTML = null;
    total.innerHTML = `
      <h1>Cart is empty</h1>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
    `;
  }
};
generateCartItems();

//tang so luong
let increment = (id) => {
  let search = basket.find((x) => x.ID === id);
  if (search === undefined) {
    basket.push({
      ID: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  totalAmount();
  update(id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
//giam so luong
let decrement = (id) => {
  let search = basket.find((x) => x.ID === id);
  if (search === undefined) return;
  if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  totalAmount();
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
//Quanty update
let update = (id) => {
  let search = basket.find((x) => x.ID === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  Calculation();
};

let removeItems = (id) => {
  basket = basket.filter((x) => x.ID !== id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  totalAmount();
  Calculation();
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = 0;
    for (let i in basket) {
      let search = ShopItemsData.find((x) => x.id == basket[i].ID) || [];
      if (basket[i].ID == search.id) {
        amount += basket[i].item * search.price;
      }
    }
    max.innerHTML = `${VND.format(amount)}`;
  } else {
    return;
  }
};
totalAmount();

let ClearAllPr = () => {
  basket = [];
  totalAmount();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  Calculation();
};
