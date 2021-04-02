<template>
  <ion-list>
    <ion-item button>Settings</ion-item>
    <ion-item button @click="logout">Log Out</ion-item>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItem
} from '@ionic/vue';
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonList,
    IonItem
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
})
</script>
