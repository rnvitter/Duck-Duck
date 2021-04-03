<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Photo Share</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content :fullscreen="true">
      <ion-card style="box-shadow: none;">
        <ion-card-header style="text-align: center;">
          <img src="assets/duck-duck-logo-2.png" style="width: 80px; height: auto; margin-bottom: 10px;">
          <ion-card-title>Welcome to Duck Duck</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form
            @submit.prevent="
              mode === 'SignIn'
                ? signInWithEmailAndPassword(email, password)
                : signUpWithEmailAndPassword(name, email, password)
            "
          >
            <ion-item v-if="mode === 'SignUp'">
              <ion-label position="floating">Name</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              style="margin-top: 50px;"
            >
              {{ mode === 'SignIn' ? 'Sign In' : 'Create Account' }}
            </ion-button>
            <ion-button
              expand="block"
              color="light"
              class="ion-margin-top"
              @click="
                mode =
                  mode === 'SignIn' ? 'SignUp' : 'SignIn'
              "
            >
              {{ mode === 'SignIn' ? 'Create an account' : 'Cancel' }}
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
 IonCardTitle,
 IonCardHeader,
 IonCardContent,
 IonInput,
 IonButton,
 IonLabel,
 IonItem,
} from '@ionic/vue';

export default {
 name: 'Authentication',
 components: {
  IonContent,
  IonPage,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
 },
 data: () => ({
   name: '',
    email: '',
    password: '',
    mode: 'SignUp',
    errorMsg: ''
 }),
 computed: {

 },
 methods: {
   ...mapActions([
     'login',
     'signup'
   ]),
   async signInWithEmailAndPassword (email, password) {
     try {
        if (!email || !password) {
          this.errorMsg = 'Email and Password Required';
          return;
        }
        await this.login({ email, password });
        this.$router.push('/');
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
    } catch (error) {
      this.errorMsg = error.message;
    }
   }
 }
}
</script>
