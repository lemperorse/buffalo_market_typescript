<template>
<div>

    <vue-form-generator :schema="form.schema" :model="model" :options="formOptions"></vue-form-generator>

    <div v-if="response" class="relative md:ml-64   mt-10 md:mt-2" style="z-index:1;">

        <pre>{{form}}</pre>
    </div>
</div>
</template>

<script lang="ts">
import { Core } from "@/store/core";

import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
    components: {

    },
    computed: {}
})

export default class UserClass extends Vue {
    model: any = {
        id: 1,
        name: "John Doe",
        password: "J0hnD03!x4",
        age: 35,
        skills: ["Javascript", "VueJS"],
        email: "john.doe@gmail.com",
        status: true
    }
    schema: any = {
        fields: [{
            type: "input",
            inputType: "text",
            label: "ID",
            model: "id",
            readonly: true,
            featured: false,
            disabled: true
        }, {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            readonly: false,
            featured: true,
            required: true,
            disabled: false,
            placeholder: "User's name",
        }, {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            required: true,
            hint: "Minimum 6 characters",

        }, {
            type: "input",
            inputType: "number",
            label: "Age",
            model: "age",
            min: 18,

        }, {
            type: "input",
            inputType: "email",
            label: "E-mail",
            model: "email",
            placeholder: "User's e-mail address",

        }, {
            type: "checklist",
            label: "Skills",
            model: "skills",
            multi: true,
            required: true,
            multiSelect: true,
            values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
        }, {
            type: "switch",
            label: "Status",
            model: "status",
            multi: true,
            readonly: false,
            featured: false,
            disabled: false,
            default: true,
            textOn: "Active",
            textOff: "Inactive"
        }]
    }

    formOptions: any = {
        validateAfterLoad: true,
        validateAfterChanged: true
    }
    form: any = {
        "schema": {
            "fields": [{
                    "label": "ประเภทตัวเลือก",
                    "hint": "",
                    "model": "name",
                    "default": null,
                    "required": true,
                    "inputType": "text",
                    "type":"input"
                },
                {
                    "label": "ชื่อตัวเลือก",
                    "hint": "",
                    "model": "value",
                    "default": null,
                    "required": true,
                    "inputType": "text",
                    "type":"input"
                }
            ]
        },
        "model": {
            "name": null,
            "value": null
        }
    }
    response: boolean = false
    async created() {
    //    this.form = await Core.getHttp(`/api/user/test2`)
        this.response = true
    }

}
</script>

<style>
.bgc {
    background-color: #e8e8e8;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%23e8e8e8' width='11' height='11'/%3E%3Crect fill='%23e7e7e7' x='10' width='11' height='11'/%3E%3Crect fill='%23e6e6e6' y='10' width='11' height='11'/%3E%3Crect fill='%23e5e5e5' x='20' width='11' height='11'/%3E%3Crect fill='%23e4e4e4' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23e3e3e3' y='20' width='11' height='11'/%3E%3Crect fill='%23e2e2e2' x='30' width='11' height='11'/%3E%3Crect fill='%23e1e1e1' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23e0e0e0' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23dfdfdf' y='30' width='11' height='11'/%3E%3Crect fill='%23dedede' x='40' width='11' height='11'/%3E%3Crect fill='%23dddddd' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23dcdcdc' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23dbdbdb' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23dadada' y='40' width='11' height='11'/%3E%3Crect fill='%23d9d9d9' x='50' width='11' height='11'/%3E%3Crect fill='%23d8d8d8' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23d7d7d7' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23d6d6d6' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23d5d5d5' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23d4d4d4' y='50' width='11' height='11'/%3E%3Crect fill='%23d3d3d3' x='60' width='11' height='11'/%3E%3Crect fill='%23d2d2d2' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23d1d1d1' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23d0d0d0' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23cfcfcf' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23cecece' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23cdcdcd' x='70' width='11' height='11'/%3E%3Crect fill='%23cccccc' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23cbcbcb' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23cacaca' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23c9c9c9' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23c8c8c8' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23c7c7c7' x='80' width='11' height='11'/%3E%3Crect fill='%23c6c6c6' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23c5c5c5' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23c4c4c4' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23c3c3c3' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23c2c2c2' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23c1c1c1' x='90' width='11' height='11'/%3E%3Crect fill='%23c0c0c0' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23bfbfbf' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23bebebe' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23bdbdbd' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23bcbcbc' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23bbbbbb' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23bababa' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23b9b9b9' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23b8b8b8' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23b7b7b7' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23b6b6b6' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23b5b5b5' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23b4b4b4' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23b3b3b3' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23b2b2b2' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23b1b1b1' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23b0b0b0' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23afafaf' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23aeaeae' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23adadad' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
