<template>
  <div class="flex-center">
    <ion-avatar style="height: 30px; width: 30px;">
      <img :src="author.image">
    </ion-avatar>
    <div style="margin-left: 8px;">
      <span style="font-weight: 400;">Created by </span>
      <span style="font-weight: 700;">{{ author.name }}</span>
    </div>
  </div>
</template>

<script>
import { IonAvatar } from '@ionic/vue';

export default {
  name: 'Author',
  components: {
    IonAvatar
  },
  props: {
    author: {
      type: Object,
      required: true
    }
  }
}
</script>
