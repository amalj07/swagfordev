<template>
<div>
  <div class="text-center my-5">
    <h1>SwagForDevs</h1>
    <p>Awesome swag opportunities for developers</p>
  </div>
  <center>
    <hr>
  </center>
  <div
    class="mt-10"
  >
    <div
      v-if="fetching"
    >
      <center>
        <p>Getting the awesome list of swags...</p>
        <v-progress-circular
          color="grey"
          :width="7"
          :size="70"
          indeterminate
          rounded
          height="6"
        ></v-progress-circular>
      </center>
    </div>
    <div
      v-else
    >
      <div
        v-if="fetchStatus"
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
      <div
        v-else
      >
        <center>
          <v-card
            flat
            max-width=500
          >
            <v-card-text>
              <p
                class="text-body-1"
              >Failed to fetch swags.</p>
              <v-btn
                text
                :ripple=false
                @click="tryagain"
                class="tryagainbtn"
              >
                Try again
              </v-btn>
            </v-card-text>
          </v-card>
        </center>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      swags: [],
      fetching: true,
      fetchStatus: false
    }
  },
  methods: {
   fetchData() {
     this.fetching = true 
     this.$axios.$get('/').then(response => {
       this.fetching = false
       this.fetchStatus = true
       this.swags = response
     }).catch(error => {
       this.fetching = false
       this.fetchStatus = false
       console.log(error)
     })
   },
   openSwagDetails(index) {
     window.open(this.swags[index].url)
   },
   tryagain() {
     this.fetchData()
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
.tryagainbtn::before {
  background-color: transparent;
}
</style>
