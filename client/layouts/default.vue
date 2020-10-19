<template>
  <v-app dark>    
    <v-app-bar
      fixed
      app
      flat
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <addswag />
      <contact />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <p
        class="mx-auto text-body-2"
      >
        swagfordevs
      </p>
    </v-footer>
  </v-app>
</template>

<script>
import addswag from '../components/addswag'
import contact from '../components/contact'

export default {
  data () {
    return {
      fixed: false,
      title: 'SwagForDevs'
    }
  }
}
</script>
