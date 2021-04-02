<template>
  <ion-card
    :router-link="`/polls/${poll.id}`"
    style="border-radius: 25px; margin: 20px 0;">
    <ion-card-header>
      <ion-card-title style="font-size: 18px;">{{ poll.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content style="display: flex; align-items: center; justify-content: space-between;">
      <participants></participants>
      <div style="font-size: 13px; text-align: end;">
        <div>Voted</div>
        <div>2 days left</div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { Participants } from '@/components'

export default defineComponent({
  name: 'PollItem',
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    Participants
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  }
})
</script>
