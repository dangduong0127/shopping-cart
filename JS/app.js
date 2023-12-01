const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

let prs = document.getElementById("products");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  for (let key in ShopItemsData) {
    let search = basket.find((x) => x.ID == ShopItemsData[key].id) || [];
    prs.innerHTML += `
    <div id="product-id-${ShopItemsData[key].id}" class="single-product">
    <img src="${ShopItemsData[key].image}">
    <div class="pr-content">
        <h5 class="product-name">${ShopItemsData[key].name}</h5>
        <h6><b>Price:</b>${VND.format(ShopItemsData[key].price)}</h6>
        <div class="buttons">
          <i onclick="decrement(${
            ShopItemsData[key].id
          })" class="fa-solid fa-minus"></i>
          <div id=${ShopItemsData[key].id} class="quantity">${
      search.item === undefined ? 0 : search.item
    }</div>
          <i onclick="increment(${
            ShopItemsData[key].id
          })" class="fa-solid fa-plus"></i>
        </div>
        <button onclick="increment(${
          ShopItemsData[key].id
        })">Thêm vào giỏ hàng</button>
    </div>
  </div>
  `;
  }
};

generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
  update(id);
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
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
//Quanty update
let update = (id) => {
  let search = basket.find((x) => x.ID === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  Calculation();
};

let Calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  let S = 0;
  for (let i in basket) {
    S += basket[i].item;
  }
  cartIcon.innerHTML = S;
};

Calculation();
