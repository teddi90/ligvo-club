<template>
    <div class="map">
        <GMapMap
            :center="center"
            :zoom="16"
            :options="mapStyle"
            style="width: 100%; height: 485px; margin: auto"
        >
            <GMapMarker
                :key="index"
                v-for="(marker, index) in markers"
                :position="marker.position"
                :clickable="false"
                :draggable="false"
                :icon="{
                    url: '/marker.png',
                    size: { width: 90, height: 69, f: 'px', b: 'px' },
                    scaledSize: { width: 90, height: 69, f: 'px', b: 'px' },
                }"
            >
            </GMapMarker>
        </GMapMap>
    </div>
</template>

<script setup>
const center = ref({ lat: 48.92246917952839, lng: 24.708524565007522 });
const markers = ref([
    {
        description: "Belvederska 27a",
        id: "1",
        position: {
            lat: 48.92290073850172,
            lng: 24.70317670323559,
        },
    },
]);
const mapStyle = ref({
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap", // set the default map type to roadmap
    backgroundColor: "#121212", // set the map background color
    styles: [
        { elementType: "labels.text.stroke", stylers: [{ color: "#181F39" }] },
        {
            featureType: "all",
            elementType: "geometry",
            stylers: [
                {
                    color: "#121212 ", // set the color of all building elements
                },
            ],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    color: "#474747", // set the color of the road elements
                },
            ],
        },
        {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#4B4B4B", // set the color of all label text elements
                },
            ],
        },
        {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#000000", // set the stroke color of all label text elements
                },
                {
                    weight: 2, // set the stroke weight of all label text elements
                },
            ],
        },
        {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "off", // hide all icons
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                {
                    color: "#1a1919",
                },
            ],
        },
        {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#212020",
                },
            ],
        },
    ],
});
</script>
