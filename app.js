const baseUrl = "http://localhost:3000/";
const token = localStorage.getItem("jwt-token");

//-------------------------PRODUCT-------------------------
async function listProduct() {
  if (!token) {
    alert("token tidak valid");
  }
  try {
    const product = await fetch(baseUrl + "getProduct", {
      headers: {
        token: token,
      },
    });
    const result = await product.json();
    console.log(result.user_data_id)
    const containerProduct = document.getElementById("containerProduct");
    result.product_data.map((snapProduct) => {
      const card = document.createElement("div");
      card.className = "card mx-13";
      card.style.width = "18rem";
      card.id = snapProduct.product_id;

      const image = document.createElement("img");
      image.src = "";
      image.className = "card-img-top";
      card.alt = "...";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      const titleLink = document.createElement("a");
      titleLink.textContent = snapProduct.product_name;
      title.appendChild(titleLink);
      cardBody.appendChild(title);

      const price = document.createElement("h5");
      price.textContent = " Rp." + snapProduct.product_price;
      cardBody.appendChild(price);

      const addToCartBtn = document.createElement("a");
      addToCartBtn.href = "#";
      addToCartBtn.className = "btn btn-success";
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.onclick = function () {
        addCart(snapProduct.product_id);
      };
      cardBody.appendChild(addToCartBtn);

      card.appendChild(cardBody);
      containerProduct.appendChild(card);
    });
    // const cartButton = document.getElementById("cartButton")
    // const addToCartBtn = document.createElement("a");
    //   addToCartBtn.href = "#";
    //   addToCartBtn.className = "btn btn-success";
    //   addToCartBtn.textContent = "go to cart";
    //   addToCartBtn.onclick = function () {
    //     getCart(result.user_data_id);
    //   };
    //   cartButton.appendChild(addToCartBtn);
  } catch (error) {
    console.log(error);
  }
}

async function addCart(productId) {
  const response = await fetch(baseUrl + "addCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token :token
    },
    body: JSON.stringify({
      product_id: productId
    }),
  });
  alert("berhasil menambahkan produk");
}
//-------------------------PRODUCT-------------------------

//-------------------------TOKEN-------------------------

async function validateToken() {
  try {

    if (!token) {
      throw new Error('token tidak ada')
    }
    
    const validating = await fetch(baseUrl + "getInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const result = await validating.json();
    if(!result.success){
      throw new Error(result.message)
    }

  } catch (err){
    alert(err.message)
    window.location.href = "login.html";
  }
}

//-------------------------TOKEN-------------------------

//-------------------------CART-------------------------
async function getCart() {
  try {
    const response = await fetch(baseUrl + "getCart", {
      headers: {
        "Content-Type": "application/json",
        token: token
      },
    });

    const cartContainer = document.getElementById("cartContainer")
    const result = await response.json();
    console.log(result.data)
    result.data.map((dataProduct) => {
      const card = document.createElement("div");
      card.className = "card mx-13";
      card.style.width = "18rem";
      card.id = dataProduct.product_id;

      const image = document.createElement("img");
      image.src = "";
      image.className = "card-img-top";
      card.alt = "...";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      const titleLink = document.createElement("a");
      titleLink.textContent = dataProduct.product_name;
      title.appendChild(titleLink);
      cardBody.appendChild(title);

      const price = document.createElement("h5");
      price.textContent = " Rp." + dataProduct.product_price;
      cardBody.appendChild(price);

      card.appendChild(cardBody);
      cartContainer.appendChild(card);
    })
  }
  catch(error){
    console.log(error)
  }
}
//-------------------------CART-------------------------

//-------------------------TEST-------------------------
const data = {
  product_data: [
    {
      product_id: 1,
      product_name: "Indomie",
      product_price: "3500",
      product_image: null,
    },
    {
      product_id: 2,
      product_name: "Mie Sedap",
      product_price: "4000",
      product_image: null,
    },
  ],
};
function test() {
  console.log(token)
  const container = document.querySelector(
    ".d-flex.justify-content-center.flex-wrap.m-auto.w-80"
  );

  data.product_data.forEach(function (product) {
    const card = document.createElement("div");
    card.className = "card mx-3";
    card.style.width = "18rem";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    const titleLink = document.createElement("a");
    titleLink.textContent = product.product_name;
    title.appendChild(titleLink);
    cardBody.appendChild(title);

    const price = document.createElement("p");
    price.textContent = "Price: Rp." + product.product_price;
    cardBody.appendChild(price);

    const addToCartBtn = document.createElement("a");
    addToCartBtn.href = "#";
    addToCartBtn.className = "btn btn-success";
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.onclick = function () {
      addCart(product.product_name, product.product_price);
    };
    cardBody.appendChild(addToCartBtn);

    card.appendChild(cardBody);
    container.appendChild(card);
  });
}
//-------------------------TEST-------------------------
