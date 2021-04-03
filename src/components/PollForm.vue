<template>
  <div>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Create Poll</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">Close</ion-button>
          <slot name="header-button-right"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen padding>
      <div class="poll-form">
        <ion-item class="mb-lg">
          <ion-input
            v-model="form.name"
            placeholder="Enter Poll Name"
            class="ion-no-border">
          </ion-input>
        </ion-item>
        <div class="mb-lg flex-between">
          <ion-label>Answers</ion-label>
          <ion-button @click="form.items.push('')" size="small" style="float: right; margin-right: 10px;">Add Answer</ion-button>
        </div>
        <ion-list
          style="background: #fafafa;"
          :key="form.items.length">
          <ion-item-sliding
            v-for="(item, index) in form.items"
            :key="index"
            class="mb-lg">
            <ion-item>
              <ion-input
                v-model="form.items[index]"
                :placeholder="`Option ${index + 1}`"
                style="background: #fafafa;">
              </ion-input>
            </ion-item>
            <ion-item-options side="end" style="border-bottom: none;">
              <ion-item-option
                @click="form.items.splice(index, 1)"
                style="margin-left: 10px;">
                Delete
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <div style="height: 100px; text-align: center; opacity: 0.5;">
          Swipe to delete
        </div>
      </div>

      <ion-button
        class="action-button poll-submit"
        style="padding: 0 20px;"
        expand="block"
        @click="savePoll(form)">
        Create Poll
      </ion-button>
    </ion-content>
  </div>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  loadingController,
  toastController
} from '@ionic/vue';
import { mapActions } from 'vuex';

export default {
  components: {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar
  },
  data: () => ({
    form: {
      name: '',
      items: ['', '']
    },
  }),
  methods: {
    ...mapActions([
      'createPoll'
    ]),
    async savePoll (form) {
      const loading = await loadingController.create({
        message: 'Creating poll...'
      });
      loading.present();
      try {
        await this.createPoll(form);
        loading.dismiss();
        this.$emit('close');
        this.openToast('Poll saved successfully', 'success');
      } catch (error) {
        loading.dismiss();
        this.openToast('Failed to save poll', 'danger');
      }
    },
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
  }
}
</script>

<style>
.poll-form {
  padding: 20px;
  background: #fafafa;
  height: 100%;
}
</style>
