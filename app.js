// const logout = document.getElementById("logout");
// logout.addEventListener("click", function () {
//   event.preventDefault();
//   localStorage.removeItem("loggedInUser");
//   window.location = "index.html";
// });
let prs = document.getElementById("products");
const ShopItemsData = [
  {
    id: "1",
    name: "MATRIX 1999 DECK",
    price: "780.000đ - 1.470.000đ",
    image: "img/matrix-1999-1.jpg",
  },

  {
    id: "2",
    name: "RAEDA DECK",
    price: "780.000đ - 1.470.000đ",
    image: "img/Raeda-Deck.jpg",
  },

  {
    id: "3",
    name: "MUSTY DECK",
    price: "780.000đ - 1.470.000đ",
    image: "img/Musty-Deck.jpg",
  },

  {
    id: "4",
    name: "TRISTIQUE DECK",
    price: "780.000đ - 1.470.000đ",
    image: "img/Tristique-deck.jpg",
  },

  {
    id: "5",
    name: "FIELD TRIP DECK",
    price: "780.000đ - 1.470.000đ",
    image: "img/Fied-Trip-deck.jpg",
  },

  {
    id: "6",
    name: "TARO RAINBOW LOGO DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/web-5.jpg",
  },

  {
    id: "7",
    name: "NEON RAINBOW LOGO DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/web-1.jpg",
  },

  {
    id: "8",
    name: "ORANAGE RAINBOW LOGO DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/web-2.jpg",
  },

  {
    id: "9",
    name: "BLUE RAINBOW LOGO DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/web-3.jpg",
  },

  {
    id: "10",
    name: "WHITE RAINBOW LOGO DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/web-4.jpg",
  },

  {
    id: "11",
    name: "CUTIS MODEL DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/cutis.jpg",
  },

  {
    id: "12",
    name: "CAM VU MODEL DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/cam-vu.jpg",
  },

  {
    id: "13",
    name: "SON NGUYEN MODEL DECK",
    price: "780.000đ - 1.670.000đ",
    image: "img/son-nguyen.jpg",
  },
];
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  for (let key in ShopItemsData) {
    let search = basket.find((x) => x.ID == ShopItemsData[key].id) || [];
    prs.innerHTML += `
    <div id="product-id-${ShopItemsData[key].id}" class="single-product">
    <img src="${ShopItemsData[key].image}">
    <div class="pr-content">
        <h5 class="product-name">${ShopItemsData[key].name}</h5>
        <h6><b>Price:</b>${ShopItemsData[key].price}</h6>
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
