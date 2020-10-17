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
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Swag name</v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field></v-text-field>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Swag details</v-list-item-title>
              <v-list-item-subtitle>
                <v-textarea
                    rows="1"
                    auto-grow
                ></v-textarea>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Swag details url</v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field></v-text-field>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Swag image</v-list-item-title>
              <v-list-item-subtitle>
                <v-file-input></v-file-input>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data () {
        return {
            dialog: false
        }
    }
}
</script>