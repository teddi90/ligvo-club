<template>
    <section class="map-wrapper">
        <div class="map">
            <MapboxMap
                map-id="map-box"
                :options="{
                    style: 'mapbox://styles/teddi90/cllawn6in00rh01pha17sa6jz',
                    center: [24.706, 48.9229],
                    zoom: 16,
                }"
            >
                <MapMarker />
            </MapboxMap>
        </div>
    </section>
</template>

<script setup>
</script>
