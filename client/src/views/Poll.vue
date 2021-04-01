<template>
  <layout :title="poll.name">
    <div style="display: flex; align-items: center; justify-content: space-between; margin: 10px 0 30px;">
      <participants></participants>
      <div style="text-align: end;">
        <div style="font-size: 13px; margin-bottom: 5px;">Poll Closes</div>
        <div>
          <strong>Friday 2:30pm</strong>
        </div>
      </div>
    </div>
    <ion-item
      v-for="(item, index) in [...poll.items, ...poll.items]"
      :key="index"
      class="poll-item"
      lines="none"
      style="margin-bottom: 10px;">
      <span>{{ item }}</span>
    </ion-item>
    <ion-button
      class="poll-submit"
      expand="block">
      Submit Votes
    </ion-button>
  </layout>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButton, IonItem } from '@ionic/vue';

import { Layout, Participants } from '@/components'

export default defineComponent({
  name: 'Poll',
  components: {
    IonButton,
    IonItem,
    Layout,
    Participants
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    poll () {
      return this.$store.getters.polls(this.id)
    }
  }
})
</script>
