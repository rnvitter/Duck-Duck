<template>
  <layout :showBackButton="true" :title="poll.name" v-if="poll && id">
    <author class="mb-lg" :author="poll.author"></author>
    <div v-for="(item, index) in poll.items"
      :key="index"
      class="poll-item-wrapper">
      <ion-item
        class="poll-item mb-md"
        lines="none"
        :style="`background-image: ${getGradient(item)}; padding: 10px;`"
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
    <div style="height: 180px; text-align: center; opacity: 0.5;">
      {{ votes.length }} {{ votes.length === 1 ? 'vote' : 'votes' }}
    </div>
    <div class="bottom-fade"></div>
    <ion-button
      class="action-button poll-submit"
      expand="block"
      :disabled="disableSave"
      @click="voteButtonPress">
      {{ voteButtonText }}
    </ion-button>
  </layout>
</template>

<script>
import { IonButton, IonItem, toastController } from '@ionic/vue';
import { mapActions, mapGetters } from 'vuex';

import { Author, Layout } from '@/components'

export default {
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
      'saveVote',
      'setPolls',
      'updateVote'
    ]),
    getGradient (item) {
      const color = 'var(--ion-color-secondary-tint)';
      const totalVotes = this.votes.length;
      const votesFor = this.votes.filter(v => v.vote === item).length;
      const perc = (votesFor / totalVotes) * 100
      return `linear-gradient(90deg, ${color} 0%, ${color} ${perc}%, white ${perc}%, white 100%);`;
    },
    isSelected (item) {
      const savedVote = this.savedVote
      const selectedVote = this.selectedVote
      if (savedVote) {
        if (selectedVote && selectedVote !== savedVote.vote) {
          return item === selectedVote
        }
        return item === savedVote.vote
      } else if (selectedVote && selectedVote === item) {
        return true
      }
    },
    async voteButtonPress () {
      if (!this.savedVote) {
        try {
          await this.saveVote({
            poll: this.poll.id,
            user: this.userId,
            vote: this.selectedVote
          })
          this.openToast('Vote saved successfully', 'success')
        } catch (error) {
          this.openToast('Vote saved failed', 'danger')
        }
      } else {
        try {
          this.updateVote({
            voteId: this.savedVote.id,
            vote: this.selectedVote
          })
          this.openToast('Vote updated successfully', 'success')
        } catch (error) {
          this.openToast('Vote updated failed', 'danger')
        }
      }
    },
    // TODO: move this to a reusable file
    async openToast (text, type) {
      const toast = await toastController
        .create({
          message: text,
          duration: 2000,
          color: type,
          position: 'top'
        })
      return toast.present();
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
    disableSave () {
      const case1 = this.savedVote && (!this.selectedVote || this.selectedVote === this.savedVote.vote)
      const case2 = !this.savedVote && !this.selectedVote
      return case1 || case2
    },
    savedVote () {
      return this.votes.find(v => v.user === this.userId)
    },
    votes () {
      return this.$store.getters.votes(this.id)
    },
    voteButtonText () {
      const savedVote = this.savedVote
      const selectedVote = this.selectedVote
      return savedVote && (selectedVote && selectedVote !== savedVote.vote) ? 'Change Vote' : 'Submit Votes'
    }
  },
  async beforeMount () {
    if (this.$store.getters.polls().length === 0) {
      await this.setPolls()
    }
    await this.getVotes(this.id)
  }
}
</script>

<style>
.bottom-fade {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(250,250,250, 0), rgba(250,250,250, 1) 70%, rgba(250,250,250, 1) 100%);
  width: 100%;
  height: 200px;
}

.selected-icon {
  position: absolute;
  height: 30px;
  width: 30px;
  top: -5px;
  right: -5px;
  fill: var(--ion-color-primary);
}

.poll-answer {
  position: relative;
  background: white;
  transition: .3s ease-in-out;
}

.poll-item-wrapper {
  position: relative;
  margin: 0 auto;
  max-width: 400px;
}
</style>
