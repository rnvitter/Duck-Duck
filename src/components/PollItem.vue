<template>
  <ion-card
    v-if="poll"
    :router-link="`/polls/${poll.id}`"
    class="poll-item"
    style="margin: 20px 0; padding: 0px;">
    <ion-card-header>
      <ion-card-title style="font-size: 18px;">{{ poll.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content class="flex-between">
      <author :author="poll.author"></author>
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

import { Author } from '@/components'

export default defineComponent({
  name: 'PollItem',
  components: {
    Author,
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
