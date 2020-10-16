<template>
<div>
  <div class="text-center">
    <h1>SwagForDev</h1>
    <p>Awsome swag opportunities for developers</p>
  </div>
  <div>
    <v-row>
      <v-col
        v-for="n in 5"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-card
          max-width=350
        >
          <v-card-title>
            Hacktoberfest 2020
          </v-card-title>
          <v-img class="ml-1"
            src="/download.jpeg"
            height="300px"
            width="341px"
          ></v-img>
          <v-card-text>
            Make four Pull Requests (PRs) between October 1–31 in any time zone, and earn a limited edition T-shirt!
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
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
  
}
</script>
