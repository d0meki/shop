<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';
</script>

<template>
    <!-- component -->
    <!-- Create By Joker Banny -->
    <!-- Header Navbar -->
    <TopMenu />


    <!-- Content router view -->
    <RouterView />


    <!-- Footer -->
    <CustomFooter />

</template>