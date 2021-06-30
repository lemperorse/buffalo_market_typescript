<template>
<div>

    <h2 class="font-semibold text-2xl">{{_lang('ยืนยันตัวตน','ID card','身份证')}}</h2><br>

    <form v-if="response" @submit.prevent="updatePersonal()">
        <v-text-field rounded type="number" class="w-full " v-model="profile.personal_id" filled :label="_lang('เลขบัตรประชาชน','ID card number','身份证号码')" prepend-inner-icon="mdi-id-card"></v-text-field>
        <v-btn large depressed rounded class="w-full bgbtn" color="green accent-4" dark type="submit"><v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึกเลขบัตรประชาชน','Save Change','保存更改')}}</v-btn>
    </form>

    <div class="mt-24">
        <h2>{{_lang('ภาพถ่ายบัตรประจำตัวประชาชน','ID card photo','賣方地址')}}</h2>
        <center>
        <img v-if="profileImage.presonal_image" ref="profileImage" class="mt-4 h-120 w-120 rounded-lg align-middle border-none" 
        :src="$server+'/'+profileImage.presonal_image" />
        <img v-else ref="profileImage" class="mt-4 rounded-full align-middle border-none" src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" />
        <input type="file" ref="profile" @change="personalImageChange" style="display:none;" /><br>
        </center>
        <v-btn depressed large rounded class="w-full bg-btn" color="green accent-4" dark @click="$refs.profile.click()"><v-icon dark>mdi-image-frame</v-icon>{{_lang('เปลี่ยนรูปบัตรประชาชน','Change Profile Image','变更个人资料图片')}}</v-btn>

    </div>

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
@Component({
    components: {},
    computed: {}
})

export default class Personal extends Vue {
    profile: any = null
    profileImage: any = null;
    response: boolean = false
    async created() {
        await this.loadProfile()
        this.response = true;
    }
    async loadProfile() {
        this.profile = await User.getProfile()
        this.profileImage = await Core.getHttp(`/api/user/personal/image/${this.profile.id}/`)
    }
    async updatePersonal() {
        let update = await Core.putHttp(`/api/default/profile/${this.profile.id}/`, this.profile)
        if (update.id) {
            alert('Successfully saved data')
            await this.loadProfile() //.$_lang('บันทึกข้อมูลสำเร็จ','Successfully saved data','成功保存数据')
        }

    }

    async personalImageChange(event: any) {
        let file = await this.getBase64(event.target.files[0])
        let profileImage: any = this.$refs.profileImage
        profileImage.src = file
        this.profileImage.presonal_image = file
        let data = await Core.putHttp(`/api/user/personal/image/${this.profile.id}/`, this.profileImage)
        if (data.id) {
            alert("success")
        }
    }

    async getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

}
</script>

<style scoped>
.f-white {
    color: white !important;
} 
.bgbtn{ 
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
}
</style>
