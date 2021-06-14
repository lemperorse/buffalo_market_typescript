<template>
<div>
    <h2 class="font-semibold text-2xl">{{_lang('ข้อมูลส่วนตัว','Profile','个人信息')}}</h2><br>
    <v-alert dense border="left" type="warning">{{_lang('หากต้องการแก้ไขข้อมูล ให้ทำการกรอกข้อมูลที่ต้องการแก้ไขแล้วกด "บันทึกการเปลี่ยนแปลง" ','To edit information Please fill in the information you want to edit and press "Save changes"','请填写您要编辑的信息 然后单击保存更改')}}</v-alert>

    <form @submit.prevent="saveUser()">
        <div class="flex flex-wrap">
            <v-text-field rounded class="w-full md:w-1/2" disabled v-model="form.username" filled :label="_lang('ชื่อผู้ใช้','Username','用户名')" prepend-inner-icon="mdi-face"></v-text-field>
            <v-text-field rounded class="w-full md:w-1/2" filled v-model="form.email" :label="_lang('อีเมล์','Email','电子邮件')" prepend-inner-icon="mdi-email-outline"></v-text-field>
            <v-select rounded filled    class="w-full md:w-1/5" :items="$txt.language" v-model="profile.prefix" :label="_lang('คำนำหน้า','Prefix','字首')" prepend-inner-icon="mdi-card-account-details-outline"></v-select>
            <v-text-field rounded class="w-full md:w-2/5" filled v-model="form.first_name" :label="_lang('ชื่อจริง','First Name','名字')" prepend-inner-icon="mdi-card-account-details-outline"></v-text-field>
            <v-text-field rounded class="w-full md:w-2/5" filled v-model="form.last_name" :label="_lang('นามสกุล','Last Name','姓')" prepend-inner-icon="mdi-card-account-details-outline"></v-text-field>
            <hr>
            <v-text-field rounded class="w-full md:w-1/2" type="date" filled v-model="profile.birthday" :label="_lang('วันเกิด','Birthday','生日')" prepend-inner-icon="mdi-cake"></v-text-field>
            <v-text-field rounded class="w-full md:w-1/2" disabled filled v-model="profile.age" :label="_lang('อายุ','Age','年齡')" prepend-inner-icon="mdi-cake"></v-text-field>

            <v-text-field rounded class="w-full " filled v-model="profile.my_address" :label="_lang('ที่อยู่','Address','地址')" prepend-inner-icon="mdi-home-city-outline"></v-text-field>

            <v-text-field rounded class="w-full items-end" :value="CityFrom" @click="openCityDialog " @focus="openCityDialog" filled :label="_lang('ภูมิภาค','Region','地區')" prepend-inner-icon="mdi-home-group"></v-text-field>
            <v-text-field rounded class="w-full  " v-model="profile.zipcode" filled :label="_lang('รหัสไปรษณีย์','Postal code','郵政編碼')" prepend-inner-icon="mdi-postage-stamp"></v-text-field>

        </div>
        <v-btn x-large rounded class="w-full bgbtn" dark type="submit">
            <v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
        </v-btn>

    </form>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import {
    City
} from "@/store/city";
import moment from "moment";
@Component({
    components: {},
    computed: {}
})

export default class Profile extends Vue {
    response: boolean = false
    form: any = {};
    profile: any = {}
    update: boolean = true;
    async created() {
        await this.loadChoices();
        await this.load();

    }
    async load() {
        await Auth.checkToken();
        if (Auth.logined) {
            this.form = await Auth.getUser()
            this.profile = await Core.getHttp(`/api/default/profile/?user=${this.form.pk}`)
            if (this.profile[0]) {
                this.profile = this.profile[0]
                await this.setCity()
            } else {
                this.profile = {}
                this.update = false;
            }
            this.response = true;
        }
    }

    choices: any = {}
    async loadChoices() {
        this.choices = {
            "prefix": {
                th:['นาย','นาง','นางสาว'],
                en:['Mr.','Mrs.','Miss'],
                ch:['先生','女士','小姐']
            },
            "sex": await Core.getChoice('เพศ'),
        }
    }

    async saveUser() {
        this.profile.geo = City.currentGeo ?.id
        this.profile.province = City.currentProvince ?.id
        this.profile.amphur = City.currentAmphur ?.id
        this.profile.district = City.currentDistrict ?.id
        if (this.update) {
            await Core.putHttp(`/api/auth/user/`, this.form)
            await Core.putHttp(`/api/default/profile/${this.profile.id}/`, this.profile)
            await this.load();
        } else {
            console.log(this.profile)
            this.profile.user = this.form.pk
            await Core.putHttp(`/api/auth/user/`, this.form)
            await Core.postHttp(`/api/default/profile/`, this.profile)
            await this.load();
        }

    }

    async openCityDialog() {
        City.dialogCityState = true
    }

    get CityFrom() {
        return City.showName
    }

    async setCity() {
        City.currentGeo = await Core.getHttp(`/api/default/geography/${this.profile.geo}/`)
        City.currentProvince = await Core.getHttp(`/api/default/province/${this.profile.province}/`)
        City.currentAmphur = await Core.getHttp(`/api/default/amphur/${this.profile.amphur}/`)
        City.currentDistrict = await Core.getHttp(`/api/default/district/${this.profile.district}/`)
        await City.setShowName()
    }

    @Watch('profile.birthday')
    async onChangeProvince(val: string) {
        this.profile.age = moment().diff(val, 'years', false);

    }
}
</script>

<style scoped>
.f-white {
    color: white !important;
} 
.bgbtn{
    background-color: #0ead69;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
