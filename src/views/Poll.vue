<template>
  <layout :showBackButton="true" v-if="poll && id">
    <div>
      <h2>{{ poll.name }}</h2>
      <author class="mb-lg" :author="poll.author"></author>
    </div>
    <div v-for="(item, index) in poll.items"
      :key="index"
      style="position: relative;">
      <ion-item
        class="poll-item"
        lines="none"
        style="margin-bottom: 10px; position: relative;"
        @click="selectedVote = item">
        <span>{{ item }}</span>
      </ion-item>
      <svg
        v-if="isSelected(item)"
        class="selected-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="6" fill="white"/>
        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>

    <ion-button
      class="action-button poll-submit"
      style="padding: 0 20px;"
      expand="block"
      :disabled="disableSave"
      @click="saveVote">
      {{ voteButtonText }}
    </ion-button>
  </layout>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButton, IonItem } from '@ionic/vue';
import { mapActions, mapGetters } from 'vuex';

import { Author, Layout } from '@/components'

export default defineComponent({
  name: 'Poll',
  components: {
    Author,
    IonButton,
    IonItem,
    Layout
  },
  data: () => ({
    selectedVote: null
  }),
  methods: {
    ...mapActions([
      'getVotes',
      'setPolls',
      'updateVote'
    ]),
    isSelected (item) {
      if (this.savedVote) {
        if (this.selectedVote && this.selectedVote !== this.savedVote.vote) {
          return item === this.selectedVote
        }
        return item === this.savedVote.vote
      } else if (this.selectedVote && this.selectedVote === item) {
        return true
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
    id () {
      return this.$route.params.id
    },
    poll () {
      return this.$store.getters.polls(this.id)
    },
    savedVote () {
      return this.votes.find(v => v.user === this.userId)
    },
    votes () {
      return this.$store.getters.votes(this.id)
    }
  },
  async beforeMount () {
    if (this.$store.getters.polls().length === 0) {
      await this.setPolls()
    }
    await this.getVotes(this.id)
  }
})
</script>

<style>
.selected-icon {
  position: absolute;
  height: 30px;
  width: 30px;
  top: -5px;
  right: -5px;
}
</style>
