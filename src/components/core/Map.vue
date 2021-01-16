<template>
  <div class="map" ref="googleMap"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Map} from '@/store/map'

declare var google: any;
@Component({
  components: {},
  props: {
    center:{
      default:{'Latitude':19.0308857,'Longitude' :99.9258682 },
    },
    locations: {
      default: [],
      required: true
    },
    disableDefaultUI: {
      type: Boolean,
      required: true
    },
    zoom: {
      type: Number,
      default:15,
      required: true
    },
    scaleControl: {
      type: Boolean,
      required: true
    },
    zoomControl: {
      type: Boolean,
      required: true
    }
  }
})
export default class GoogleMapWithMarkersComponent extends Vue {
  map: any;
  markers: any = [];
  bounds = new google.maps.LatLngBounds();
  imagePath: string = "/assets/img/pins/";
  ILocation: any = {}
  res: boolean = false;
  created() {
    // Can't do it here DOM is NOT ready
  }

  async mounted() {
    this.map = await this.initMap(); // have to wait untill DOM is ready
    await this.drawMap(this.map, this.$props.locations) 
  }

  async drawMap(map: any, locations: any) {
    console.log(locations);
    this.buildMarkers(map, locations);
    this.map = google.maps.event.addListener(map, "click", (event: any) => {
      this.addMarker(event.latLng, map);
      this.markers.addListener("click", () => {
        map.setZoom(16);
        map.setCenter(this.markers.getPosition());
      });

    });
    // map.fitBounds(this.bounds);
    // map.panToBounds(this.bounds);
  }

  async initMap() {

    const element: any = this.$refs.googleMap;
    const center : any = this.$props.center
    console.log(center);
    return new google.maps.Map(element, {
      zoom: this.$props.zoom,
      center: new google.maps.LatLng(center.Latitude, center.Longitude),
      disableDefaultUI: this.$props.disableDefaultUI,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: "greedy",
      scaleControl: this.$props.scaleControl,
      zoomControl: this.$props.zoomControl
    });
  }

  async changeMark(map: any, locations: any) {
    let locat = JSON.parse(JSON.stringify(locations.latLng))

    let cc = [{
      'Latitude': locat.lat,
      'Longitude': locat.lng
    }]
    await this.drawMap(this.map, cc)

  }

  buildMarkers(map: any, locations: any) {
    this.bounds = new google.maps.LatLngBounds();
    for (let location of this.$props.locations) {
      this.markers = this.constructMarker(map, location.Latitude, location.Longitude, `https://cdn0.iconfinder.com/data/icons/free-skycons-mix-april-1/128/yumminky-skycons-mix-01-512.png`);
      this.bounds.extend(this.markers.getPosition());
    }
  }

  constructMarker(map: any, latitude: number, longitude: number, icon: string) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      icon: {
        url: icon,
        scaledSize: new google.maps.Size(40, 40)
      },
      map: map
    });
  }

  addMarker(location: any, map: any) {
    let change = JSON.parse(JSON.stringify(location))
    Map.lat = change.lat
    Map.lng = change.lng
    this.markers = new google.maps.Marker({
      position: location,
      label: 'เปลี่ยน',
      map: map,
    });

  }

}
</script>

<style scoped>
.map {
  border-radius: 8px;
  height: 300px;
}
</style>
