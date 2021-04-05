<template>
  <ion-content :fullscreen="true">
    <ion-card style="box-shadow: none; background: transparent; top: 50%; transform: translateY(-55%);">
      <ion-card-header class="ion-text-center">
        <ion-card-subtitle>Error 404</ion-card-subtitle>
        <ion-card-title class="mb-lg">
          {{ text }}
        </ion-card-title>
        <img src="assets/404.png" style="width: 200px; height: auto;">
      </ion-card-header>
    </ion-card>
  </ion-content>
</template>

<script>
import {
 IonCard,
 IonCardHeader,
 IonCardTitle,
 IonCardSubtitle,
 IonContent
} from '@ionic/vue';

export default {
  name: 'NotFound',
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonContent
  },
  computed: {
    text () {
      const text = this.$route.params.text
      return text ?? 'This is not the page you are looking for'
    }
  }
}
</script>
