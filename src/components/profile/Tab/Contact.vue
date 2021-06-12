<template>
<div>

    <h2 class="font-semibold text-2xl">{{_lang('ช่องทางการติดต่ออื่นๆ','Other contact channels','其他联系渠道')}}</h2><br>
    <v-alert dense border="left" type="warning">{{_lang('หากต้องการแก้ไขข้อมูล ให้ทำการกรอกข้อมูลที่ต้องการแก้ไขแล้วกด "บันทึกการเปลี่ยนแปลง" ','To edit information Please fill in the information you want to edit and press "Save changes"','请填写您要编辑的信息 然后单击保存更改')}}</v-alert>

    <div>
        <form @submit.prevent="updatePersonal()">
            <div class="flex flex-wrap">
                <v-text-field rounded prepend-inner-icon="mdi-phone" class="w-full " v-model="profile.tel" filled :label="_lang('เบอร์โทร','Phone number','电话号码')"></v-text-field>
                <v-text-field rounded prepend-inner-icon="far fa-envelope" class="w-full " filled v-model="profile.email" :label="_lang('อีเมล์','Email','电子邮件')"></v-text-field>
                <v-text-field rounded prepend-inner-icon="fab fa-facebook" class="w-full " filled v-model="profile.facebook" label="Facebook"></v-text-field>
                <v-text-field rounded prepend-inner-icon="fab fa-line" class="w-full " filled v-model="profile.line" label="Line"></v-text-field>
                <v-text-field rounded class="w-full " filled v-model="profile.other" :label="_lang('อื่นๆ','Other','其他')"></v-text-field>
            </div>
            <v-btn large rounded class="w-full md:w-auto float-md-right" type="submit" color="success">
                <v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
            </v-btn>

        </form>
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

export default class Profile extends Vue {

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
}
</script>

<style scoped>
.f-white {
    color: white !important;
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
</style>
