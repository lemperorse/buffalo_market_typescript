import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import {Core} from "@/store/core";
@Module({generateMutationSetters: true})
class MapClass extends VuexModule {

    public lat:number =  0.00
    public lng:number =  0.00

    public detail:any = null;
    public dialog:boolean = false
    public setDialog(val:boolean){
        this.dialog = val
    }

}

import store from "@/store"

export const Map = new MapClass({store, name: "Map"})
