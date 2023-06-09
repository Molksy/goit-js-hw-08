import {
  saveDataToLocalSt,
  loadDataFromLocalSt,
  removeDataFromLocalSt,
} from './local-st-func';
import throttle from '../../node_modules/lodash.throttle';

const FORM_SELECTOR = '.feedback-form';
const LOCAL_ST_KEY = 'feedback-form-state';
const loginForm = document.querySelector(FORM_SELECTOR);
let formData = createEmptyDataObj(loginForm);

if (loadDataFromLocalSt(LOCAL_ST_KEY)) {
  Object.keys(loadDataFromLocalSt(LOCAL_ST_KEY)).map(key => {
    if (loginForm[key]) {
      formData[key] = loginForm[key].value =
        loadDataFromLocalSt(LOCAL_ST_KEY)[key];
    }
  });
}

loginForm.addEventListener('submit', onFormSubmit);
loginForm.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  if (!formFieldsValidation(loginForm)) return;

  console.log(formData);

  removeDataFromLocalSt(LOCAL_ST_KEY);
  event.target.reset();
  
  formData = createEmptyDataObj(loginForm);
}

function formFieldsValidation(form) {
  const isFullField = form.querySelectorAll('input');

  return [...isFullField].every(field => field.value)
    ? true
    : alert('Всі поля повинні бути заповнені!');
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  saveDataToLocalSt(LOCAL_ST_KEY, formData);
}

function createEmptyDataObj(form) {
  return [...form].reduce((dataObj, { name }) => {
    if (name) {
      dataObj[name] = '';
    }

    return dataObj;
  }, {});
}
