<template>
    <div class="filter">
        <h3 class="filter__title">Фільтр</h3>
        <form class="filter__form" @submit.prevent>
            <div class="row">
                <div class="col-sm-5 offset-sm-1 offset-lg-0 col-lg-3">
                    <div class="filter__item">
                        <h4 class="filter__category">Категорія</h4>
                        <UIRadio
                            v-for="category in store.categories"
                            v-model="filter.category"
                            :key="category.id"
                            :label="category.name"
                            :id="category.id"
                        />
                    </div>
                </div>
                <div class="col-sm-5 offset-sm-1 offset-lg-0 col-lg-3">
                    <div class="filter__item">
                        <h4 class="filter__category">Тривалість</h4>
                        <UICheckbox
                            v-for="duration in store.durations"
                            v-model="filter.durations"
                            :key="duration.id"
                            :label="duration.name"
                            :id="duration.id"
                        />
                    </div>
                </div>
                <div class="col-sm-5 offset-sm-1 offset-lg-0 col-lg-3">
                    <div class="filter__item">
                        <h4 class="filter__category">Кількість гравців</h4>
                        <UICheckbox
                            v-for="quantity in store.quantityOfPlayers"
                            v-model="filter.quantityOfPlayers"
                            :key="quantity.id"
                            :label="quantity.name"
                            :id="quantity.id"
                        />
                    </div>
                </div>
                <div class="col-sm-5 offset-sm-1 offset-lg-0 col-lg-3">
                    <div class="filter__item">
                        <h4 class="filter__category">Складність</h4>
                        <UICheckbox
                            v-for="difficulty in store.difficulties"
                            v-model="filter.difficulties"
                            :key="difficulty.id"
                            :label="difficulty.name"
                            :id="difficulty.id"
                        />
                    </div>
                </div>
                <div class="filter__btn-wrapper">
                    <button
                        @click="
                            redirectToPage(),
                                emit('submit'),
                                emit('resetCurrentPage'),
                                emit('getFilteredGames', filteredGames),
                                emit('updateFilter', filter)
                        "
                        class="btn filter__btn"
                    >
                        Показати результати ({{ filteredGames.length }})
                    </button>
                    <br />
                    <button
                        @click="clearFilter(), emit('resetCurrentPage')"
                        class="filter__btn-clear"
                    >
                        Очистити
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useGamesStore } from "~/stores/games";
const store = useGamesStore();
const emit = defineEmits([
    "submit",
    "resetCurrentPage",
    "getFilteredGames",
    "updateFilter",
]);
const props = defineProps({
    filter: {
        type: Object,
        default: {},
    },
});

const route = useRoute();
const router = useRouter();

const clearFilter = () => {
    emit("updateFilter", {
        category: "",
        durations: [],
        quantityOfPlayers: [],
        difficulties: [],
    });
};
const isFilterHasValues = computed(() => {
    return !!(
        props.filter.category ||
        props.filter.durations.length ||
        props.filter.quantityOfPlayers.length ||
        props.filter.difficulties.length
    );
});
const filteredGames = computed(() => {
    if (!isFilterHasValues.value) {
        return store.getAllGames;
    }
    return store.getAllGames
        .filter((game) => {
            return props.filter.category
                ? game.game_category[0] === props.filter.category
                : true;
        })
        .filter((game) => {
            return props.filter.difficulties.length
                ? props.filter.difficulties.includes(game.difficult[0])
                : true;
        })
        .filter((game) => {
            return props.filter.durations.length
                ? props.filter.durations.filter((duration) => {
                      const durationsArr = duration.split("-");
                      return (
                          +game.duration >= +durationsArr[0] + 1 &&
                          +game.duration <= +durationsArr[1] + 1
                      );
                  }).length
                : true;
        })
        .filter((game) => {
            return props.filter.quantityOfPlayers.length
                ? props.filter.quantityOfPlayers.filter((quantity) => {
                      const quantityArr = quantity.split("-");
                      const quanArr = Array.from(
                          { length: +quantityArr[1] - +quantityArr[0] + 1 },
                          (_, index) => +quantityArr[0] + index
                      );
                      const gameArr = Array.from(
                          { length: +game.max_players - +game.min_players + 1 },
                          (_, index) => +game.min_players + index
                      );
                      return quanArr.some((game) => gameArr.includes(game));
                  }).length
                : true;
        });
});

const redirectToPage = () => {
    if (props.filter.category) {
        let page = props.filter.category.split("_").join("");
        page = page !== "mtg" ? page + "s" : "mtg";
        if (route.name !== page) {
            router.push({ path: `/${page}` });
        }
    }
};
</script>

