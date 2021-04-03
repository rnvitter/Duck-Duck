<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="showBackButton">
          <ion-back-button defaultHref="/" text="Home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-avatar style="height: 30px; width: 30px; margin-right: 4px;" slot="end" @click="openPopover">
          <img :src="userProfile.image ?? 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'">
        </ion-avatar>
      </ion-toolbar>
    </ion-header>

    <ion-content style="position: relative; padding-bottom: 0;">
      <div class="top-ad"></div>
      <div id="container">
        <slot />
      </div>
    </ion-content>
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
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters([
      'userProfile'
    ])
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
  }
});
</script>

<style>
#container {
  background: #fafafa;
  padding: 15px;
  height: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  position: absolute;
  width: 100%;
  top: 120px;
  padding-bottom: 20px;
}

.top-ad {
  position: absolute;
  top: 0;
  height: 150px;
  width: 100%;
  background: #eee;
}
</style>