import { Component, Ref, Vue } from 'vue-property-decorator';
import { FormUtils } from 'src/common/utils/FormUtils';
import AuthenticationService from 'src/common/services/AuthenticationService';
import { LoginVo } from 'src/common/models/User';
import { QForm } from 'quasar';

@Component({
  name: 'login-page',
})
class LoginPage extends Vue {
  loading = false;

  @Ref('mainForm')
  mainForm?: QForm;

  bean: LoginVo = {
    username: '',
    password: '',
  };

  mounted() {
    // console.log(this.store.user);
  }

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.mainForm);
      const result = await AuthenticationService.login(this.bean);
      await this.$store.dispatch('authentication/login', result);
      await this.$router.push({
        name: 'private',
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export default LoginPage;
