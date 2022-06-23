import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);