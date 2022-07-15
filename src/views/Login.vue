<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <div class="text-pink-600">
      <div class="card">
        <ValidationProvider name="email" rules="required">
          <input
            type="text"
            required
            autocomplete="off"
            name="email"
            placeholder="Email"
            v-model="authData.email"
          />
        </ValidationProvider>
        <ValidationProvider name="password" rules="required">
          <input
            type="password"
            required
            autocomplete="off"
            name="password"
            placeholder="Password"
            v-model="authData.password"
          />
        </ValidationProvider>
        <button
          type="submit"
          :disabled="invalid || isAuthenticating"
          @click="login"
        >
          LOGIN
        </button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/services/AuthService";
import { IValidationObserver } from "@/types";

@Component({})
export default class Login extends Vue {
  protected authService = new AuthService();
  public isAuthenticating = false;
  public authData = {
    email: "",
    password: "",
  };
  public user = [];
  public showPassword = false;

  async login(): Promise<void> {
    this.isAuthenticating = true;
    if (await (this.$refs.form as IValidationObserver).validate()) {
      this.authService
        .login(this.authData)
        .then((response) => {
          this.$store.dispatch("auth/authenticate", response);
          this.$router.push({ name: "home" });
        })
        .catch()
        .finally(() => {
          this.isAuthenticating = false;
        });
    }
  }
}
</script>

<style scoped></style>
