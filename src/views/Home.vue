<template>
  <layout>
    <!-- <h2>Polls</h2> -->
    <h2>Polls</h2>
    <poll-item v-for="(poll, index) in [...polls, ...polls, ...polls]" :key="index" :poll="poll"></poll-item>
    <template v-slot:fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="open = true">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <ion-modal
      :is-open="open">
      <poll-form @close="open = false"></poll-form>
    </ion-modal>
  </layout>
</template>

<script>
import {
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { add } from 'ionicons/icons';

import { Layout, PollItem, PollForm } from '@/components'

export default defineComponent({
  name: 'Home',
  components: {
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    Layout,
    PollItem,
    PollForm
  },
  setup () {
    return {
      add
    }
  },
  computed: {
    polls () {
      return this.$store.getters.polls()
    }
  },
  data: () => ({
    open: false
  })
});
</script>
