<template>
    <UILoader v-if="!store.getAllGames.length && store.isFetchingData" />
    <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
        <UIForm />
    </UIModal>
    <section class="board-games">
        <div class="board-games__bg"></div>

        <div class="container">
            <div class="board-games__top">
                <h2 class="title">Настільнi ігри</h2>
                <button @click="showFilter" class="board-games__filter">
                    <div class="filter-img__wrapper">
                        <svg
                            class="filter-img"
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.3333 11.3333H9.66658L1.66659 2H24.3333L16.3333 11.3333ZM16.3333 21.3333L9.66658 25.3333V11.3333H16.3333V21.3333ZM24.6666 2H1.33325C0.799919 2 0.333252 1.53333 0.333252 1C0.333252 0.466667 0.799919 0 1.33325 0H24.6666C25.1999 0 25.6666 0.466667 25.6666 1C25.6666 1.53333 25.1999 2 24.6666 2Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span
                            v-if="store.getCountOfUsedFilterOptions"
                            class="filter-img__indicator"
                            >{{ store.getCountOfUsedFilterOptions }}</span
                        >
                    </div>
                    Фільтр
                </button>
                <UIModal
                    class="filter-modal"
                    :isModalVisible="isFilterVisible"
                    @hideModal="hideFilter"
                >
                    <UIFilterForm @submit="hideFilter" />
                </UIModal>
            </div>
            <div class="row">
                <div
                    v-for="game in store.filteredGames"
                    :key="game.id"
                    class="col-md-6"
                >
                    <CardGame :game="game" @showModal="showModal" />
                </div>
            </div>
        </div>
    </section>
    <section class="tinder">
        <div class="container">
            <div class="tinder__title-wrapper">
                <h2 class="title">Ігро-Tinder</h2>
            </div>
            <div class="text-center">
                <p class="tinder__text">
                    Хочеш знайти чудову компанію для гри, та всі друзі зайняті?
                </p>
                <p class="tinder__text">
                    Спробуй ігротіндер - обери ігри, які хочеш зіграти, та коли
                    назбирається компанія твоїх однодумців, ми організуємо вам
                    спільну гру!
                </p>
            </div>
            <p class="tinder__subtext">
                *Для участі у грі необхідно вказати Ваш номер телефону
            </p>
            <div class="tinder__form-wrapper">
                <form class="tinder__form">
                    <label class="tinder__label">Номер телефону</label>
                    <input
                        type="text"
                        class="tinder__input"
                        placeholder="+380"
                    />
                </form>
            </div>
            <VotingSlider />
        </div>
    </section>

    <Callback class="tinder-callback" @showModal="showModal" />
    <section class="map-wrapper">
        <Map />
    </section>
    <Footer />
</template>

<script setup>
import { useGamesStore } from "~/stores/games";
import useModal from "~/composables/useModal";

const store = useGamesStore();
const isFilterVisible = ref(false);

const { isModalVisible, showModal, hideModal } = useModal();

const showFilter = () => {
    isFilterVisible.value = true;
};
const hideFilter = () => {
    isFilterVisible.value = false;
};

store.fetchAllGames();
onMounted(() => {});
</script>
