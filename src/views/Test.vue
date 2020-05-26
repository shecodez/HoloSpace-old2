<template>
  <v-row no-gutters>
    <v-col cols="auto">
      <v-card width="80">
        <v-subheader>Decks</v-subheader>

        <v-list>
          <v-list-item-group v-model="activeDeck" mandatory>
            <v-list-item v-for="deck of decks$" :key="deck.id">
              <v-avatar color="grey" class="my-2">
                <span>{{ deck.name.charAt(0) }}</span>
              </v-avatar>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="auto">
      <v-card outlined width="256">
        <v-subheader>{{ currentDeck$ }}</v-subheader>

        <v-list>
          <v-list-item-group v-model="activeDisk" active-class="border" mandatory>
            <v-list-item v-for="disk of disks$" :key="disk.id">{{ disk.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col>
      <v-card outlined>
        <v-subheader>{{ currentDisk$ }}</v-subheader>
        <v-divider></v-divider>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="message of messages$" :key="message.id">
              <span v-if="message.media">{{ message.media }}</span>
              <span v-else>{{ message.text }}</span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="auto">
      <v-card outlined width="256">
        <v-subheader>Crew</v-subheader>
        <v-divider></v-divider>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="user of members$" :key="user.id">{{ user.name }}</v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>
        {{ user$ }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "@/plugins/firebase";
import db from "@/plugins/firestore";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { map, pluck, catchError, share, switchMap } from "rxjs/operators";
import { EMPTY, combineLatest } from "rxjs";

export default {
  name: "Test",
  data: () => ({
    activeDeck: 0,
    activeDisk: 0,

    decksRef: db.collection("decks"),
    disksRef: db.collection("disks"),
    messagesRef: db.collection("messages"),
    usersRef: db.collection("users")
  }),
  // beforeMounted() {
  //   this.setActiveDeck(this.$route.params.deck_id);
  //   this.setActiveDisk(this.$route.params.disk_id);
  // },
  // watch: {
  //   "$route.params.deck_id": function(value) {
  //     this.setActiveDiskFromDeck(value);
  //   }
  // },
  subscriptions() {
    const HANDLE_ERROR = (origin, error) => {
      console.error(origin, error);
      return EMPTY;
    };

    const TO_CHUNKS = (arr, chunkSize) =>
      new Array(Math.ceil(arr.length / chunkSize))
        .fill()
        .map((_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));

    const user$ = authState(firebase.auth()).pipe(
      switchMap(user => {
        return docData(db.doc(`users/${user.uid}`));
      })
    );

    const decks$ = user$.pipe(
      switchMap(user => {
        const Q = this.decksRef.where("user_ids", "array-contains", user.id);
        return collectionData(Q);
      }),
      catchError(err => HANDLE_ERROR("decks$", err)),
      share()
    );

    const activeDeckListItem$ = this.$watchAsObservable("activeDeck", {
      immediate: true
    }).pipe(pluck("newValue"));

    const currentDeck$ = combineLatest(decks$, activeDeckListItem$).pipe(
      map(([decks, atIndex]) => decks[atIndex]),
      catchError(err => HANDLE_ERROR("currentDeck$", err)),
      share()
    );

    const memberIds$ = combineLatest(decks$, activeDeckListItem$).pipe(
      map(([decks, atIndex]) => decks[atIndex]),
      pluck("user_ids"),
      share()
    );

    // const members$ = memberIds$.pipe(
    //   switchMap(user_ids => {
    //     const Q = this.usersRef.where("id", "in", user_ids);
    //     return collectionData(Q);
    //   }), // TODO: in cannot handle more than 10 user_ids at a time
    //   catchError(err => HANDLE_ERROR("members$", err))
    // );

    const members$ = memberIds$.pipe(
      switchMap(user_ids => {
        const chunks$ = TO_CHUNKS(user_ids, 10).map(chunk => {
          const Q = this.usersRef.where("id", "in", chunk);
          return collectionData(Q);
        });
        return combineLatest(chunks$).pipe(map(([users]) => users));
      }),
      catchError(err => HANDLE_ERROR("members$", err))
    );

    const disks$ = currentDeck$.pipe(
      switchMap(deck => {
        if (!deck) return EMPTY;

        const Q = this.disksRef.where("deck_id", "==", deck.id);
        return collectionData(Q);
      }),
      catchError(err => HANDLE_ERROR("disks$", err)),
      share()
    );

    const activeDiskListItem$ = this.$watchAsObservable("activeDisk", {
      immediate: true
    }).pipe(pluck("newValue"));

    const currentDisk$ = combineLatest(disks$, activeDiskListItem$).pipe(
      map(([disks, atIndex]) => disks[atIndex]),
      catchError(err => HANDLE_ERROR("currentDisk$", err)),
      share()
    );

    const messages$ = currentDisk$.pipe(
      switchMap(disk => {
        if (!disk) return EMPTY;

        const Q = this.messagesRef.where("disk_id", "==", disk.id);
        return collectionData(Q);
      }),
      //   scan((previous, current) => ({
      //     isSameAuthor: previous.user_id === current.user_id,
      //     isSameMinute: current.created_at - previous.created_at <= 60, // (deltaTime <= 1 min)
      //     hideMeta: previous.isSameAuthor && previous.isSameMinute,
      //     ...current,
      //   })),
      catchError(err => HANDLE_ERROR("messages$", err))
    );

    return {
      user$,
      decks$,
      currentDeck$,
      members$,
      disks$,
      currentDisk$,
      messages$
    };
  }
};
/*
src:
https://rxmarbles.com/
https://github.com/firebase/firebase-js-sdk/tree/master/packages/rxfire/docs
https://www.learnrxjs.io/
*/

/*
https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query
let messagesRef = db.collection('messages');
messagesRef.doc().collection(message.disk_id).doc().set({
...message
}),

const user_ids = new Array(107).fill().map((x,i)=> i);
const CHUNK_SIZE = 10

// https://stackoverflow.com/a/44687374
//const chuckedArr = new Array(Math.ceil(user_ids.length / CHUNK_SIZE)).fill().map(_ => user_ids.splice(0,CHUNK_SIZE)) // mods original array
const chuckedArr = new Array(Math.ceil(user_ids.length / CHUNK_SIZE)).fill().map((_, i) => user_ids.slice(i*CHUNK_SIZE, i*CHUNK_SIZE+CHUNK_SIZE))

console.log("user_ids",user_ids)
console.log("chuncked",chuckedArr)
*/
</script>

<style scoped>
.border {
  border: 2px dashed orange;
}
</style>
