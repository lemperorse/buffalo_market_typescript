import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import {Core} from "@/store/core";

@Module({generateMutationSetters: true})
class UserClass extends VuexModule {
    public user:object | null = null
    public permission :object|null = null
    public routeUser : string = '/'
    public userImage:any = null 
    public async autoCreateProfile(from:any): Promise<any>{
        return Core.postHttp('/api/profile/create/',from)
    }

    public async getUser(){
        return await Core.getHttp('/api/auth/user/')
    }

    public async loadUser(){
        let user = await this.getUser();
        if(user.pk){
            let permission = await Core.getHttp(`/api/account/${user.pk}/`)
            this.user = user;
            this.permission = permission.is_staff
            this.routeUser = (permission.is_staff)?'/admin/':'/user/'
        }
    }

    public async getProfile(){
        let user:any = await this.getUser();
        let profile =   await Core.getHttp(`/api/default/profile/?user=${user.pk}`) 
        if(profile[0].id){ 
            return profile [0]
        }else { return null}
    }
    public async getProfileFull(){
        let user:any = await this.getUser();
        let profile =   await Core.getHttp(`/api/default/profilefull/?user=${user.pk}`) 
        if(profile[0].id){ 
            return profile [0]
        }else { return null}
    }
    public async getImageProfile(){
        let user = await this.getProfile()
        let profile =   await Core.getHttp(`/api/user/profile/image/${user[0].id}/`) 
        if(profile.profile_image){
            this.userImage = profile.userImage
            return profile.userImage
        }else{
            this.userImage = null
        }
    }


   



}

import store from "@/store"

export const User = new UserClass({store, name: "User"})
