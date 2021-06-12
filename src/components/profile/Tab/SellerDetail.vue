<template>
<div>
    <h2 class="font-semibold text-2xl">{{_lang('ร้านค้าของคุณ','Your shop','你的店')}}</h2><br>

    <div v-if="saller">

        <div>

            <div class="flex flex-col">
                <div class="flex">
                    <img class="w-24 h-24 rounded-full" :src="profile.profile_image" alt="" srcset="">
                    <div class="pl-4">
                        <h2 class="font-semibold">{{_lang('ชื่อ รูปผู้ขาย และ เลขบัตรประจำตัวประชาชน','Name, Image and ID card number','姓名，商戶圖像和身份證號')}}</h2>
                        <h2>{{user.first_name}}&nbsp;&nbsp;{{user.last_name}} ({{profile.personal_id}})</h2>
                    </div>
                </div>

                <div class="flex mt-4">
                    <img class="w-24 h-auto " :src="profile.presonal_image" alt="" srcset="">
                    <div class="pl-4">
                        <h2 class="font-semibold">{{_lang('ที่อยู่ผู้ขาย','Seller address','賣方地址')}}</h2>
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
                <v-text-field rounded class="w-full " v-model="form.name" filled :label="_lang('ชื่อทางการค้า','Trade name','商品名')"></v-text-field>
                <v-text-field rounded class="w-full " v-model="form.farm_address" filled :label="_lang('ที่อยู่ร้านค้า','Shop address','店鋪地址')"></v-text-field>
                <v-text-field rounded class="w-full items-end" :value="CityFrom" @click="openCityDialog " @focus="openCityDialog" filled :label="_lang('ภูมิภาค','Region','地区')"></v-text-field>

                <v-text-field class="w-full " v-model="form.zipcode" filled :label="_lang('รหัสไปรษณีย์','Postal code','郵政編碼')"></v-text-field>

                <div class="relative w-full mb-3">
                    <MapView :name="'locations'" :center="{'Latitude':form.latitude,'Longitude' :form.longitude }" :locations="[
                    {'Latitude':form.latitude,'Longitude' :form.longitude } ,]" :zoom="18" :disableDefaultUI="false" :scaleControl="false" :zoomControl="false"></MapView>
                </div>
                <v-text-field rounded class="w-full md:w-1/2" v-model="form.latitude" filled :label="_lang('พิกัดร้านค้าตามระบบ GPS (ละติจูด)','GPS (Latitude)','GPS（緯度')"></v-text-field>

                <v-text-field rounded class="w-full md:w-1/2" v-model="form.longitude" filled :label="_lang('พิกัดร้านค้าตามระบบ GPS (ลองจิจูด)','GPS (Longitude)','GPS（經度）')"></v-text-field>

                <div class="flex flex-wrap">
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="mdi-phone" v-model="form.tel" filled :label="_lang('เบอร์โทร','Phone number','电话号码')"></v-text-field>
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="far fa-envelope" filled v-model="form.email" :label="_lang('อีเมล์','Email','电子邮件')"></v-text-field>
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="fab fa-facebook" filled v-model="form.facebook" label="Facebook"></v-text-field>
                    <v-text-field rounded class="w-full md:w-1/2" prepend-inner-icon="fab fa-line" filled v-model="form.line" label="Line"></v-text-field>
                    <v-text-field rounded class="w-full " filled v-model="form.other" :label="_lang('อื่นๆ','Other','其他')"></v-text-field>
                </div>
            </div> 
            <v-btn large rounded class="w-full md:w-auto float-md-right" type="submit" color="success">
                <v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
            </v-btn>
        </form>

    </div>
    <div v-else>
        <v-alert type="info">
            {{_lang('คุณยังไม่มีร้านค้า หากคุณต้องการสร้างร้านค้าเพื่อลงประกาศขายของ ให้กด "สร้างสร้านค้า"','You do not have a store yet.If you want to create a store to post your listings, press "Create Shop".','您还没有商店。如果要创建一个商店来发布您的列表，请按“创建商店”。')}}
        </v-alert>
        <v-btn @click="createShop()" large rounded class="w-full md:w-auto float-md-right" type="submit" color="success">
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

<style scoped>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}

.btn {
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 18px;
    text-decoration: none;
    color: #fff;
    position: relative;
    display: inline-block;
}

.btn:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px;
}

.orange1 {
    background-color: #FB8500;
    box-shadow: 0px 5px 0px 0px #CD6509;
}
.orange1:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
}

.green1 {
    background-color: #0EAD69;
    box-shadow: 0px 5px 0px 0px #283D3B;
}

.green1:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(5, 150, 105, var(--tw-bg-opacity));
}
</style>
