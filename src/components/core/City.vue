<template>
<v-app v-if="dialog">
  <v-dialog v-model="dialog" persistent  >
    <v-card v-if="response">
      <v-card-title>
        เลือก จังหวัด อำเภอ ตำบล
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" icon text>
          <v-icon>fas fa-window-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-autocomplete return-object label="ภูมิภาค" filled v-model="geoChoose" :items="geo"
                        item-text="name"></v-autocomplete>
        <v-autocomplete return-object label="จังหวัด" filled v-model="provinceChoose" :items="province"
                        item-text="name"></v-autocomplete>
        <v-autocomplete return-object label="อำเภอ" filled v-model="amphurChoose" :items="amphur"
                        item-text="name"></v-autocomplete>
        <v-autocomplete return-object label="ตำบล" filled v-model="districtChoose" :items="district"
                        item-text="name"></v-autocomplete>
        <button @click="submitCity()" :class="'bg-blue-800 '+$btn"> {{ $rt }}</button>
      </v-card-text>
    </v-card>
  </v-dialog>
</v-app>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue,
} from 'vue-property-decorator';


import {
  mapState
} from 'vuex';

import {
  userModule
} from "@/store/test";
import {Test, User} from '@/models/user'
import {Geography, Province, Amphur, District} from '@/models/core'
import {City} from '@/store/city'

@Component({
  components: {},
  computed: {}
})
export default class CityComponent extends Vue {
  private response: boolean = false
  private geo: Geography[] | null = []
  private province: Province[] | null = []
  private amphur: Amphur[] | null = []
  private district: District[] | null = []

  private geoChoose: Geography | null = null
  private provinceChoose: Province | null = null
  private amphurChoose: Amphur | null = null
  private districtChoose: District | null = null


  @Watch('geoChoose')
  private async onChangeGeo(id: Geography) {
    this.province = await City.getProvince(id?.id)

  }

  @Watch('provinceChoose')
  async onChangeProvince(id: Province) {
    this.amphur = await City.getAmphur(id?.id)

  }

  @Watch('amphurChoose')
  async onChangeAmphur(id: Amphur) {
    this.district = await City.getDistrict(id?.id)

  }

  public async submitCity() {
    City.currentGeo = this.geoChoose
    City.currentProvince = this.provinceChoose
    City.currentAmphur = this.amphurChoose
    City.currentDistrict = this.districtChoose
    await City.setShowName()
    City.dialogCityState = false
  }

  private async mounted() {
    this.geo = await City.getGeo()
    this.response = true
  }

  get dialog() {
    return City.dialogCityState
  }

  async closeDialog() {
    City.dialogCityState = false
  }

}
</script>
