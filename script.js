const cartContainer = document.getElementById("cart-container"); // used to contain all the items in the cart.
const productsContainer = document.getElementById("products-container"); // consists of the products in the cart
const dessertCards = document.getElementById("dessert-card-container"); //consists of the items that can be purchased.
const cartBtn = document.getElementById("cart-btn"); //cart button
const clearCartBtn = document.getElementById("clear-cart-btn"); // used to clear the items present in cart.
const totalNumberOfItems = document.getElementById("total-items"); // displays the total no. of items added to the cart.
const cartSubTotal = document.getElementById("subtotal"); //displays the total money required to be paid without taxes.
const cartTaxes = document.getElementById("taxes"); // displays the taxes to be paid.
const cartTotal = document.getElementById("total"); //displays the total money required to be paid with taxes.
const showHideCartSpan = document.getElementById("show-hide-cart"); //used to show and hide cart button.
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

/*This is done to display the desserts available to the customer. This is also consists of add-to-cart button which could be used to  add the required dessert.*/
products.forEach(({ name, id, price, category }) => {
  dessertCards.innerHTML += `    
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
});

class ShoppingCart {
  //class declaration
  constructor() {
    this.items = []; //used to store items that have been addaed to the cart.
    this.total = 0; //used to store the totalamount to be paid.
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id); // if the products matches eith the same id then name and price are stored.
    const { name, price } = product;
    // the name and price of product are stored with the same name i.e., to name and price using destructuring assignment.
    this.items.push(product);
    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
      //if totalCountPerProduct[dessert.id] is not present then it is created with the value 0 and incremented by 1.
    });

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    );

    //if the count is greater then the one will be displayed with x and if it is equal to one then it will be displayed as '1'.
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `);
    //for the first alone the name has to be printed.
  }

  getCounts() {
    //used to fetch total no. of items in the cart.
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      // this is for the case when the cart is already empty.
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      // if the user confirms by clicking "ok" then the value is stored as "true".
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      // the values are replaed by initial values.
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2)); //toFixed() is used to specify the no. of decimal points.
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0); //the prices are added using reduce.
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    //the cart elements are updated and displayed to the user.
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
}

const cart = new ShoppingCart(); //creating an instance of the class.
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));

/*Key learnings:
1)In JavaScript, a class is like a blueprint for creating objects. It allows you to define a set of properties and methods, and instantiate (or create) new objects with those properties and methods.The class keyword is used to declare a class.
example:
class Computer {};

2)Classes have a special constructor method, which is called when a new instance of the class is created. The constructor method is a great place to initialize properties of the class.

3)The this keyword in JavaScript is used to refer to the current object. Depending on where this is used, what it references changes. In the case of a class, it refers to the instance of the object being constructed.
example:
class Computer {
  constructor() {
    this.ram = 16;
  }
}

4)The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

5)The toFixed() method of Number values returns a string representing this number using fixed-point notation with the specified number of decimal places.

*/
