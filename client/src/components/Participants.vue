<template>
  <div style="display: flex; align-items: center;">
    <ion-avatar style="height: 40px; width: 40px;">
      <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
    </ion-avatar>
    <ion-avatar style="height: 40px; width: 40px; margin-left: -20px;">
      <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg">
    </ion-avatar>
    <div style="margin-left: 6px;">+4 more</div>
  </div>
</template>

<script>
import { IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonAvatar
  }
})
</script>
