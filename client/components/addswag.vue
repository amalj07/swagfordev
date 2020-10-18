<template>
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
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add new swag details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="addSwag"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                class="d-flex"
              >
                <v-card
                  class="mt-5"
                  width=700px
                  outlined
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Name</v-list-item-title>
                        <v-text-field
                          v-model="swag.name"
                        ></v-text-field>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>How to get?</v-list-item-title>
                        <v-textarea
                            v-model="swag.description"
                            rows="1"
                            auto-grow
                        ></v-textarea>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>URL</v-list-item-title>
                        <v-text-field
                          v-model="swag.url"
                        ></v-text-field>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Image</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-file-input
                            v-model="swag.image"
                          ></v-file-input>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-form> 
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data () {
        return {
          dialog: false,
          swag: {
            name: "",
            description: "",
            url: "",
            image: null
          }
        }
    },
    methods: {
      addSwag() {
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
          console.log(response)
        }).catch(error => {
          console.log(error.response.data)
        })
      }
    }
}
</script>