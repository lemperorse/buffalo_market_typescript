import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import {Core} from "@/store/core";
import {Geography, Province, Amphur, District} from '@/models/core'

@Module({generateMutationSetters: true})
class CityClass extends VuexModule {

    public dialogCityState: boolean = false;

    public currentGeo: Geography | null = null
    public currentProvince: Province | null = null
    public currentAmphur: Amphur | null = null
    public currentDistrict: District | null = null
    public showName: string | null = null


    public async getGeo(): Promise<any> {
        return await Core.getHttp('/api/default/geography/')
    }
 
    public async getProvince(geo: any): Promise<any> {
        return await Core.getHttp(`/api/default/province/?geo=${geo}`)
    }

    public async getAmphur(province: any): Promise<any> {
        return await Core.getHttp(`/api/default/amphur/?province=${province}`)
    }

    public async getDistrict(amphur: any): Promise<any> {
        return await Core.getHttp(`/api/default/district/?amphur=${amphur}`)
    }

    public async setShowName() {
        let province: any = this.currentProvince?.name
        let geo: any = this.currentGeo?.name
        let amphur: any = this.currentAmphur?.name
        let district: any = this.currentDistrict?.name
        this.showName = `${geo}-${province}-${amphur}-${district}`
    }


}

import store from "@/store"

export const City = new CityClass({store, name: "City"})
