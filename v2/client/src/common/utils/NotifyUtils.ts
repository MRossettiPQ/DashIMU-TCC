import { Notify, throttle } from 'quasar';

export default new (class NotifyUtils {
  notifySuccess = throttle((msg: string) => {
    Notify.create({
      message: msg,
      textColor: 'white',
      color: 'positive',
      icon: 'check',
    });
  }, 500);

  notifyError = throttle((msg: string) => {
    Notify.create({
      message: msg,
      textColor: 'white',
      color: 'negative',
      icon: 'priority_high',
    });
  }, 500);
})();
