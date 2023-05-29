import { Component, Mixins } from 'vue-property-decorator';
import { QDialogOptions } from 'quasar';
import { StorageMixin } from 'src/common/mixins/StorageMixin';

@Component({
  name: 'main-app',
})
export default class MainApp extends Mixins(StorageMixin) {
  leftDrawerOpen = false;

  get menu() {
    const menu = [
      {
        title: this.$t('menu.home.title'),
        caption: this.$t('menu.home.caption'),
        icon: 'home',
        link: '/home',
      },
      {
        title: this.$t('menu.login.title'),
        caption: this.$t('menu.login.caption'),
        icon: 'login',
        link: '/login',
        inLogged: true,
      },
      {
        title: this.$t('menu.register.title'),
        caption: this.$t('menu.register.caption'),
        icon: 'app_registration',
        link: '/register',
        inLogged: true,
      },
      {
        title: this.$t('menu.profile.title'),
        caption: this.$t('menu.profile.caption'),
        icon: 'account_circle',
        link: '/profile',
        inLogged: false,
      },
      {
        title: this.$t('menu.patient.title'),
        caption: this.$t('menu.patient.caption'),
        icon: 'local_hospital',
        link: '/patients',
        inLogged: false,
      },
    ];
    return {
      ...menu,
      ...() => [
        {
          title: 'socket test',
          caption: 'socket test',
          icon: 'local_hospital',
          link: '/socket',
          inLogged: false,
        },
      ],
    };
  }

  logOut() {
    this.$q
      .dialog({
        message: this.$t('main.logout'),
        ok: {
          label: this.$t('main.yes'),
          push: true,
          flat: true,
        },
        cancel: {
          label: this.$t('main.no'),
          push: true,
          color: 'negative',
          rounded: false,
          flat: true,
        },
        persistent: true,
      } as QDialogOptions)
      .onOk(async () => {
        try {
          await this.$store.dispatch('authentication/logout');
        } catch (e) {
          console.log(e);
        }
      });
  }

  async goProfile() {
    try {
      await this.$router.push('/profile');
    } catch (e) {
      console.log(e);
    }
  }
}
