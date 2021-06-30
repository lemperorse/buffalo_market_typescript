<template>
<div class="p-2 mt-4 bg-gray-100 h-full">
    <v-container grid-list-xs v-if="response">
        <ol class="flex text-gray-700 bg-gray-200 rounded-full py-2 px-2 mt-4 items-center">
            <li class="px-2 text-sm"><span @click="$router.push('/')" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</span></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2 text-sm"><span @click="$router.push('/user/myshop')" class="hover:underline">{{_lang('ร้านค้าของฉัน','My shop','我的店鋪')}}</span></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2 text-sm text-yellow-600">{{_lang('รายงานของฉัน','My report','我的報告')}}</li>
        </ol>
        <div class="px-1 pt-8 md:px-10 mx-auto w-full">
        <span class="text-2xl"><i class="em em-card_file_box p-4" aria-role="presentation" aria-label=""></i>{{_lang('รายงานของฉัน','My report','我的報告')}}</span>

        <div class="flex flex-col md:flex-row"> 
            <le-menu2 v-for="label,i in labels" :key="i"  class="w-full md:w-1/3 m-4"
             :name="value[i]" :text="label" :icon="icons[i]" ></le-menu2> 
            </div> 
        </div>
    <br>
        <div class="w-full p-6 flex flex-col justify-center items-center" style="overflow-x: scroll;">
        <apexchart type="bar" width="1000" height="350" :options="chartOptions" :series="series"></apexchart>

        </div>
    </v-container>
</div>
</template>

<script lang="ts">
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from 'lodash'
@Component({
    components: {},
    computed: {}
})

export default class Postx extends Vue {
    tabs: any = 2
    dialog: any = false
    products: any = null
    value: any = []
    labels: any = []
    icons:any = []
 
    async created() {
        await this.loadFarm()
        await this.loadProducts()
        this.chartOptions.xaxis.categories = this.labels
        this.series[0].data = this.value
        this.response = true;
    }

    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    async loadFarm() {
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.farm = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
    }
    data: any = null
    productsEnd: any = null

    async loadProducts() {
        this.productsEnd = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}&status=3`)
        this.products = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}`)
        this.data = _.chain(this.products)
            // Group the elements of Array based on `color` property
            .groupBy("status")
            // `key` is group's name (color), `value` is the array of objects
            .map((value: any, key: any) => ({ status: key, data: value }))
            .value()

        for (let index = 0; index < this.data.length; index++) {
            this.value.push(this.data[index].data.length)
            let name = ''
            let icon = ''
            if (this.data[index].status == 0) {
                name = 'ยกเลิก'
                icon = 'em em-man-gesturing-no'
            } else if (this.data[index].status == 1) {
                name = 'ได้รับสินค้าแล้ว'
                icon = 'em em-man-juggling'
            } else if (this.data[index].status == 2) {
                name = 'รับซื้อ'
                icon = 'em em-mega'
            } else if (this.data[index].status == 3) {
                name = 'ขายแล้ว'
                icon = 'em em-moneybag'
            } else if (this.data[index].status == 4) {
                name = 'สินค้าหมด'
                icon = 'em em-man-shrugging'
            } else if (this.data[index].status == 5) {
                name = 'มีสินค้า'
                icon = 'em em-shopping_bags'
            } else {
                name = 'ไม่มีสถานะ'
                icon = 'em em-meat_on_bone'
            }
            this.labels.push(`${name} `)
            this.icons.push(`${icon} `)
        }

    }

    series:any =  [{
        name: 'Data',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }]
 

          chartOptions:any =  {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val:any) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: 'orange',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val:any) {
                  return val + "%";
                }
              }
            
            },
            title: {
              text: 'ตารางรายงานยอดขาย',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: 'orange'
              }
            }
          }
    
} 
</script>
 
<style scoped>
a {
    color: black !important;
}

a:link {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
