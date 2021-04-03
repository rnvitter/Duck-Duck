<template>
  <layout title="Polls">
    <ion-button
      class="action-button mb-lg"
      expand="block"
      @click="open = true">
      Create Poll
    </ion-button>
    <poll-item v-for="(poll, index) in polls" :key="index" :poll="poll"></poll-item>
    <ion-modal
      :is-open="open">
      <poll-form @close="open = false"></poll-form>
    </ion-modal>
  </layout>
</template>

<script>
import {
  IonButton,
  IonModal
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { mapActions } from 'vuex';

import { Layout, PollItem, PollForm } from '@/components'

export default {
  name: 'Home',
  components: {
    IonButton,
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
      return this.$store.getters.polls();
    }
  },
  methods: {
    ...mapActions([
      'setPolls'
    ])
  },
  data: () => ({
    open: false
  }),
  async beforeMount () {
    await this.setPolls()
  }
};
</script>
