<template>
    <div class="filter">
        <h3 class="filter__title">Фільтр</h3>
        <form class="filter__form" @submit.prevent="emit('submit')">
            <div class="row">
                <div class="col-md-3">
                    <h4 class="filter__category">Категорія</h4>
                    <UIRadio
                        v-for="category in store.categories"
                        v-model="store.filter.category"
                        :key="category.id"
                        :label="category.name"
                        :id="category.id"
                    />
                </div>
                <div class="col-md-3">
                    <h4 class="filter__category">Тривалість</h4>
                    <UICheckbox
                        v-for="duration in store.durations"
                        v-model="store.filter.durations"
                        :key="duration.id"
                        :label="duration.name"
                        :id="duration.id"
                    />
                </div>
                <div class="col-md-3">
                    <h4 class="filter__category">Кількість гравців</h4>
                    <UICheckbox
                        v-for="quantity in store.quantityOfPlayers"
                        v-model="store.filter.quantityOfPlayers"
                        :key="quantity.id"
                        :label="quantity.name"
                        :id="quantity.id"
                    />
                </div>
                <div class="col-md-3">
                    <h4 class="filter__category">Складність</h4>
                    <UICheckbox
                        v-for="difficulty in store.difficulties"
                        v-model="store.filter.difficulties"
                        :key="difficulty.id"
                        :label="difficulty.name"
                        :id="difficulty.id"
                    />
                </div>
                <div class="text-center">
                    <button class="btn filter__btn">
                        Показати результати ({{ store.filteredGames.length }})
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useGamesStore } from "~/stores/games";
const store = useGamesStore();
const emit = defineEmits(["submit"]);
</script>

