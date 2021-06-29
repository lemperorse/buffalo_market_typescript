<template> 
<div :class="`${classProp} p-2`">
    <div   class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden" @click="$router.push(path)">
        <div class="  overflow-hidden w-full">
            <v-img   :class="`h-40 ${classProp}`"  :src="image" /> 
        </div>
        <div class="p-4">
             <h2 class="mt-2 mb-2  font-bold tect-xl">{{name}}</h2>
            <div class="mt-3 flex items-center">
                <span class="text-yellow-600 text-sm font-semibold">฿</span>&nbsp;<span class="font-bold text-xl text-yellow-600">{{price}}</span>&nbsp;
            </div>
        </div>
        <div class="p-4 border-t border-b text-xs text-gray-700">
            <span class="flex items-center mb-1">
                <i class="far fa-clock fa-fw mr-2 text-gray-900"></i> {{dateOut(time)}}
            </span>
            <!-- <span class="flex items-center">
                <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i> Ermäßigung mit Karte
            </span> -->
        </div>
 
    </div>
</div>
 
</template>

<script>
import moment from 'moment'
export default {

    props: {
        classProp:{default:'w-48'},
        path: { default: "/" },
        image: { default: "https://source.unsplash.com/MNtag_eXMKw/1600x900" },
        name: { default: "สินค้า" },
        price: { default: "฿ 0" },
        text: { default: '' },
        time:{default:'20/20/2021'}
    },
    methods:{
        dateOut(date){
            let convert = moment(date).format('DD/MM/YYYY')
            return convert
        }
    }

}
</script>

<style>

</style>
