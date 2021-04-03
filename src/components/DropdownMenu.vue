<template>
  <ion-list lines="none">
    <ion-item button @click="logout" lines="none">Log Out</ion-item>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItem
} from '@ionic/vue';
import { mapActions } from 'vuex';

export default {
  components: {
    IonList,
    IonItem
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>
