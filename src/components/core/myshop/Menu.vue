<template>
<v-card :class="`rounded-lg `+c" flat elevation="3" v-if="width > 1025">
    <v-card-title primary-title>
        <h2 class="wrap-txt ">{{name}}</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
        <center>
            <img class="hvr-grow" @click="$router.push(path)" :src="image" :height="h" :width="w" alt="">

            <br>
            <h2 class="font-bold text-black">

                {{head}}</h2>
            <p>{{txt}} </p>
        </center>
    </v-card-text>
    <v-card-actions>

        <v-btn color="teal darken-4" block text @click="$router.push(path)"><v-icon>mdi-circle-edit-outline</v-icon> {{caption}}</v-btn>

    </v-card-actions>
</v-card>

<v-card flat elevation="3" v-else>
    <v-card-title primary-title>
        <h2 class="wrap-txt ">{{name}}</h2>
    </v-card-title>
    <v-divider></v-divider>
    <div class="flex flex-row items-center">
        <v-avatar class="ma-3" size="125" tile>
            <v-img :src="image"></v-img>
        </v-avatar>
        <div>
            <h2 class="font-bold text-black mt-6"> 
                {{head}}</h2>
            <p class="text-gray-500">{{txt}} </p>

            <v-card-actions>
                <v-btn color="teal darken-4" block text @click="$router.push(path)"><v-icon>mdi-circle-edit-outline</v-icon> {{caption}}</v-btn>
            </v-card-actions>
        </div>

    </div>
</v-card>
</template>

<script>
export default {

    props: {
        c: {
            default: 'h-full'
        },
        h: {
            default: '100px'
        },
        w: {
            default: '100px'
        },
        image: {
            default: './assets/buffalo/buffalo.png'
        },
        name: {
            default: 'Title Menu'
        },
        caption: {
            default: ''
        },
        path: {
            default: '/'
        },
        txt: {
            default: ''
        },
        head: {
            default: 'แก้ไขทันที'
        }
    },

    computed: {
        width() {
            return this.$vuetify.breakpoint.width
        }
    }

}
</script>

<style>
.wrap-txt {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
