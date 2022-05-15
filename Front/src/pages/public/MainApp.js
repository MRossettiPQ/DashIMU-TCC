import {Component, Vue} from 'vue-property-decorator';
import EssentialLink from 'components/EssentialLink/EssentialLink.vue';

@Component({
  name: 'main-app',
  components: {EssentialLink}
})
class MainApp extends Vue {
  leftDrawerOpen = false;

  get logged() {
    return !!this.$store.state.autenticacao.user;
  }

  essentialLinks = [
    {
      title: 'Home',
      caption: 'Tela inicial',
      icon: 'home',
      link: '/home'
    },
    {
      title: 'Login',
      caption: 'Para logar',
      icon: 'login',
      link: '/logar',
      inLogged: true
    },
    {
      title: 'Registrar',
      caption: 'Para registro',
      icon: 'app_registration',
      link: '/registrar',
      inLogged: true
    },
    {
      title: 'Perfil',
      caption: 'Ver perfil',
      icon: 'account_circle',
      link: '/perfil',
      inLogged: false
    },
    {
      title: 'Pacientes',
      caption: 'Ver pacientes',
      icon: 'local_hospital',
      link: '/pacientes',
      inLogged: false
    }
  ];

  logOut() {
    this.$q
      .dialog({
        message: 'Realmente deseja sair?',
        ok: {
          label: 'Sim',
          push: true,
          flat: true,
        },
        cancel: {
          label: 'Não',
          push: true,
          color: 'negative',
          rounded: false,
          flat: true,
        },
        persistent: true,
      })
      .onOk(async () => {
        try {
          await this.$store.dispatch('autenticacao/logout');
          await this.$router.push('/home');
        } catch (e) {
          console.log(e);
        }
      });
  }

  goPerfil() {
    try {
      this.$router.push('/perfil');
    } catch (e) {
      console.log(e);
    }
  }

  get bean() {
    return this.$store.state.autenticacao.user;
  }
}

export default MainApp;
