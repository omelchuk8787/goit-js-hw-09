let formData = { email: '', message: '' };

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.feedback-form');

  const lsData = getFromLS('feedback-form-state', { email: '', message: '' });

  if (lsData && typeof lsData === 'object') {
    formData.email = lsData.email;
    formData.message = lsData.message;
  }

  formElem.elements.email.value = formData.email;
  formElem.elements.message.value = formData.message;

  formElem.addEventListener('input', e => {
    formData.email = formElem.elements.email.value.trim();
    formData.message = formElem.elements.message.value.trim();
    saveToLS('feedback-form-state', formData);
  });

  formElem.addEventListener('submit', e => {
    e.preventDefault();

    const email = formElem.elements.email.value.trim();
    const message = formElem.elements.message.value.trim();

    if (!email || !message) {
      alert('Fill please all fields');
      return;
    }

    formData.email = email;
    formData.message = message;

    console.log(formData);

    localStorage.removeItem('feedback-form-state');
    formElem.reset();
    formData = { email: '', message: '' };
  });
});

function saveToLS(key, value) {
  try {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Помилка при збереженні в LS:', error);
  }
}

function getFromLS(key, defaultValue) {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData === null) {
      return defaultValue;
    }
    return JSON.parse(jsonData);
  } catch (error) {
    console.warn('Неможливо розпарсити дані з LS:', error);
    return defaultValue;
  }
}
