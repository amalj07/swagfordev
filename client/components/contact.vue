<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
          :ripple=false
          class="btns ml-5"
        >
          Contact
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          flat
        >
          <v-toolbar-title
            class="ml-2"
          >Contact us</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            :ripple=false
            class="btns mr-2"
            icon
            light
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form ref="messageForm">
          <v-container>
            <v-row>
              <v-col
                class="d-flex"
              >
                <v-card
                  class="mt-5"
                  width=600px
                  outlined
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Name</v-list-item-title>
                        <v-text-field
                          v-model="user.name"
                          :rules="inputRule"
                          validate-on-blur
                        ></v-text-field>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-text-field
                          v-model="user.email"
                          :rules="inputRule.concat(emailRules)"
                          validate-on-blur
                        ></v-text-field>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Message</v-list-item-title>
                        <v-text-field
                            v-model="user.message"
                            rows="2"
                            auto-grow
                            :rules="inputRule"
                            validate-on-blur
                        ></v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <v-col>
                <center>
                  <div
                    class="mt-16 ml-3"
                  >
                    <h2>Need Help? Contact us :)</h2>
                    <v-btn
                      outlined
                      class="mt-7"
                      :ripple=false
                      @click="sendmessage"
                    >
                      Send Message
                    </v-btn>
                  </div>
                </center>
              </v-col>
            </v-row>
          </v-container>
        </v-form> 
      </v-card>
    </v-dialog>
    <!-- Message reponse snackbar -->
    <v-snackbar
      v-model="snackbar"
      light
      top
      content-class="grey--text text--darken-3"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="grey"
          text
          v-bind="attrs"
          :ripple=false
          @click="snackbar = false"
          class="btns"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
    data () {
        return {
          dialog: false,
          snackbar: false,
          snackbarText: "",
          user: {
            name: "",
            email: "",
            message: "",
          },
          inputRule: [
            value => value.length > 0 || 'required',
          ],
          emailRules: [ 
              v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ]
        }
    },
    methods: {
      sendmessage() {
        if(this.$refs.messageForm.validate()) {
          this.$axios.$post('/newmsg', {
            name: this.user.name,
            email: this.user.email,
            message: this.user.message
          }).then(response => {
            this.snackbar = true
            this.snackbarText = "Thanks for contacting us. We will get back to you shortly"
            this.dialog = false
          }).catch(error => {
            this.snackbar = true
            this.snackbarText = "Failed to contact support team. Please try again later."
            this.dialog = false
          })
        }
      }
    }
}
</script>

<style scoped>
.btns::before{
  background-color: transparent;
}
</style>