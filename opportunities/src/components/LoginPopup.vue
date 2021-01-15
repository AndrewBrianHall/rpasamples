<template>
  <div>
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-container">
          <div class="popup-header">Log In</div>
          <div class="dialog-body">
            <div class="invalid-message" v-if="invalidLogin">Invalid email or password (Hint: enter any value for both)</div>
            <div class="login-box-container">
              <input ref="txtUsername" type="text" class="login-box" placeholder="Username" v-on:keyup.enter="login" />
            </div>
            <div class="login-box-container">
              <input ref="txtPassword" type="password" class="login-box" placeholder="Password" v-on:keyup.enter="login" />
            </div>
          </div>
          <div class="popup-footer">
            <button class="login-button footer-button" v-on:click="login">
              Login
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LoginPopup",
  data() {
    return {
      showModal: false,
      invalidLogin: false,
    };
  },
  methods: {
    open: function () {
      this.showModal = true;
    },
    close: function () {
      this.showModal = false;
      this.loginCompleteCallback();
    },
    login: function(e){
        const username = this.$refs.txtUsername;
        const password = this.$refs.txtPassword;

        if(username.value !== "" && password.value !== ""){
            const loggedinUrl = location.protocol + '//' + location.host + location.pathname;
            window.location.href = loggedinUrl;
            return;
        }
        else{
            username.value = "";
            password.value = "";
            this.invalidLogin = true;
        }
    }
  },
};
</script>

<style scoped lang="scss">
@import "../styles/export.scss";
@import "../styles/popup.scss";

.login-box {
  padding: 10px 12px;
  border: 1px solid darkgray;
  width: 240px;
}

.login-box-container {
  padding: 4px 0px;
}

.modal-footer {
  margin-top: 12px;
}

.modal-header {
  color: black;
  border-bottom: 1px solid lightgray;
  padding-bottom: 8px;
}

.dialog-body{
    margin-top: 8px;
    margin-bottom: 12px;
}

button.login-button {
  @extend button.export-shape-props;
  background-color: $button-color;
  border-color: $button-color;
  color: white;
}

.invalid-message{
    color: red;
    padding: 4px;
    margin-bottom: 4px;
}
</style>