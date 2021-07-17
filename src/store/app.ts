import Vue from 'vue'
import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import { vm } from '@/main'
import Swal from 'sweetalert2'

@Module({generateMutationSetters: true})
class AppModule extends VuexModule {
    //state
    private token: string | null = null;
    public Hi:String | null = null; 

    async confirm(head:string,txt:string){
       return await Swal.fire({
            title: head,
            text: txt,
            // imageUrl: 'https://sv1.picz.in.th/images/2020/11/17/bVtGvn.png',
            icon: 'info',
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: '<span class="mdi mdi-check-circle"></span>\nยืนยัน' ,
            showCancelButton: true,
            cancelButtonText:"ยกเลิก"
        }).then((r)=>{return (r.value)?true:false})
    }

    async success(txt:string){
        return await Swal.fire({
            title: 'สำเร็จแล้ว',
            text: txt,
            icon: 'success',
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: '<span class="mdi mdi-check-circle"></span>\nตกลง' ,
        })
    }

    async error(txt:string){
        return await Swal.fire({
            // title: 'ผิดพลาด',
            text: txt,
            icon: 'error',
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: '<span class="mdi mdi-check-circle"></span>\nตกลง' ,
        })
    } 
}

import store from "@/store"
export const App = new AppModule({store, name: "App"})
