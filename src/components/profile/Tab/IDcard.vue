<template>
<div>

    <h2 class="font-semibold text-2xl">{{_lang('ยืนยันตัวตน','ID card','身份证')}}</h2><br>

    <form v-if="response" @submit.prevent="updatePersonal()">
        <v-text-field class="w-full " v-model="profile.personal_id" filled :label="_lang('เลขบัตรประชาชน','ID card number','身份证号码')"></v-text-field>
        <v-btn type="submit" class="w-full md:w-auto float-md-right" color="warning">
            <v-icon>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
        </v-btn>
    </form>

    <div class="mt-24">
        <h2>ภาพถ่ายบัตรประจำตัวประชาชน</h2>

        <img v-if="profileImage.presonal_image" ref="profileImage" class="mt-4 shadow-xl h-auto w-full   align-middle border-none" :src="profileImage.presonal_image" />
        <img v-else ref="profileImage" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" />
        <input type="file" ref="profile" @change="personalImageChange" style="display:none;" /><br>
        <v-btn class="w-full md:w-auto float-md-right" @click="$refs.profile.click()" color="success">{{_lang('เปลี่ยนรูปโปรไฟล์','Change Profile Image','变更个人资料图片')}}</v-btn>

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
    profileImage:any = null ;
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

<style>
.f-white {
    color: white !important;
}
</style>
