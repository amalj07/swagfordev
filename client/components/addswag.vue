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
          outlined
          v-bind="attrs"
          v-on="on"
        >
          Add Swag
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          flat
        >
          <v-toolbar-title
            class="ml-2"
          >Add new swag</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            :ripple=false
            class="dialogcloseicon mr-2"
            icon
            light
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form ref="addSwagForm">
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
                          v-model="swag.name"
                          :rules="inputRule"
                          validate-on-blur
                        ></v-text-field>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>How to get?</v-list-item-title>
                        <v-textarea
                            v-model="swag.description"
                            rows="2"
                            auto-grow
                            :rules="inputRule"
                        ></v-textarea>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>URL</v-list-item-title>
                        <v-text-field
                          v-model="swag.url"
                          :rules="inputRule"
                        ></v-text-field>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Image</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-file-input
                            v-model="swag.image"
                            :rules="imageUploadRule"
                          ></v-file-input>
                        </v-list-item-subtitle>
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
                    <h1>Add your awesome swag to amazing list of swags</h1>
                    <v-btn
                      outlined
                      class="mt-7"
                      @click="addSwag"
                    >
                      Add Swag
                    </v-btn>
                  </div>
                  <div
                    class="mt-16"
                  >
                    <span
                      class="text-body-2"
                    >
                      Swags will be listed after it is verified.
                    </span>
                  </div>
                </center>
              </v-col>
            </v-row>
          </v-container>
        </v-form> 
      </v-card>
    </v-dialog>
    <!-- Add swag loadig dialog -->
    <v-dialog
      v-model="addswagdialog"
      hide-overlay
      persistent
      width="500"
    >
      <v-card
        light
        height=58
      >
        <v-card-text
          class="pt-2"
          align="center"
        >
          Adding your swag to the awesome swag list...
          <v-progress-linear
            indeterminate
            color="grey"
            class="mt-1"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data () {
        return {
          dialog: false,
          addswagdialog: false,
          swag: {
            name: "",
            description: "",
            url: "",
            image: null
          },
          inputRule: [
            value => value.length > 0 || 'required',
          ],
          imageUploadRule: [
            image => image != null || 'required'
          ]
        }
    },
    methods: {
      addSwag() {
        if(this.$refs.addSwagForm.validate()) {
          this.addswagdialog = true
          const formData = new FormData()
          formData.append("name", this.swag.name)
          formData.append("description", this.swag.description)
          formData.append("url", this.swag.url)
          formData.append("image", this.swag.image)
          this.$axios.$post('/addswag', formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(response => {
            this.addswagdialog = false
            this.dialog = false
            console.log(response)
          }).catch(error => {
            this.addswagdialog = false
            this.dialog = false
            console.log(error.response.data)
          })
        }
      }
    }
}
</script>

<style scoped>
.dialogcloseicon::before{
  background-color: transparent;
}
</style>