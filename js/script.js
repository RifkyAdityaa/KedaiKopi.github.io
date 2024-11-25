// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen untuk menutup menu
document.addEventListener('click', function (e) {
  if (!navbarNav.contains(e.target) && !e.target.closest('#hamburger-menu')) {
    navbarNav.classList.remove('active');
  }
  if (!searchForm.contains(e.target) && !e.target.closest('#search-button')) {
    searchForm.classList.remove('active');
  }
  if (!shoppingCart.contains(e.target) && !e.target.closest('#shopping-cart-button')) {
    shoppingCart.classList.remove('active');
  }
});

// Data produk
const products = [
  { id: 1, name: "Espresso", price: 15000, image: "./img/menu/1.jpg", description: "Lorem ipsum dolor sit amet" , quantity : 0},
  { id: 2, name: "Cappuccino", price: 25000, image: "./img/menu/1.jpg", description: "Rich and creamy taste" , quantity : 0},
  { id: 3, name: "Latte", price: 20000, image: "./img/menu/1.jpg", description: "Smooth and delicious" , quantity : 0},
  { id: 4, name: "Capuccino", price: 25000, image: "./img/menu/1.jpg", description: "Perfectly blended" , quantity : 0},
  { id: 5, name: "Robusta", price: 20000, image: "./img/menu/1.jpg", description: "Strong and bold flavor" , quantity : 0},
  { id: 6, name: "Kapal Api", price: 20000, image: "./img/menu/1.jpg", description: "A classic favorite" , quantity : 0},
];

// Format harga ke IDR
function formatPrice(price) {
  return `IDR ${price.toLocaleString('id-ID')}`;
}

// Array untuk menyimpan produk di keranjang

let cartItems = []; // Array untuk menyimpan produk yang masuk ke cart
const banyakCart = document.querySelector('#total-belanja'); // Elemen untuk menampilkan total belanja


// Menampilkan produk
function displayProducts(data) {
  const productsRow = document.querySelector(".products .row");
  productsRow.innerHTML = ""; // Kosongkan isi elemen sebelum menambahkan produk baru

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
    <div class="product-image">
    <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-content">
    <h3>${product.name}</h3>
    <div class="product-price">${formatPrice(product.price)}</div>
    </div>
    <br>
    <div class="product-icons">
      <button type="button" class="btn-card" data-id="${product.id}"><i data-feather="shopping-cart"></i></button>
    </div>
    `;

    productsRow.appendChild(productCard);
  });

  feather.replace();
  setupCartEvents(data);
}




// Menampilkan produk
function displayProductsMenu(data) {
  const productsRow = document.querySelector("#menu-container");
  productsRow.innerHTML = ""; // Kosongkan isi elemen sebelum menambahkan produk baru

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "row";

    productCard.innerHTML = `
       <div class="menu-card">
        <img src="${product.image}" alt="${product.name}" class="menu-card-img">
        <h3 class="menu-card-title">- ${product.name} -</h3>
        <p class="menu-card-price">IDR ${product.price}K</p>
      </div>
    `;

    productsRow.appendChild(productCard);
  });

  feather.replace();
  setupCartEvents(data);
}

// Tambahkan produk ke keranjang
function setupCartEvents(data) {
  document.querySelectorAll(".btn-card").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      const product = data.find((item) => item.id === productId);

      if (!product) return;

      const existingProduct = cartItems.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1; // Tambahkan quantity jika produk sudah ada
      } else {
        cartItems.push({ ...product, quantity: 1 }); // Tambahkan produk baru ke keranjang
      }

      displayCartItems();
    });
  });
}

// Tampilkan isi keranjang
function displayCartItems() {
  const containerCard = document.querySelector('.shopping-cart');
  const totalPriceElement = document.createElement("div");
  let totalPrice = 0;

  if (cartItems.length === 0) {
    containerCard.innerHTML = "<p>Belum ada barang di keranjang</p>";
    banyakCart.style.display = "none"
    return;
  }

  const totalcard = cartItems.length

  banyakCart.innerHTML = totalcard

  containerCard.innerHTML = ""; // Kosongkan isi elemen keranjang

  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;

    const productCard = document.createElement("div");
    productCard.className = "cart-item";
    productCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-detail">
        <h3>${item.name}</h3>
        <div class="item-price">${formatPrice(item.price)} x ${item.quantity}</div>
        <div class="item-quantity">
          <button class="decrease-qty" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-qty" data-id="${item.id}">+</button>
        </div>
      </div>
      <i data-feather="trash-2" class="remove-item" data-id="${item.id}"></i>
    `;

    containerCard.appendChild(productCard);
  });

  // Total harga
  totalPriceElement.className = "total-price";
  totalPriceElement.innerHTML = `
    <h3><center>Total: ${formatPrice(totalPrice)}<center/></h3>
  `;
  containerCard.appendChild(totalPriceElement);

  // Form pengiriman
  const form = document.createElement("div");
  form.className = "checkout-form";
  form.innerHTML = `
    <h3>Data Pemesanan</h3>
    <form id="order-form">
      <input type="text" id="customer-name" placeholder="Nama Anda" required>
      <input type="text" id="customer-phone" placeholder="Nomor Telepon" required>
      <textarea id="customer-address" placeholder="Alamat Anda" required></textarea>
      <button type="button" id="whatsapp-button">Pesan via WhatsApp</button>
    </form>
  `;
  containerCard.appendChild(form);

  feather.replace();
  setupQuantityButtons();
  setupRemoveButtons();
  setupWhatsAppButton(totalPrice);
}

// Atur tombol tambah dan kurangi quantity
function setupQuantityButtons() {
  document.querySelectorAll(".increase-qty").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      const product = cartItems.find((item) => item.id === productId);

      if (product) {
        product.quantity += 1;
        displayCartItems();
      }
    });
  });

  document.querySelectorAll(".decrease-qty").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      const product = cartItems.find((item) => item.id === productId);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
        displayCartItems();
      } else if (product && product.quantity === 1) {
        cartItems = cartItems.filter((item) => item.id !== productId);
        displayCartItems();
      }
    });
  });
}

// Atur tombol hapus produk
function setupRemoveButtons() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      cartItems = cartItems.filter((item) => item.id !== productId);
      displayCartItems();
    });
  });
}

// Atur tombol WhatsApp
function setupWhatsAppButton(totalPrice) {
  const whatsappButton = document.querySelector("#whatsapp-button");
  whatsappButton.addEventListener("click", () => {
    const name = document.querySelector("#customer-name").value;
    const phone = document.querySelector("#customer-phone").value;
    const address = document.querySelector("#customer-address").value;

    if (!name || !phone || !address) {
      alert("Harap lengkapi data Anda!");
      return;
    }

    const orderDetails = cartItems.map(
      (item) => `${item.name} x${item.quantity} (${formatPrice(item.price)})`
    ).join("\n");

    const message = `Halo, saya ${name}.\n\nSaya ingin memesan:\n${orderDetails}\n\nTotal Harga: ${formatPrice(totalPrice)}\n\nAlamat: ${address}\n\nNomor Telepon: ${phone}`;
    const whatsappURL = `https://wa.me/6289621276211?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  });
}

document.querySelector('.btn-pesan-kirim').addEventListener('click', function (e) {
  e.preventDefault(); // Mencegah form mengirim data secara normal

  // Mengambil nilai dari input form
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const pesan = document.getElementById('pesan').value;

  // Membuat pesan yang akan dikirim ke WhatsApp
  const message = `Halo, saya ${name}, dengan email ${email}. Punya pesan :
   ${pesan}.`;

  // URL WhatsApp API dengan nomor dan pesan
  const waUrl = `https://wa.me/6289621276211?text=${encodeURIComponent(message)}`;

  // Arahkan pengguna ke WhatsApp
  window.open(waUrl, '_blank');
});


// Panggil fungsi untuk menampilkan produk
displayProducts(products);
displayProductsMenu(products)