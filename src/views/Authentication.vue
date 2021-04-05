<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Photo Share</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content :fullscreen="true">
      <ion-card style="box-shadow: none; background: transparent; top: 50%; transform: translateY(-55%);">
        <ion-card-header class="ion-text-center">
          <ion-card-title>Duck Duck</ion-card-title>
          <img src="assets/logo.png" style="width: 200px; height: auto;">
        </ion-card-header>

        <ion-card-content style="max-width: 400px; margin: 0 auto;">
          <form
            @submit.prevent="
              mode === 'SignIn'
                ? signInWithEmailAndPassword(email, password)
                : signUpWithEmailAndPassword(name, email, password)
            "
          >
            <ion-item v-if="mode === 'SignUp'" class="mb-lg font-lg">
              <ion-input v-model="name" placeholder="Name"></ion-input>
            </ion-item>
            <ion-item class="mb-lg font-lg">
              <ion-input v-model="email" placeholder="Email"></ion-input>
            </ion-item>
            <ion-item class="font-lg">
              <ion-input v-model="password" type="password" placeholder="Password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="action-button ion-margin-top"
              type="submit"
              style="margin-top: 50px;"
            >
              {{ mode === 'SignIn' ? 'Sign In' : 'Create Account' }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="action-button ion-margin-top"
              @click="
                mode =
                  mode === 'SignIn' ? 'SignUp' : 'SignIn'
              "
            >
              {{ mode === 'SignIn' ? 'Sign Up' : 'Cancel' }}
            </ion-button>
          </form>
        </ion-card-content>

        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapActions } from 'vuex'
import {
 IonPage,
 IonContent,
 IonCard,
 IonCardHeader,
 IonCardTitle,
 IonCardContent,
 IonInput,
 IonButton,
 IonItem,
} from '@ionic/vue';

function initialState () {
  return {
    name: '',
    email: '',
    password: '',
    mode: 'SignIn',
    errorMsg: ''
 }
}

export default {
 name: 'Authentication',
 components: {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonItem,
  IonButton,
 },
 data: () => (initialState()),
 methods: {
  ...mapActions([
    'login',
    'signup'
  ]),
  resetData () {
    Object.assign(this.$data, initialState())
  },
  async signInWithEmailAndPassword (email, password) {
    try {
      if (!email || !password) {
        this.errorMsg = 'Email and Password Required';
        return;
      }
      await this.login({ email, password });
      this.$router.push('/');
      this.resetData();
      } catch (error) {
      this.errorMsg = error.message;
    }
   },
   async signUpWithEmailAndPassword (name, email, password) {
     try {
      if (!name || !email || !password) {
        this.errorMsg = 'Name, Email, and Password Required';
        return;
      }
      await this.signup({ name, email, password });
      this.$router.push('/');
      this.resetData();
    } catch (error) {
      this.errorMsg = error.message;
    }
   }
 }
}
</script>
