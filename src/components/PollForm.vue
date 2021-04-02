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
    <ion-content fullscreen style="padding: 10px;">
      <ion-item lines="none">
        <ion-label position="stacked">Poll Name</ion-label>
        <ion-input v-model="form.name" placeholder="Enter Poll Name" class="ion-no-border"></ion-input>
      </ion-item>
      <!-- <ion-item lines="none">
        <ion-label position="stacked">Participants</ion-label>
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <participants></participants>
          <ion-button @click="() => {}" size="small" style="float: right; margin-right: 10px;">Add</ion-button>
        </div>
      </ion-item> -->
      <!-- <ion-item lines="none">
        <ion-label position="stacked">Poll Close Time</ion-label>
        <ion-datetime value="1990-02-19" placeholder="Select Date"></ion-datetime>
      </ion-item> -->
      <ion-item lines="none">
        <ion-label position="stacked">Items</ion-label>
        <ion-item-sliding
          v-for="(item, index) in form.items"
          :key="index">
          <ion-item class="poll-item" lines="none">
            <ion-input :value="item" @input="item = $event" :placeholder="`Option ${index + 1}`" style="background: transparent;"></ion-input>
          </ion-item>

          <ion-item-options side="end" style="border-bottom: none;">
            <ion-item-option @click="() => {}" style="margin-left: 10px;">Delete</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-item>
      <ion-button @click="form.items.push('')" size="small" style="float: right; margin-right: 10px;">Add</ion-button>
      <ion-button
        class="poll-submit"
        expand="block"
        @click="createPoll(form)">
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
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
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
    ])
  }
})
</script>
