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
                    <CardBarChart />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <CardLineChart2 />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <CardLineChart />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <CardLineChart1 />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <CardBarChart1 />
                </div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <CardBarChart2 />
                </div>

            </div>

        </div>
    </div>
<!-- </v-app> -->
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import CardReport from "@/components/report/CardReport.vue"
import CardBarChart from "@/components/report/Chart/CardBarChart.vue"
import CardLineChart2 from "@/components/report/Chart/CardLineChart2.vue"
import CardLineChart from "@/components/report/Chart/CardLineChart.vue"
import CardLineChart1 from "@/components/report/Chart/CardLineChart1.vue"
import CardBarChart1 from "@/components/report/Chart/CardBarChart1.vue"
import CardBarChart2 from "@/components/report/Chart/CardBarChart2.vue"
export default {
    name: "report-page",
    components: {
        CardReport,
        CardBarChart,
        CardLineChart2,
        CardLineChart,
        CardLineChart1,
        CardBarChart1,
        CardBarChart2
    },
    data() {
        return {

        }
    }
};
</script>
