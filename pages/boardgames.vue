<template>
    <section class="board-games">
        <div class="board-games__bg"></div>
        <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
            <UIForm />
        </UIModal>
        <div class="container">
            <div class="board-games__top">
                <h2 class="title">настільнi ігри</h2>
                <a href="#" class="board-games__filter">
                    <svg
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
                    Фільтр
                </a>
            </div>
            <div class="row">
                <div
                    v-for="game in store.getBoardGames"
                    :key="game.id"
                    class="col-md-6"
                >
                    <CardGame :game="game" @showModal="showModal" />
                </div>
            </div>
        </div>
    </section>
    <section class="map-wrapper">
        <Map />
    </section>
    <Footer class="board-games__footer" />
</template>

<script setup>
import { useGamesStore } from "~/stores/games";
import useModal from "~/mixins/useModal";
const store = useGamesStore();
const { isModalVisible, showModal, hideModal } = useModal();
</script>
