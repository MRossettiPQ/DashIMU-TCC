import {Notify, throttle} from "quasar";

let notifySuccess = throttle((msg) => {
  Notify.create({
    message: msg,
    textColor: 'white',
    color: 'positive',
    icon: 'check'
  });
}, 500);

let notifyError = throttle((msg) => {
  Notify.create({
    message: msg,
    textColor: 'white',
    color: 'negative',
    icon: 'priority_high'
  });
}, 500);

export {
  notifyError,
  notifySuccess
}
