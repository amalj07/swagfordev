<template>
<div>
  <div class="text-center my-5">
    <h1>SwagForDevs</h1>
    <p>Awsome swag opportunities for developers</p>
  </div>
  <center>
    <hr>
  </center>
  <div
    class="mt-10"
  >
    <v-row>
      <v-col
        v-for="(swag, index) in swags"
        :key="swag.id"
        cols="12"
        sm="4"
      >
        <v-card
          max-width=350
        >
          <v-card-title>
            {{ swag.name }}
          </v-card-title>
          <center>
            <v-img 
              :src="swag.imgUrl"
              height="300px"
              width="340px"
            ></v-img>
          </center>
          <v-card-text>
            {{ swag.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              @click="openSwagDetails(index)"
            >
              Check it here
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      swags: []
    }
  },
  methods: {
   fetchData() {
     this.$axios.$get('/').then(response => {
       this.swags = response
       console.log(this.swags)
     }).catch(error => {
       console.log(error)
     })
   },
   openSwagDetails(index) {
     window.open(this.swags[index].url)
   }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
hr {
    border: 1px solid gray;
    border-radius: 5px;
    width: 9%;
}
</style>
