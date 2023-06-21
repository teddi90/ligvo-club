<template>
    <UILoader v-if="!store.getAllGames.length && store.isFetchingData" />
    <section class="board-games">
        <div class="board-games__bg"></div>
        <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
            <UIForm />
        </UIModal>
        <div class="container">
            <div class="board-games__top">
                <h2 class="title">Настільнi ігри</h2>
                <a @click="showFilter" href="#" class="board-games__filter">
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
                </a>
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
            <div class="voting-slider">
                <div class="row">
                    <div class="col-md-3">
                        <div class="voting-slider__btn-wrapper">
                            <div
                                @click="
                                    playSliderDislikeAnimation();
                                    goToNextSlide();
                                "
                                class="voting-slider__btn voting-slider__btn-next"
                            >
                                <client-only>
                                    <Vue3Lottie
                                        ref="sliderDislike"
                                        class="voting-slider__btn-img"
                                        :animationData="dislikeJSON"
                                        :autoPlay="false"
                                        :loop="false"
                                        :height="100"
                                        :width="100"
                                    />
                                    <span class="voting-slider__btn-label"
                                        >Це не для мене</span
                                    >
                                </client-only>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <Swiper
                            @swiper="onSwiper"
                            :modules="[EffectCards, Navigation]"
                            :slides-per-view="1"
                            :loop="false"
                            :effect="'cards'"
                            :grabCursor="true"
                        >
                            <SwiperSlide
                                v-for="game in store.getAllGames"
                                :key="game.id"
                                class="col-md-6"
                            >
                                <CardGame
                                    class="voting-slider__game"
                                    :game="game"
                                    @showModal="showModal"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div class="col-md-3">
                        <div class="voting-slider__btn-wrapper">
                            <div
                                @click="
                                    playSliderLikeAnimation();
                                    goToNextSlide();
                                "
                                class="voting-slider__btn"
                            >
                                <client-only>
                                    <Vue3Lottie
                                        ref="sliderLike"
                                        class="voting-slider__btn-img"
                                        :animationData="likeJSON"
                                        :autoPlay="false"
                                        :loop="false"
                                        :height="100"
                                        :width="100"
                                    />
                                    <span class="voting-slider__btn-label"
                                        >Сподобалось</span
                                    >
                                </client-only>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Callback class="tinder-callback" @showModal="showModal" />
    <section class="map-wrapper">
        <Map />
    </section>
    <Footer />
</template>

<script setup>
import { useSwiper } from "swiper/vue";
import { EffectCards, Navigation } from "swiper";
import { useGamesStore } from "~/stores/games";
import useModal from "~/mixins/useModal";
import likeJSON from "~/assets/img/like.json";
import dislikeJSON from "~/assets/img/dislike.json";

const swiper = ref();
const store = useGamesStore();
const isFilterVisible = ref(false);
const sliderDislike = ref(null);
const sliderLike = ref(null);
const { isModalVisible, showModal, hideModal } = useModal();

const showFilter = () => {
    isFilterVisible.value = true;
};
const hideFilter = () => {
    isFilterVisible.value = false;
};
const playSliderLikeAnimation = () => {
    sliderLike.value.play();
    setTimeout(() => {
        sliderLike.value.stop();
    }, 1600);
};
const playSliderDislikeAnimation = () => {
    sliderDislike.value.play();
    setTimeout(() => {
        sliderDislike.value.stop();
    }, 1600);
};
const goToNextSlide = () => {
    swiper.value.slideNext();
};
const onSwiper = (instance) => (swiper.value = instance);

store.fetchAllGames();
onMounted(() => {});
</script>
