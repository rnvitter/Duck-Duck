<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="showBackButton">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-avatar style="height: 30px; width: 30px; margin-right: 4px;" slot="end" @click="openPopover">
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
import {
  IonAvatar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  popoverController
} from '@ionic/vue';
import { defineComponent } from 'vue';

import DropdownMenu from './DropdownMenu'

export default defineComponent({
  name: 'Home',
  props: {
    showBackButton: {
      type: Boolean,
      required: false
    },
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
  },
  methods: {
    async openPopover(ev) {
      const popover = await popoverController
        .create({
          component: DropdownMenu,
          cssClass: 'my-custom-class',
          event: ev,
          translucent: true
        })
      return popover.present();
    }
  },
  data: () => ({
    showMenu: false
  })
});
</script>

<style>
#container {
  padding: 15px;
}
</style>