<template>
    <div class="voting-slider">
        <div class="row">
            <div class="col-md-3">
                <div class="voting-slider__btn-wrapper">
                    <div
                        @click="
                            playSliderDislikeAnimation();
                            addDislike();
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
                <div class="voting-slider__wrapper">
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
                    <div v-if="votedMessage" class="voting-slider__message">
                        {{ votedMessage }}
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="voting-slider__btn-wrapper">
                    <div
                        @click="
                            playSliderLikeAnimation();
                            addLike();
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
</template>

<script setup>
import { useSwiper } from "swiper/vue";
import { useGamesStore } from "~/stores/games";
import { EffectCards, Navigation } from "swiper";
import useModal from "~/composables/useModal";
import likeJSON from "~/assets/img/like.json";
import dislikeJSON from "~/assets/img/dislike.json";

const swiper = ref();
const store = useGamesStore();
const sliderDislike = ref(null);
const sliderLike = ref(null);
const { isModalVisible, showModal, hideModal } = useModal();
const config = useRuntimeConfig();
const wpUri = config.public.wpUri;
const wpUserName = config.public.wpApiUserName;
const wpUserPassword = config.public.wpApiUserPassword;
let localUserVoted = ref();
const votedMessage = ref();

const activeSlideGame = computed(() => {
    return store.getAllGames[swiper.value.activeIndex];
});

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
const changeVotedMessage = (message, duration) => {
    votedMessage.value = message;
    setTimeout(() => {
        votedMessage.value = "";
    }, duration);
};
const onSwiper = (instance) => (swiper.value = instance);
const addLike = async () => {
    if (localUserVoted.includes(activeSlideGame.value.id)) {
        changeVotedMessage("Ви вже віддали свій голос за дану гру", 1500);
    } else {
        useWpApi().incrementFieldValueById(
            "likes",
            activeSlideGame.value.id,
            activeSlideGame.value.likes
        );
        localUserVoted.push(activeSlideGame.value.id);
        localStorage.setItem(
            "userVotedGamesId",
            JSON.stringify(localUserVoted)
        );
        changeVotedMessage("Дякуєм за ваш голос", 1500);
        goToNextSlide();
    }
};
const addDislike = async () => {
    if (localUserVoted.includes(activeSlideGame.value.id)) {
        changeVotedMessage("Ви вже віддали свій голос за дану гру", 1500);
    } else {
        useWpApi().incrementFieldValueById(
            "dislikes",
            activeSlideGame.value.id,
            activeSlideGame.value.dislikes
        );
        localUserVoted.push(activeSlideGame.value.id);
        localStorage.setItem(
            "userVotedGamesId",
            JSON.stringify(localUserVoted)
        );
        changeVotedMessage("Дякуєм за ваш голос", 1500);
        goToNextSlide();
    }
};
onMounted(() => {
    localUserVoted = localStorage.userVotedGamesId
        ? JSON.parse(localStorage.userVotedGamesId)
        : [];
});
</script>
