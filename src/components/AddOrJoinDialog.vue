<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="add-or-join-btn ma-2" v-on="on" fab outlined>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row class="text-center pa-4">
          <v-col>
            <v-card flat>
              <div class="ma-4 title primary--text text-uppercase">Add</div>
              <v-icon style="font-size: 72px">mdi-plus-circle-outline</v-icon>
              <v-card-subtitle class="py-4">Add a new Deck and invite your crew. It's free!</v-card-subtitle>
              <v-card-actions>
                <DeckFormDialog />
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col class="d-flex align-center" cols="auto">
            <v-divider vertical />
            <div class="divider-or">
              <span>or</span>
            </div>
          </v-col>

          <v-col>
            <v-card flat>
              <div class="ma-4 title secondary--text text-uppercase">Join</div>
              <v-icon style="font-size: 72px">mdi-account-multiple-plus-outline</v-icon>
              <v-card-subtitle class="py-4">Enter an access code and join your crew on Deck.</v-card-subtitle>
              <v-card-actions>
                <JoinFormDialog />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import DeckFormDialog from "@/components/DeckFormDialog";
import JoinFormDialog from "@/components/JoinFormDialog";

export default {
  components: { DeckFormDialog, JoinFormDialog },
  data: () => ({
    dialog: false
  })
};
</script>

<style lang="scss" scoped>
// TODO: why this wont use theme bg color automatically
.theme--dark {
  &.v-card {
    background: var(--v-background-base);
  }
}

.add-or-join-btn {
  align-self: center;
  border: dashed;
  &:hover {
    border: solid;
  }
}

.divider-or {
  position: absolute;
  left: 0;
  right: 0;
  span {
    text-transform: uppercase;
    background: var(--v-background-base);
    padding: 12px;
    border-radius: 50%;
  }
}
</style>