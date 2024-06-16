<template>
    <div class="flex justify-center bg-gray-100 space-x-3">
        <button :disabled="page === 1" @click="$router.push({ query: { page: page - 1 } })"
            class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-slate-200 hover:bg-blue-600  transition-all">
            <ArrowLefttIcon />

            <span>Anteriores</span>
        </button>
        <button @click="$router.push({ query: { page: page + 1 } })" :disabled="hasMoreData"
            class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-slate-200 hover:bg-blue-600  transition-all">
            <span>Siguientes</span>
            <ArrowRightIcon />
        </button>
    </div>
</template>

<script lang="ts" setup>
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import ArrowLefttIcon from '@/icons/ArrowLeftIcon.vue';

interface Props {
    page: number;
    hasMoreData: boolean;
}

defineProps<Props>();

</script>