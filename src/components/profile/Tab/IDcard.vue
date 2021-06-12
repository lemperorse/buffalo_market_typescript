<template>
<div>

    <h2 class="font-semibold text-2xl">{{_lang('ยืนยันตัวตน','ID card','身份证')}}</h2><br>

    <form v-if="response" @submit.prevent="updatePersonal()">
        <v-text-field rounded class="w-full " v-model="profile.personal_id" filled :label="_lang('เลขบัตรประชาชน','ID card number','身份证号码')"></v-text-field>
         <v-btn large rounded class="w-full md:w-auto float-md-right" type="submit" color="success">{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}</v-btn>
    </form>

    <div class="mt-24">
        <h2>{{_lang('ภาพถ่ายบัตรประจำตัวประชาชน','ID card photo','賣方地址')}}</h2>
        <img v-if="profileImage.presonal_image" ref="profileImage" class="mt-4 shadow-xl h-auto w-full   align-middle border-none" :src="profileImage.presonal_image" />
        <img v-else ref="profileImage" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" />
        <input type="file" ref="profile" @change="personalImageChange" style="display:none;" /><br>
        <v-btn large rounded class="w-full md:w-auto float-md-right" @click="$refs.profile.click()" color="success">{{_lang('เปลี่ยนรูปบัตรประชาชน','Change Profile Image','变更个人资料图片')}}</v-btn>

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

.btn {
    border-radius: 5px;
    padding: 10px 20px;
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
