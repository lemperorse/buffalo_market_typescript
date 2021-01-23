<template>
<div>
    <h2 class="font-semibold text-2xl">{{_lang('ข้อมูลส่วนตัว','Profile','个人信息')}}</h2><br>
    <v-alert dense border="left" type="warning">{{_lang('หากต้องการแก้ไขข้อมูล ให้ทำการกรอกข้อมูลที่ต้องการแก้ไขแล้วกด "บันทึกการเปลี่ยนแปลง" ','To edit information Please fill in the information you want to edit and press "Save changes"','请填写您要编辑的信息 然后单击保存更改')}}</v-alert>

    <form @submit.prevent="saveUser()">
        <div class="flex flex-wrap">
            <v-text-field class="w-full md:w-1/2" disabled v-model="form.username" filled :label="_lang('ชื่อผู้ใช้','Username','用户名')"></v-text-field>
            <v-text-field class="w-full md:w-1/2" filled v-model="form.email" :label="_lang('อีเมล์','Email','电子邮件')"></v-text-field>
            <v-select filled item-value="id" :item-text="_lang('value_th','value_en','value_ch')" class="w-full md:w-1/5" :items="choices.prefix" v-model="profile.prefix" :label="_lang('คำนำหน้า','Prefix','字首')"></v-select>
            <v-text-field class="w-full md:w-2/5" filled v-model="form.first_name" :label="_lang('ชื่อจริง','First Name','名字')"></v-text-field>
            <v-text-field class="w-full md:w-2/5" filled v-model="form.last_name" :label="_lang('นามสกุล','Last Name','姓')"></v-text-field>
            <hr>
            <v-text-field class="w-full md:w-1/2" type="date" filled v-model="profile.birthday" :label="_lang('วันเกิด','Birthday','生日')"></v-text-field>
            <v-text-field class="w-full md:w-1/2" disabled filled v-model="profile.age" :label="_lang('อายุ','Age','年齡')"></v-text-field>

            <v-text-field class="w-full " filled v-model="profile.address" :label="_lang('ที่อยู่','Address','地址')"></v-text-field>

            <v-text-field class="w-full items-end" :value="CityFrom" @click="openCityDialog " @focus="openCityDialog" filled :label="_lang('ภูมิภาค','Region','地區')"></v-text-field>
            <v-text-field class="w-full  " v-model="profile.zipcode" filled :label="_lang('รหัสไปรษณีย์','Postal code','郵政編碼')"></v-text-field>

        </div>
        <v-btn type="submit" class="w-full md:w-auto float-md-right" x-large color="warning">
            <v-icon>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
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
            "prefix": await Core.getChoice('คำนำหน้า'),
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

<style>
.f-white {
    color: white !important;
}
</style>
