import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import {Core} from "@/store/core";

@Module({generateMutationSetters: true})
class UserClass extends VuexModule {
    public user:object | null = null
    public permission :object|null = null
    public routeUser : string = '/'
    public async autoCreateProfile(from:any): Promise<any>{
        return Core.postHttp('/api/profile/create/',from)
    }

    public async getUser(){
        return await Core.getHttp('/api/rest-auth/user/')
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



}

import store from "@/store"

export const User = new UserClass({store, name: "User"})
