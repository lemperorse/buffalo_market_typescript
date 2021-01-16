import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import {Core} from "@/store/core";

@Module({generateMutationSetters: true})
class ProductClass extends VuexModule {
    
    public ProductType = [
        {
            "name":"ขาย",
            "id":0,
        },
        {
            "name":"ซื้อ",
            "id":1,
        }, 
    ] 
    public SaleType = [
        {
            "name":"ชั่วคราว",
            "id":0,
        },
        {
            "name":"ถาวร",
            "id":1,
        }, 
    ]

    public PriceType = [
        {
            "name":"ราคาเต็ม",
            "id":true,
        },
        {
            "name":"ช่วงราคา",
            "id":false,
        }, 
    ] 

    public StatusSell = [
        {
            "name":"มีสินค้า",
            "id":5,
        },
        {
            "name":"สินค้าหมด",
            "id":4,
        },
        {
            "name":"ขายแล้ว",
            "id":3,
        },
        {
            "name":"ยกเลิก",
            "id":0,
        }, 
    ]
    public StatusBuy = [ 
        {
            "name":"รับซื้อ",
            "id":2,
        },
        {
            "name":"ได้รับสินค้าแล้ว",
            "id":1,
        },
        {
            "name":"ยกเลิก",
            "id":0,
        },
    ]
}

import store from "@/store"

export const Product = new ProductClass({store, name: "Product"})
