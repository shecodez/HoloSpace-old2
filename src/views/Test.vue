<template>
  <v-row no-gutters>
    <v-col cols="auto">
      <v-card tile min-width="80">
        <v-subheader>Decks</v-subheader>

        <v-list>
          <v-list-item-group mandatory>
            <v-list-item v-for="deck of decks$" :key="deck.id" :to="`/test/d/${deck.id}`">
              <v-avatar color="grey" class="my-2">
                <span>{{ deck.name.charAt(0) }}</span>
              </v-avatar>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="auto">
      <v-card class="hs-disks" outlined width="256">
        <v-subheader>{{ currentDeck$ }}</v-subheader>
        <v-divider></v-divider>

        <!-- <v-subheader>TEXT</v-subheader>
        <v-list dense>
          <v-list-item-group active-class="hs-active" mandatory>
            <v-list-item v-for="disk of textDisks$" :key="disk.id" :to="linkTo(disk)">
              <v-icon v-if="disk.type === 'TEXT'" small left>mdi-pound</v-icon>
              {{ disk.name }}
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>-->

        <v-expansion-panels accordion multiple flat tile>
          <DiskTree type="TEXT" :disks="textDisks$" />
          <DiskTree type="VOIP" :disks="voipDisks$" />
          <DiskTree type="HOLO" :disks="holoDisks$" />
        </v-expansion-panels>
      </v-card>
    </v-col>

    <v-col cols="8">
      <v-card outlined>
        <v-subheader>{{ currentDisk$ }}</v-subheader>
        <v-divider></v-divider>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="message of messages$" :key="message.id">
              <v-list-item-content>
                <v-list-item-title>{{ userLookupObj$[message.user_id].name }}</v-list-item-title>

                <v-img v-if="message.media" :src="message.media" />
                <span v-else>{{ message.text }}</span>
              </v-list-item-content>
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
import { map, pluck, catchError, share, switchMap, scan } from "rxjs/operators";
import { EMPTY, combineLatest } from "rxjs";

//import Avatar from "@/components/Avatar";
import DiskTree from "@/components/test/DiskTree";

export default {
  name: "Test",
  components: { DiskTree },
  data: () => ({
    //activeDeck: null,
    //activeDisk: null,

    decksRef: db.collection("decks"),
    disksRef: db.collection("disks"),
    messagesRef: db.collection("messages"),
    usersRef: db.collection("users")
  }),
  computed: {
    routeParamsDeckId() {
      return this.$route.params.deck_id;
    },
    routeParamsDiskId() {
      return this.$route.params.disk_id;
    }
  },
  methods: {
    linkTo(disk) {
      const IS_HOLO = disk.type === "HOLO";

      if (this.$route.name.includes("Direct")) {
        // HOLO ? ~/direct/d/holo/:disk_id ~/direct/d/:disk_id
        return `/direct/d${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      } else {
        // HOLO ? ~/d/:deck_id/:disk_id : `~/d/:deck_id/:disk_id
        return `/test/d/${disk.deck_id}${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      }
    },
    async getPresence(disk) {
      let users = [
        { id: 1, name: "Lenne Graham" },
        { id: 2, name: "Erbom Nells" },
        { id: 3, name: "Baunch Clementine" }
      ];
      // let users = docData(db.doc(`presence/${disk.id}`));
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve(users), 1500);
      });

      return promise
        .then(users => disk.children.push(...users))
        .catch(err => console.error(err));
    }
  },
  subscriptions() {
    const HANDLE_ERROR = (origin, error) => {
      console.error(origin, error);
      return EMPTY;
    };

    const TO_CHUNKS = (arr, chunkSize) =>
      new Array(Math.ceil(arr.length / chunkSize))
        .fill()
        .map((_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));

    // const MESSAGE_BLOCKS = (messages) =>
    //   from(messages).scan((previous, current) => ({
    //     isSameAuthor: previous.user_id === current.user_id,
    //     isSameMinute: current.created_at - previous.created_at <= 60, // (deltaTime <= 1 min)
    //     hideMeta: previous.isSameAuthor && previous.isSameMinute,
    //     ...current,
    //   }));

    // const FORMAT_CHAT = (messages, members) => {
    //   return messages.map(message => ({
    //     ...message,
    //     author: members[message.user_id]
    //   }));
    // };

    const user$ = authState(firebase.auth()).pipe(
      switchMap(user => {
        return docData(db.doc(`users/${user.uid}`));
      })
    );

    const decks$ = user$.pipe(
      switchMap(user => {
        const Q = this.decksRef.where("user_ids", "array-contains", user.id);
        this.decks = collectionData(Q);
        return collectionData(Q);
      }),
      catchError(err => HANDLE_ERROR("decks$", err)),
      share()
    );

    const activeDeck$ = this.$watchAsObservable("routeParamsDeckId", {
      immediate: true
    }).pipe(pluck("newValue"));

    const currentDeck$ = combineLatest(decks$, activeDeck$).pipe(
      map(([decks, routeDeckId]) => decks.find(d => d.id === routeDeckId)),
      catchError(err => HANDLE_ERROR("currentDeck$", err)),
      share()
    );

    const members$ = currentDeck$.pipe(
      pluck("user_ids"),
      switchMap(user_ids => {
        // from(user_ids).pipe(
        //   bufferCount(10),
        //   mergeMap(chunk => {
        //     const Q = this.usersRef.where("id", "in", chunk);
        //     return collectionData(Q);
        //   })
        // );
        const chunks$ = TO_CHUNKS(user_ids, 10).map(chunk => {
          const Q = this.usersRef.where("id", "in", chunk);
          return collectionData(Q);
        });
        return combineLatest(chunks$).pipe(map(([users]) => users));
      }),
      catchError(err => HANDLE_ERROR("members$", err)),
      share()
    );

    const userLookupObj$ = members$.pipe(
      switchMap(members => members),
      scan((obj, member) => {
        obj[member.id] = member;
        return obj;
      }, {})
    );

    const disks$ = currentDeck$.pipe(
      switchMap(deck => {
        if (!deck) return EMPTY;

        const Q = this.disksRef.where("deck_id", "==", deck.id).orderBy("name");
        return collectionData(Q);
      }),
      catchError(err => HANDLE_ERROR("disks$", err)),
      share()
    );

    const textDisks$ = disks$.pipe(
      map(disks => disks.filter(d => d.type === "TEXT"))
    );
    const holoDisks$ = disks$.pipe(
      map(disks => disks.filter(d => d.type === "HOLO"))
    );
    const voipDisks$ = disks$.pipe(
      map(disks => disks.filter(d => d.type === "VOIP"))
    );

    const activeDisk$ = this.$watchAsObservable("routeParamsDiskId", {
      immediate: true
    }).pipe(pluck("newValue"));

    const currentDisk$ = combineLatest(disks$, activeDisk$).pipe(
      map(([disks, routeDiskId]) => disks.find(d => d.id === routeDiskId)),
      catchError(err => HANDLE_ERROR("currentDisk$", err)),
      share()
    );

    const messages$ = currentDisk$.pipe(
      switchMap(disk => {
        if (!disk) return EMPTY;

        const Q = this.messagesRef
          .where("disk_id", "==", disk.id)
          .orderBy("created_at");
        return collectionData(Q);
      }),
      catchError(err => HANDLE_ERROR("messages$", err))
    );

    // const chat$ = combineLatest(messages$, userLookupObj$).pipe(
    //   map(chat => ({
    //     messages: chat[0],
    //     members: chat[1]
    //   }))
    // );

    return {
      user$,
      decks$,
      currentDeck$,
      members$,
      userLookupObj$,
      textDisks$,
      holoDisks$,
      voipDisks$,
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

<style lang="scss">
.hs-disks {
  background-color: transparent !important;

  .v-expansion-panel-content__wrap {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
