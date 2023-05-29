import { Component, Ref, Vue } from 'vue-property-decorator';
import { QForm } from 'quasar';
import { FormUtils } from 'src/common/utils/FormUtils';
import AuthenticationService from 'src/common/services/AuthenticationService';
import { RegisterVo } from 'src/common/models/User';

@Component({
  name: 'register-page',
})
export default class RegisterPage extends Vue {
  loading = false;

  @Ref('mainForm')
  mainForm?: QForm;

  bean: RegisterVo = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    username: '',
  };

  async onSubmit() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.mainForm);
      await AuthenticationService.register(this.bean);
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
