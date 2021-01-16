<template>
<div>
    <h2 class="font-semibold text-2xl">{{_lang('ร้านค้าของคุณ','Your shop','你的店')}}</h2><br>

    <div v-if="saller">

        <div>
           
            <div class="flex flex-col">
                <div class="flex">
                    <img class="w-24 h-24 rounded-full" :src="profile.profile_image" alt="" srcset="">
                    <div class="pl-4"> <h2 class="font-semibold">ชื่อ รูปผู้ขาย และ เลขบัตรประจำตัวประชาชน</h2>
                        <h2>{{user.first_name}}&nbsp;&nbsp;{{user.last_name}} ({{profile.personal_id}})</h2>
                    </div>
                </div>
              
                <div class="flex mt-4">
                    <img class="w-24 h-auto " :src="profile.presonal_image" alt="" srcset="">
                    <div class="pl-4">   <h2 class="font-semibold" >ที่อยู่ผู้ชาย</h2>
                        <h2>{{profile.address}}</h2>
                        <h2>{{profile.geo.name}}-{{profile.province.name}}-{{profile.amphur.name}}-{{profile.district.name}}</h2>
                        <h2>{{profile.zipcode}}</h2>
                    </div>
                </div>
            </div>
        </div>

        <br> <br>
        <form v-if="response" @submit.prevent="update()">
            <div class="flex flex-wrap">
                <v-text-field class="w-full " v-model="form.name" filled :label="_lang('ชื่อทางการค้า','ชื่อทางการค้า','ชื่อทางการค้า')"></v-text-field>
                <v-text-field class="w-full " v-model="form.farm_address" filled :label="_lang('ที่อยู่ร้านค้า','ที่อยู่ร้านค้า','ที่อยู่ร้านค้า')"></v-text-field>
                <v-text-field class="w-full items-end" :value="CityFrom" @click="openCityDialog " @focus="openCityDialog" filled :label="_lang('ภูมิภาค','Region','地区')"></v-text-field>

                <v-text-field class="w-full " v-model="form.zipcode" filled :label="_lang('รหัสไปรศณีย์','รหัสไปรศณีย์','รหัสไปรศณีย์')"></v-text-field>

                <div class="relative w-full mb-3">
                    <MapView :name="'locations'" :center="{'Latitude':form.latitude,'Longitude' :form.longitude }" :locations="[
                    {'Latitude':form.latitude,'Longitude' :form.longitude } ,]" :zoom="18" :disableDefaultUI="false" :scaleControl="false" :zoomControl="false"></MapView>
                </div>
                <v-text-field class="w-full md:w-1/2" v-model="form.latitude" filled :label="_lang('พิกัดร้านค้าตามระบบ GPS (ละติจูด)','พิกัดร้านค้าตามระบบ GPS (ละติจูด)','พิกัดร้านค้าตามระบบ GPS (ละติจูด)')"></v-text-field>

                <v-text-field class="w-full md:w-1/2" v-model="form.longitude" filled :label="_lang('พิกัดร้านค้าตามระบบ GPS (ลองจิจูด)','พิกัดร้านค้าตามระบบ GPS (ลองจิจูด)','พิกัดร้านค้าตามระบบ GPS (ลองจิจูด)')"></v-text-field>

                <div class="flex flex-wrap">
                    <v-text-field class="w-full md:w-1/2" prepend-inner-icon="mdi-phone" v-model="form.tel" filled :label="_lang('เบอร์โทร','Phone number','电话号码')"></v-text-field>
                    <v-text-field class="w-full md:w-1/2" prepend-inner-icon="far fa-envelope" filled v-model="form.email" :label="_lang('อีเมล์','Email','电子邮件')"></v-text-field>
                    <v-text-field class="w-full md:w-1/2" prepend-inner-icon="fab fa-facebook" filled v-model="form.facebook" label="Facebook"></v-text-field>
                    <v-text-field class="w-full md:w-1/2" prepend-inner-icon="fab fa-line" filled v-model="form.line" label="Line"></v-text-field>
                    <v-text-field class="w-full " filled v-model="form.other" :label="_lang('อื่นๆ','Other','其他')"></v-text-field>
                </div>
            </div>

            <v-btn type=" submit" class="w-full md:w-auto float-md-right" x-large color="warning">
                <v-icon>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
            </v-btn>
        </form>

    </div>
    <div v-else>
        <v-alert type="info">
            {{_lang('คุณยังไม่มีร้านค้า หากคุณต้องการสร้างร้านค้าเพื่อลงประกาศขายของ ให้กด "สร้างสร้านค้า"','You do not have a store yet.If you want to create a store to post your listings, press "Create Shop".','您还没有商店。如果要创建一个商店来发布您的列表，请按“创建商店”。')}}
        </v-alert>

        <center>
            <v-btn @click="createShop()" x-large color="success">
                <v-icon>mdi-store</v-icon>{{_lang('สร้างร้านค้า','Create a store','建立店铺')}}
            </v-btn>
        </center>
    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import MapView from '@/components/core/Map.vue';
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Map } from "@/store/map";
import {
    City
} from "@/store/city";
@Component({
    components: { MapView },
    computed: {},
})

export default class Saller extends Vue {
    form: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    saller: boolean = false;
    async created() {
        await this.loadFarm();

    }

    async loadFarm() {
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.form = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
        if (this.form.id) {
            this.saller = true;
        }
        this.response = true;
    }

    async createShop() {
        let shop = await Core.postHttp(`/api/default/farm/`, {
            'user': this.user.pk,
            latitude: '19.0284279',
            longitude: '99.8940557'
        })

        if (shop.id) {
            alert('สร้างร้านค้าของคุณสำเร็จแล้ว')
            await this.loadFarm();
        }
    }
    get latCore() {
        return Map.lat
    }
    get lngCore() {
        return Map.lng
    }
    @Watch('latCore')
    async changeMapCore() {
        this.form.latitude = Map.lat
        this.form.longitude = Map.lng
        await this.update();
    }

    async update() {
        this.response = false
        this.form.geo = City.currentGeo ?.id
        this.form.province = City.currentProvince ?.id
        this.form.amphur = City.currentAmphur ?.id
        this.form.district = City.currentDistrict ?.id
        let farm = await Core.putHttp(`/api/default/farm/${this.form.id}/`, this.form)
        if (farm.id) {
            alert("แก้ไขข้อมูลสำเร็จ")
            // await App.success("แก้ไขข้อมูลสำเร็จ")
        } else {
            alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล")
            //await App.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล")
        }
        await this.loadFarm();
    }

    async openCityDialog() {
        City.dialogCityState = true
    }

    get CityFrom() {
        return City.showName
    }

    async setCity() {
        City.currentGeo = await Core.getHttp(`/api/default/geography/${this.form.geo}/`)
        City.currentProvince = await Core.getHttp(`/api/default/province/${this.form.province}/`)
        City.currentAmphur = await Core.getHttp(`/api/default/amphur/${this.form.amphur}/`)
        City.currentDistrict = await Core.getHttp(`/api/default/district/${this.form.district}/`)
        await City.setShowName()
    }
}
</script>

<style>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}
</style>
