<template>
  <ion-list>
    <ion-item button router-link="/friends">Friends</ion-item>
    <ion-item button>Settings</ion-item>
    <ion-item button>Log Out</ion-item>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItem
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonList,
    IonItem
  }
})
</script>
