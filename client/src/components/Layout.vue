<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-avatar style="height: 30px; width: 30px; margin-right: 4px;" slot="end">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
        </ion-avatar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-header collapse="condense" class="ion-no-border">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <slot />
      </div>
      <slot name="fab"></slot>
    </ion-content>
    <!-- <ion-header collapse="condense">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Duck Duck</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="container">
        <slot />
      </div>
    </ion-content> -->
  </ion-page>
</template>

<script>
import { IonAvatar, IonButtons, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Duck Duck'
    }
  },
  components: {
    IonAvatar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  }
});
</script>

<style>
#container {
  padding: 15px;
}
</style>