import { Component, Vue } from 'vue-property-decorator'
import { FormUtils } from 'src/common/utils/FormUtils'
import AuthenticationService from 'src/common/services/AuthenticationService'

@Component({
  name: 'register',
})
export default class Register extends Vue {
  loading = false
  bean = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    username: '',
  }

  async onSubmit() {
    try {
      this.loading = true
      await FormUtils.validateAsync(this.$refs.mainForm)
      await AuthenticationService.register(this.bean)
      const result = await AuthenticationService.login(this.bean)
      await this.$store.dispatch('authentication/login', result)
      await this.$router.push('/home')
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }
}
