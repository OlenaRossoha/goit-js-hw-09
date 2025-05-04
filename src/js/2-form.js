const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 1. Ініціалізуємо об'єкт formData
let formData = {
  email: '',
  message: ''
};

// 2. Завантаження збережених даних при старті
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (form.elements.email) form.elements.email.value = formData.email || '';
    if (form.elements.message) form.elements.message.value = formData.message || '';
  } catch (error) {
    console.error('Invalid saved data', error);
  }
}

// 3. Обробник події input
form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 4. Обробник події submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});