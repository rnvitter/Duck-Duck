<template>
  <layout title="Friends" :showBackButton="true">
  </layout>
</template>

<script>
import { defineComponent } from 'vue';
import { Layout } from '@/components'

export default defineComponent({
  name: 'Friends',
  components: {
    Layout
  }
})
</script>
