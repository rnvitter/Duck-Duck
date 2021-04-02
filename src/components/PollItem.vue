<template>
  <ion-card
    v-if="poll"
    :router-link="`/polls/${poll.id}`"
    style="border-radius: 25px; margin: 20px 0;">
    <ion-card-header>
      <ion-card-title style="font-size: 18px;">{{ poll.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <ion-avatar style="height: 40px; width: 40px;">
          <img :src="poll.author.image">
        </ion-avatar>
        <div style="margin-left: 5px;">
          <div style="font-size: 13px;">Created by</div>
          <div style="font-weight: 700;">{{ poll.author.username }}</div>
        </div>
      </div>
      <div style="font-size: 13px; text-align: end;">
        <div>Voted</div>
        <div>2 days left</div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PollItem',
  components: {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  }
})
</script>
