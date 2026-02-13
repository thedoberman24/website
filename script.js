const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const sizeField = document.getElementById('size');
const finishField = document.getElementById('finish');
const quantityField = document.getElementById('quantity');
const price = document.getElementById('price');
const form = document.getElementById('orderForm');
const message = document.getElementById('message');

const sizePrices = {
  small: 12,
  medium: 20,
  large: 32,
};

function calculateTotal() {
  const sizePrice = sizePrices[sizeField.value] ?? 0;
  const finishUpcharge = finishField.value === 'glossy' ? 3 : 0;
  const quantity = Number(quantityField.value) || 1;
  const total = (sizePrice + finishUpcharge) * quantity;
  price.textContent = `Total: $${total.toFixed(2)}`;
}

imageUpload.addEventListener('change', () => {
  const [file] = imageUpload.files || [];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    message.textContent = 'That file is not giving poster energy. Please upload an image.';
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    imagePreview.src = event.target?.result;
    message.textContent = 'Image loaded. Your poster is looking iconic ✨';
  };
  reader.readAsDataURL(file);
});

[sizeField, finishField, quantityField].forEach((field) => {
  field.addEventListener('input', calculateTotal);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!imageUpload.files?.length) {
    message.textContent = 'Upload your image first so we can craft your aesthetic print.';
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const quantity = Number(quantityField.value) || 1;

  message.textContent = `You ate that, ${name}. Order confirmed for ${quantity} poster(s). Receipt + tracking vibes are heading to ${email}.`;
  form.reset();
  imagePreview.src = 'https://placehold.co/800x1000/1b1630/f2ddca?text=Your+Moody+Poster';
  calculateTotal();
});

calculateTotal();
