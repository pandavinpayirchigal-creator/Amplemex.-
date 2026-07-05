const sliderList = document.querySelector(".slider-list");
const slides = document.querySelectorAll(".slide");
const previousButton = document.querySelector(".control-prev");
const nextButton = document.querySelector(".control-next");
const dotsContainer = document.querySelector(".slider-dots");

const productsGrid = document.querySelector("#productsGrid");
const searchInput = document.querySelector(".nav-search-input");
const productCount = document.querySelector("#productCount");

const openCartButton = document.querySelector("#openCart");
const closeCartButton = document.querySelector("#closeCart");
const cartPanel = document.querySelector("#cartPanel");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const toast = document.querySelector("#toast");
const checkoutButton = document.querySelector("#checkoutButton");

let currentSlide = 0;
let autoSlide;
let cart = JSON.parse(localStorage.getItem("amplemexCart")) || [];

const products = [
  ["Arduino Uno Clone", 300, "fa-microchip", "Arduino"],
  ["Perfboard (5x7cm)", 24, "fa-table-cells-large", "PCB"],
  ["Arduino Nano Clone", 180, "fa-microchip", "Arduino"],
  ["PCB (Single Side)", 18, "fa-table-cells-large", "PCB"],
  ["ESP32 Development Board", 480, "fa-wifi", "WiFi Board"],
  ["ESP8266 NodeMCU", 192, "fa-wifi", "WiFi Board"],
  ["Soldering Iron (25W)", 240, "fa-screwdriver-wrench", "Tools"],
  ["Solder Wire (10g)", 36, "fa-link", "Tools"],
  ["Raspberry Pi Pico", 240, "fa-microchip", "Raspberry Pi"],
  ["Desoldering Pump", 99, "fa-syringe", "Tools"],
  ["Raspberry Pi 4 Model B (4GB)", 3840, "fa-microchip", "Raspberry Pi"],
  ["Multimeter (Digital)", 300, "fa-gauge-high", "Tools"],
  ["HC-SR04 Ultrasonic Sensor", 72, "fa-satellite-dish", "Sensor"],
  ["Multimeter (Clamp Meter)", 1080, "fa-gauge-high", "Tools"],
  ["SG90 Servo Motor", 84, "fa-gear", "Motor"],
  ["Breadboard Power Supply Module", 30, "fa-bolt", "Power"],
  ["MG995 Servo Motor", 216, "fa-gear", "Motor"],
  ["Mini Drill Motor", 96, "fa-fan", "Motor"],
  ["L298N Motor Driver Module", 108, "fa-microchip", "Motor Driver"],
  ["Drill Chuck (0.3-4mm)", 30, "fa-screwdriver-wrench", "Tools"],
  ["TB6612FNG Motor Driver", 132, "fa-microchip", "Motor Driver"],
  ["Hot Glue Gun (Small)", 120, "fa-gun", "Tools"],
  ["L293D Motor Driver IC", 24, "fa-microchip", "Motor Driver"],
  ["Glue Stick (Set)", 24, "fa-grip-lines", "Tools"],
  ["HC-05 Bluetooth Module", 216, "fa-bluetooth", "Wireless"],
  ["Cutter Knife", 18, "fa-scissors", "Tools"],
  ["HC-06 Bluetooth Module", 180, "fa-bluetooth", "Wireless"],
  ["Screwdriver Set (Small)", 72, "fa-screwdriver", "Tools"],
  ["NRF24L01 Wireless Module", 132, "fa-tower-broadcast", "Wireless"],
  ["Plier", 72, "fa-screwdriver-wrench", "Tools"],
  ["Breadboard 400 Points", 60, "fa-table-cells-large", "Breadboard"],
  ["Double Sided Tape", 12, "fa-tape", "Tools"],
  ["Mini Breadboard (170 Points)", 30, "fa-table-cells-large", "Breadboard"],
  ["Insulation Tape", 12, "fa-tape", "Tools"],
  ["Jumper Wire Set (M-M)", 48, "fa-link", "Wires"],
  ["Velcro Strap (20cm)", 18, "fa-link", "Tools"],
  ["Jumper Wire Set (M-F)", 48, "fa-link", "Wires"],
  ["Zip Tie (Pack)", 18, "fa-link", "Tools"],
  ["Jumper Wire Set (F-F)", 48, "fa-link", "Wires"],
  ["3D Printer Filament (PLA 250g)", 360, "fa-cube", "3D Printing"],
  ["IR Obstacle Sensor Module", 48, "fa-eye", "Sensor"],
  ["IR Line Follower Sensor", 48, "fa-eye", "Sensor"],
  ["Rain Sensor Module", 60, "fa-cloud-rain", "Sensor"],
  ["Soil Moisture Sensor", 60, "fa-droplet", "Sensor"],
  ["Flame Sensor Module", 72, "fa-fire", "Sensor"],
  ["OLED Display 1.5 inch", 420, "fa-display", "Display"],
  ["Nextion Display 3.5 inch", 1080, "fa-display", "Display"],
  ["Raspberry Pi Camera Module", 960, "fa-camera", "Raspberry Pi"],
  ["Raspberry Pi NoIR Camera", 1080, "fa-camera", "Raspberry Pi"],
  ["Raspberry Pi Touch Display 7 inch", 3600, "fa-display", "Raspberry Pi"],
  ["Sound Sensor Module", 60, "fa-volume-high", "Sensor"],
  ["Arduino Mega 2560", 540, "fa-microchip", "Arduino"],
  ["Touch Sensor Module", 48, "fa-hand-pointer", "Sensor"],
  ["Arduino Due", 1440, "fa-microchip", "Arduino"],
  ["DHT11 Temperature & Humidity", 72, "fa-temperature-half", "Sensor"],
  ["Teensy 4.0", 2400, "fa-microchip", "Development Board"],
  ["DHT22 Temperature & Humidity", 180, "fa-temperature-half", "Sensor"],
  ["STM32 Blue Pill (F103C8T6)", 144, "fa-microchip", "Development Board"],
  ["MQ2 Gas Sensor", 108, "fa-smog", "Sensor"],
  ["STM32 Black Pill (F401CCU6)", 216, "fa-microchip", "Development Board"],
  ["MQ135 Air Quality Sensor", 144, "fa-smog", "Sensor"],
  ["SD Card Module", 36, "fa-sd-card", "Storage"],
  ["MQ7 CO Sensor", 132, "fa-smog", "Sensor"],
  ["Micro SD Card (16GB)", 180, "fa-sd-card", "Storage"],
  ["MQ3 Alcohol Sensor", 120, "fa-wine-glass", "Sensor"],
  ["Micro SD Card (32GB)", 300, "fa-sd-card", "Storage"],
  ["PIR Motion Sensor", 96, "fa-person-walking", "Sensor"],
  ["Micro SD Card (64GB)", 540, "fa-sd-card", "Storage"],
  ["16x2 LCD Display", 120, "fa-display", "Display"],
  ["RTC Module (DS3231)", 120, "fa-clock", "Module"],
  ["I2C LCD Module (PCF8574)", 60, "fa-display", "Module"],
  ["RTC Module (DS1307)", 72, "fa-clock", "Module"],
  ["OLED Display 0.96 inch", 120, "fa-display", "Display"],
  ["OLED Display 1.3 inch", 120, "fa-display", "Display"],
  ["7 Segment Display (1 Digit)", 24, "fa-display", "Display"],
  ["7 Segment Display (4 Digit)", 60, "fa-display", "Display"],
  ["Relay Module (2 Channel)", 96, "fa-toggle-on", "Module"],
  ["Relay Module (4 Channel)", 144, "fa-toggle-on", "Module"],
  ["Buzzer Module (Passive)", 36, "fa-volume-high", "Module"],
  ["Temperature Sensor (LM35)", 48, "fa-temperature-half", "Sensor"],
  ["Photo Interrupter Sensor", 48, "fa-eye", "Sensor"],
  ["Optocoupler (PC817)", 24, "fa-microchip", "Component"],
  ["Hall Effect Sensor (A3144)", 48, "fa-magnet", "Sensor"],
  ["Vibration Sensor", 48, "fa-wave-square", "Sensor"],
  ["Water Level Sensor", 48, "fa-water", "Sensor"],
  ["Float Switch", 60, "fa-water", "Sensor"],
  ["Magnetic Reed Switch", 36, "fa-magnet", "Sensor"],
  ["RGB LED Module", 48, "fa-lightbulb", "LED"],
  ["Limit Switch", 36, "fa-toggle-on", "Switch"],
  ["LED Pack (5mm) - 100 Pcs", 120, "fa-lightbulb", "LED"],
  ["Microphone Module", 60, "fa-microphone", "Module"],
  ["Resistor Kit (1/4W)", 120, "fa-bolt", "Component"],
  ["Voice Recognition Module", 132, "fa-microphone-lines", "Module"],
  ["Capacitor Kit - 100 Pcs", 144, "fa-bolt", "Component"],
  ["GPS Module (NEO-6M)", 300, "fa-location-dot", "Wireless"],
  ["Diode Kit - 100 Pcs", 120, "fa-bolt", "Component"],
  ["GSM Module (SIM800L)", 360, "fa-signal", "Wireless"],
  ["Transistor Kit - 50 Pcs", 120, "fa-microchip", "Component"],
  ["WiFi Module (ESP-01)", 84, "fa-wifi", "Wireless"],
  ["Push Button Pack (10 Pcs)", 60, "fa-circle-dot", "Switch"],
  ["LoRa Module (SX1278)", 216, "fa-tower-broadcast", "Wireless"],
  ["Tactile Switch (6x6x5mm)", 12, "fa-circle-dot", "Switch"],
  ["Transistor (BC547)", 10, "fa-microchip", "Component"],
  ["Slide Switch", 18, "fa-toggle-on", "Switch"],
  ["Toggle Switch", 24, "fa-toggle-on", "Switch"],
  ["MOSFET (IRFZ44N)", 36, "fa-microchip", "Component"],
  ["Rotary Encoder Module", 72, "fa-dial", "Module"],
  ["Solar Charge Controller (5A)", 300, "fa-solar-panel", "Power"],
  ["PVC Pipe Set (Small)", 96, "fa-pipe", "Mechanical"],
  ["Potentiometer (10K)", 24, "fa-sliders", "Component"],
  ["Wire (Single Core) - 1 Meter", 18, "fa-link", "Wires"],
  ["Potentiometer (50K)", 30, "fa-sliders", "Component"],
  ["Wire (Multi Core) - 1 Meter", 24, "fa-link", "Wires"],
  ["Shaft Coupling", 61, "fa-gear", "Mechanical"],
  ["Type-C USB Cable", 77, "fa-cable-car", "Cable"],
  ["Potentiometer (100K)", 36, "fa-sliders", "Component"],
  ["DC Motor (3V-6V)", 60, "fa-fan", "Motor"],
  ["BO Motor (100 RPM)", 72, "fa-gear", "Motor"],
  ["BO Motor (200 RPM)", 84, "fa-gear", "Motor"],
  ["Stepper Motor (28BYJ-48)", 120, "fa-gear", "Motor"],
  ["Servo Motor Metal Gear", 360, "fa-gear", "Motor"],
  ["Robot Wheel (Single)", 60, "fa-circle", "Robot Parts"],
  ["Robot Wheel (Pair)", 108, "fa-circle", "Robot Parts"],
  ["Robot Tyre (Pair)", 120, "fa-circle", "Robot Parts"],
  ["Robot Chassis (2 Wheel)", 240, "fa-robot", "Robot Parts"],
  ["Robot Chassis (4 Wheel)", 420, "fa-robot", "Robot Parts"],
  ["Caster Wheel", 48, "fa-circle", "Robot Parts"],
  ["DC Motor Gearbox", 180, "fa-gear", "Mechanical"],
  ["Plastic Gear Set", 120, "fa-gear", "Mechanical"],
  ["Timing Belt (1 Meter)", 72, "fa-link", "Mechanical"],
  ["Timing Pulley (20 Teeth)", 84, "fa-gear", "Mechanical"],
  ["Aluminum Angle Set", 180, "fa-ruler-combined", "Mechanical"],
  ["Acrylic Sheet (Small)", 96, "fa-square", "Material"],
  ["L Bracket (Metal)", 48, "fa-ruler-combined", "Mechanical"],
  ["Nylon Spacer (M3-10 Pcs)", 36, "fa-circle", "Hardware"],
  ["Screw Set (M3)", 72, "fa-screwdriver", "Hardware"],
  ["Nut & Bolt Set", 96, "fa-screwdriver", "Hardware"],
  ["DC Power Jack (Female)", 24, "fa-plug", "Power"],
  ["Micro USB Cable", 60, "fa-cable-car", "Cable"],
  ["USB to TTL Module (CH340)", 96, "fa-usb", "Module"],
  ["Heat Shrink Tube Set", 120, "fa-tape", "Tools"],
  ["Soldering Iron (60W)", 241, "fa-screwdriver-wrench", "Tools"],
  ["Solder Wire (100g)", 240, "fa-link", "Tools"],
  ["Desoldering Wick", 60, "fa-link", "Tools"],
  ["Helping Hands with Magnifier", 180, "fa-magnifying-glass", "Tools"],
  ["Breadboard (830 Tie Points)", 120, "fa-table-cells-large", "Breadboard"],
  ["Mini Fan 5V (40mm)", 96, "fa-fan", "Motor"],
  ["Drill Chuck (0.3-3mm)", 84, "fa-screwdriver-wrench", "Tools"],
  ["Hot Glue Gun (Large)", 216, "fa-gun", "Tools"],
  ["Acrylic Sheet (Large)", 240, "fa-square", "Material"],
  ["I Bracket (Metal)", 60, "fa-ruler-combined", "Mechanical"],
  ["M3x6 Screw (Pack of 50)", 72, "fa-screwdriver", "Hardware"],
  ["M3 Nut (Pack of 50)", 60, "fa-circle", "Hardware"],
  ["M3 Washer (Pack of 50)", 48, "fa-circle", "Hardware"],
  ["Tool Kit (Basic)", 600, "fa-toolbox", "Tools"],
  ["Storage Box (Small)", 120, "fa-box", "Storage"],
  ["Storage Box (Large)", 240, "fa-box", "Storage"],
  ["Sensor Kit (10 in 1)", 300, "fa-microchip", "Kit"],
  ["Robot Kit (2 Wheel)", 720, "fa-robot", "Kit"],
  ["Robot Kit (4 Wheel)", 1200, "fa-robot", "Kit"],
  ["Line Follower Robot Kit", 960, "fa-robot", "Kit"],
  ["Obstacle Avoider Robot Kit", 1080, "fa-robot", "Kit"],
  ["Robotic Arm Kit", 1200, "fa-robot", "Kit"],
  ["CNC Shield V3", 480, "fa-microchip", "CNC"],
  ["A4988 Stepper Driver", 96, "fa-microchip", "CNC"],
  ["CNC 3018 Pro MAX", 5600, "fa-screwdriver-wrench", "CNC"],
  ["FTDI USB to TTL (5V)", 120, "fa-usb", "Module"],
  ["9V Battery with Connector", 90, "fa-battery-half", "Power"],
  ["AA Battery Holder (4 Cell)", 48, "fa-battery-half", "Power"],
  ["Heat Sink (Small)", 24, "fa-temperature-arrow-down", "Cooling"],
  ["Heat Sink (Medium)", 48, "fa-temperature-arrow-down", "Cooling"],
  ["12V Power Supply (2A)", 240, "fa-plug", "Power"],
  ["12V Power Supply (5A)", 600, "fa-plug", "Power"],
  ["12V Power Supply (10A)", 1200, "fa-plug", "Power"],
  ["Lithium Battery (3.7V 18650)", 180, "fa-battery-full", "Power"],
  ["Battery Charger (TP4056)", 48, "fa-battery-three-quarters", "Power"],
  ["Dupont Connector Set", 95, "fa-link", "Connector"],
  ["Heatsink + Fan (For Raspberry Pi)", 240, "fa-fan", "Cooling"],
  ["JST Connector Set", 96, "fa-link", "Connector"],
  ["Male Header Pin (Single Row)", 24, "fa-grip-lines", "Connector"],
  ["Buck Converter (LM2596)", 96, "fa-bolt", "Power"],
  ["Boost Converter (MT3608)", 84, "fa-bolt", "Power"],
  ["DC-DC Step Down Module", 96, "fa-bolt", "Power"],
  ["DC-DC Step Up Module", 96, "fa-bolt", "Power"],
  ["Female Header Pin (Single Row)", 24, "fa-grip-lines", "Connector"],
  ["Male Header Pin (Double Row)", 36, "fa-grip-lines", "Connector"],
  ["Female Header Pin (Double Row)", 36, "fa-grip-lines", "Connector"],
  ["XL4015 Step Down Module", 120, "fa-bolt", "Power"],
  ["Digital Voltmeter", 194, "fa-gauge-high", "Tools"],
  ["Ammeter (0-10A)", 194, "fa-gauge-high", "Tools"],
  ["Panel Mount Switch", 60, "fa-toggle-on", "Switch"],
  ["Panel Mount Indicator LED", 48, "fa-lightbulb", "LED"]
].map(([name, price, icon, category], index) => ({
  id: index + 1,
  name,
  price,
  icon,
  category
}));

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function renderProducts(list) {
  productsGrid.innerHTML = "";

  if (!list.length) {
    productsGrid.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-box-open"></i>
        <p>No products found. Try another search.</p>
      </div>
    `;
    productCount.textContent = "0 products found";
    return;
  }

  productCount.textContent = `${list.length} products available`;

  list.forEach((product) => {
    productsGrid.innerHTML += `
      <article class="product-card">
        <div class="product-icon">
          <i class="fa-solid ${product.icon}"></i>
        </div>
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <p class="product-price">${formatPrice(product.price)}</p>
          <button class="add-cart-btn" data-id="${product.id}">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </article>
    `;
  });

  document.querySelectorAll(".add-cart-btn").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${selectedProduct.name} added to cart`);
}

function renderCart() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <div class="cart-item-icon">
          <i class="fa-solid ${item.icon}"></i>
        </div>

        <div>
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)}</p>

          <div class="quantity-box">
            <button onclick="changeQuantity(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
        </div>

        <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove item">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
    )
    .join("");
}

function changeQuantity(productId, amount) {
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("amplemexCart", JSON.stringify(cart));
}

function openCart() {
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
    );
  });

  renderProducts(filteredProducts);
});

openCartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", () => {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }

  showToast("Checkout feature will be added next!");
});

/* Slider */

slides.forEach((_, index) => {
  const dot = document.createElement("button");

  dot.classList.add("dot");
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
    showSlide(index);
    restartAutoSlide();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  currentSlide = index;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  sliderList.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  restartAutoSlide();
});

previousButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  restartAutoSlide();
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

renderProducts(products);
renderCart();
startAutoSlide();
