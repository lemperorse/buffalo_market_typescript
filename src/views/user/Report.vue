<template>
<!-- <v-app> -->
    <div class="bg-gray-100">
        <div class="container mx-auto ">
            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                สรุปรายงาน
            </h2>
            <CardReport />
            <!-- กราฟ -->
            <hr class="border-b-2 rounded border-green-500 mt-10">
            <h2 class="my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                กราฟ
            </h2>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <ChartAll />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <ChartPostAll />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <ChartPostSell />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <ChartCloseSell />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <ChartPostBuy />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <ChartCloseBuy />
                </div>

            </div>

        </div>
    </div>
<!-- </v-app> -->
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import CardReport from "@/components/report/CardReport.vue"
import ChartAll from "@/components/report/Chart/ChartAll.vue"
import ChartPostAll from "@/components/report/Chart/ChartPostAll.vue"
import ChartPostSell from "@/components/report/Chart/ChartPostSell.vue"
import ChartCloseSell from "@/components/report/Chart/ChartCloseSell.vue"
import ChartPostBuy from "@/components/report/Chart/ChartPostBuy.vue"
import ChartCloseBuy from "@/components/report/Chart/ChartCloseBuy.vue"
export default {
    name: "report-page",
    components: {
        CardReport,
        ChartAll,
        ChartPostAll,
        ChartPostSell,
        ChartCloseSell,
        ChartPostBuy,
        ChartCloseBuy
    },
    data() {
        return {

        }
    }
};
</script>
