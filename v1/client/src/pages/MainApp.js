import { Component, Mixins, Ref, Watch } from 'vue-property-decorator'
import DialogUtils from 'src/common/utils/DialogUtils'
import { StorageMixin } from 'src/common/mixins/StorageMixin'

@Component({
  name: 'main-app',
})
export default class MainApp extends Mixins(StorageMixin) {
  leftDrawerOpen = false

  @Ref('drawer')
  drawer

  mounted() {
    this.closeDrawerIf()
  }

  @Watch('$route')
  closeDrawerIf() {
    if (['private.session', 'private.result'].includes(this.$route?.name)) {
      this.drawer.hide()
    }
  }

  logout = {
    title: 'Logout',
    icon: 'logout',
    caption: 'Sair da conta',
  }

  get essentialLinks() {
    const menu = [
      {
        title: this.$t('menu.home.title'),
        caption: this.$t('menu.home.caption'),
        icon: 'home',
        link: '/home',
      },
    ]
    return menu.concat(
      this.logged
        ? [
            {
              title: this.$t('menu.profile.title'),
              caption: this.$t('menu.profile.caption'),
              icon: 'account_circle',
              link: '/profile',
            },
            {
              title: this.$t('menu.patient.title'),
              caption: this.$t('menu.patient.caption'),
              icon: 'local_hospital',
              link: '/patients',
            },
          ]
        : [
            {
              title: this.$t('menu.login.title'),
              caption: this.$t('menu.login.caption'),
              icon: 'login',
              link: '/login',
            },
            {
              title: this.$t('menu.register.title'),
              caption: this.$t('menu.register.caption'),
              icon: 'app_registration',
              link: '/register',
            },
          ]
    )
  }

  get bean() {
    return this.$store.state.authentication?.user
  }

  async logOut() {
    console.log('aqui')
    try {
      await DialogUtils.create({
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
      })
      console.log('aqui')
      await this.$store.dispatch('authentication/logout')
    } catch (e) {
      console.log(e)
    }
  }

  async goProfile() {
    try {
      await this.$router.push('/profile')
    } catch (e) {
      console.log(e)
    }
  }
}
