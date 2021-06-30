<template>
<div v-if="response" >
    <div class="pt-8"  >
        <div>
            <center class="m-4">
                <h2 class="text-4xl"> <i class="em em-world_map" aria-role="presentation" aria-label=""></i>{{_lang('แผนที่สถานที่สำคัญ','Landmark map','地標地圖')}}</h2>
            </center>
            <center class="m-4">
                <p class="text-xl">{{_lang('แผนที่ตั้งของเกษตร ผู้ผลิต สถานที่สำคัญที่เกี่ยวข้อง','Map of agriculture Manufacturer Related landmarks','農業地圖 製造商 相關地標')}}</p>
            </center>
            <MapView :locations='locations' :center="{'Latitude':19.0308857,'Longitude' :99.9258682 }" />
            <!-- <pre>{{maps}}</pre> -->

            <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
                <v-card v-if="detail">
                    <v-card-title primary-title>
                        {{detail.name}}
                        <v-spacer></v-spacer>
                        <v-btn fab small text @click="closeMap">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <p> {{detail.address}}</p>
                        <p> {{detail.other}}</p> 
                        <MapView :locations="[{'Latitude':detail.latitude,'Longitude' :detail.longitude}]" :zoom="20" :zoomControl="true" :center="{'Latitude':detail.latitude,'Longitude' :detail.longitude}" />
                        <v-btn class="w-full mt-2" x-large @click="openMap(detail.location)" color="success">{{_lang('เปิดแผนที่นำทาง','Open navigation map','打開導航圖')}}</v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>

    <div class="p-6">
        <h2 class="text-2xl">รายชื่อสถานที่สำคัญ</h2><br>
        <le-menu class="m-4" v-for="(map,i) in maps" :key="i"  :name="map.name" :text="map.address" :detail="dateOut(map.created_at)" />
    </div>
 

</div>
</template>

<script lang="ts">
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import _ from 'lodash'
import { Component, Vue, Watch } from "vue-property-decorator";
import MapView from '@/components/core/MapView.vue'
import { Map } from '@/store/map'
import moment from 'moment'
@Component({
    components: {
        MapView
    },
    computed: {}
})

export default class Navbar extends Vue {
    maps: any = null
    response: boolean = false
    test:any = []

    async created() {
        await this.getMap();
        this.response = true;
    }
    locations: any = []

    async getMap() {
        this.maps = await Core.getHttp(`/api/default/map/`)
        let map:any = _.map(this.maps,'location') 
        for (let index = 0; index < this.maps.length; index++) {
            let data =  _.split(map[index], ',' ) 
            if(data.length == 2){
                this.maps[index]['latitude'] = data[0]
                this.maps[index]['longitude'] = data[1]
                this.locations.push({ Latitude: data[0], Longitude: data[1], data: this.maps[index] })
            }
          
        } 
    }

    get dialog() {
        return Map.dialog   
    }
    get detail() {
        return Map.detail
    }
    async closeMap() {
        await Map.setDialog(false)
    }

    async openBrowser(position: any) {
        let me = `${position.coords.latitude},${position.coords.longitude}`
        let to = `${this.detail.latitude},${this.detail.longitude}`
        console.log(me, `https://www.google.com/maps/dir/?api=1&origin=${me}&destination=${to}`);
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${me}&destination=${to}`, '_blank');
    }
    async openMap(location:any) {
        let origin = `19.0199381,99.9218023`
        if (navigator.geolocation) {
           await navigator.geolocation.getCurrentPosition((position:any)=>{
                origin = `${position.coords.latitude},${position.coords.longitude}`
            });
        }  
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${location}`);

    }

    dateOut(date:any){
        let convert = moment(date).format('DD/MM/YYYY')
        return convert
    } 

}
</script>

<style scoped>
.sizemap {
    width: 300px;
    height: 300px;
}
</style>
