<template>
<div>
   <v-toolbar flat color="transparent">
   <h2 class="font-semibold text-2xl">{{_lang('ร้านค้าของคุณ','Your shop','你的店')}}</h2><br>
   <v-spacer></v-spacer>
   <v-btn rounded large outlined @click="$router.push('/user/myshop/')" color="orange">ไปยังเมนูหน้าร้าน</v-btn>
   </v-toolbar>

    <div v-if="saller">

        <div>

            <div class="flex flex-col">
                <div class="flex flex-col md:flex-row justify-around">
                    <div class="pl-4 mt-4 flex">
                    <img class="w-24 h-24 rounded-full" :src="$server+'/'+profile.profile_image" alt="" srcset="">
                        <div class="ml-4">
                        <h2 class="text-xl">{{_lang('ผู้ขาย-ซื้อ','Seller name','賣家名稱')}} : {{user.first_name}}&nbsp;&nbsp;{{user.last_name}}</h2>
                        <h2 class="text-ิฟหำ text-gray-600">{{_lang('เลขบัตรประชาชน','ID card number','身份證號碼')}} : {{profile.personal_id}}</h2>
                  
                        </div>
                      </div>
                    <div class="pl-4">    <hr><br>
                        <h2 class="">{{_lang('ที่อยู่ผู้ขาย','Seller address','賣方地址')}} : {{profile.my_address}}</h2>
                        <h2>{{profile.geo.name}} {{profile.province.name}} {{profile.amphur.name}} {{profile.district.name}}</h2>
                        <h2 class="">{{_lang('รหัสไปรษณีย์','Zip code','郵政編碼')}} : {{profile.zipcode}}</h2>
                    </div>
                </div>

                <div class="flex mt-4 ">
                 
                   
                </div>
            </div>
        </div>

        <br> <br>
        <form v-if="response" @submit.prevent="update()">
            <div class="flex flex-wrap">
                <v-text-field rounded class="w-full " v-model="form.name" filled :label="_lang('ชื่อทางการค้า','Trade name','商品名')" prepend-inner-icon="mdi-card-account-details-outline"></v-text-field>
                <v-text-field rounded class="w-full " v-model="form.farm_address" filled :label="_lang('ที่อยู่ร้านค้า','Shop address','店鋪地址')" prepend-inner-icon="mdi-home-city-outline"></v-text-field>
                <v-text-field rounded class="w-full items-end" :value="CityFrom" @click="openCityDialog " @focus="openCityDialog" filled :label="_lang('จังหวัดที่อยู่ร้านค้า','province, shop address','省、店地址')" prepend-inner-icon="mdi-home-group"></v-text-field>

                <v-text-field rounded class="w-full " type="number" v-model="form.zipcode" filled :label="_lang('รหัสไปรษณีย์','Postal code','郵政編碼')" prepend-inner-icon="mdi-id-card"></v-text-field>

                <div class="relative w-full mb-3"> 
                    <MapView :name="'locations'" :center="currentLocation.center" :locations="currentLocation.mark" :zoom="16" :disableDefaultUI="false" :scaleControl="false" :zoomControl="false"></MapView>
                </div>    
                <v-text-field rounded class="w-full md:w-1/2" v-model="form.location" filled :label="_lang('พิกัดร้านค้าตามระบบ GPS (ละติจูด,ลองจิจูด)','GPS (Latitude,Longitude)','GPS（緯度,經度)')" prepend-inner-icon="mdi-google-maps"></v-text-field>
                <div class="flex flex-wrap">
                    <v-text-field rounded type="number" class="w-full md:w-1/2" prepend-inner-icon="mdi-phone" v-model="form.tel" filled :label="_lang('เบอร์โทร','Phone number','电话号码')"></v-text-field>
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="far fa-envelope" filled v-model="form.email" :label="_lang('อีเมล์','Email','电子邮件')"></v-text-field>
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="fab fa-facebook" filled v-model="form.facebook" label="Facebook"></v-text-field>
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="fab fa-line" filled v-model="form.line" label="Line"></v-text-field>
                    <v-text-field rounded class="w-full " filled v-model="form.other" :label="_lang('อื่นๆ','Other','其他')" prepend-inner-icon="mdi-progress-question"></v-text-field>
                </div>
            </div> 
            <v-btn large rounded depressed class="w-full bgbtn" color="green accent-4" dark type="submit">
                <v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
            </v-btn>
        </form>

    </div> 
    <div v-else>
        <v-alert type="info">
            {{_lang('คุณยังไม่มีร้านค้า หากคุณต้องการสร้างร้านค้าเพื่อลงประกาศขายของ ให้กด "สร้างสร้านค้า"','You do not have a store yet.If you want to create a store to post your listings, press "Create Shop".','您还没有商店。如果要创建一个商店来发布您的列表，请按“创建商店”。')}}
        </v-alert>
        <v-btn @click="createShop()" large depressed rounded class="w-full bgbtn" color="green accent-4" dark type="submit" >
            <v-icon dark>mdi-store</v-icon>{{_lang('สร้างร้านค้า','Create a store','建立店铺')}}
        </v-btn>
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
    currentLocation:any ={}

    async created() {
        await this.loadFarm();

    }

    async loadFarm() {
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.form = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
        if (this.form.id) {
            this.saller = true; 
            await this.generateMap()
        }
        this.response = true;
    }

    async generateMap(){
         this.response = false;
        let map = (this.form.location).split(',')
        if(map.length > 1){ 
            this.currentLocation = {
                center : {'Latitude':parseFloat(map[0]) ,'Longitude' : parseFloat(map[1]) },
                mark : [{'Latitude':parseFloat(map[0]),'Longitude' :parseFloat(map[1]) } ,]  
            }
        }
    }

    async createShop() {
        let shop = await Core.postHttp(`/api/default/farm/`, {
            'user': this.user.pk,
            location:'19.0284279,99.8940557', 
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
        this.form.location = `${Map.lat},${Map.lng}`
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

<style scoped>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}

.bgbtn{ 
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
}
</style>
