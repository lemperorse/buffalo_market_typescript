<template>
<div>
    <v-app>
        <Loading />
        <WebNav /><br><br><br><br>
        <v-main class=" bg-gray-100">
            <router-view />
        </v-main>

        <Footer></Footer>
    </v-app>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import WebNav from '../../components/core/WebNav.vue'
import Footer from '../../components/core/Footer.vue'
import Loading from '../../components/core/loading.vue'
@Component({
    components: {
        WebNav,
        Footer,
        Loading
    },
    computed: {}
})

export default class Test extends Vue {

}
</script>

<style scoped>

</style>
