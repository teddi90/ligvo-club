<template>
    <div v-if="sliderGameCards.length" class="voting-slider">
        <div class="row">
            <div class="col-md-3">
                <div class="voting-slider__btn-wrapper">
                    <div
                        @click="
                            playSliderDislikeAnimation();
                            submitPhoneNumber(false);
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
                            v-for="game in sliderGameCards"
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
                            submitPhoneNumber(true);
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

const emit = defineEmits(["add-like", "add-dislike"]);
const props = defineProps({
    sliderGameCards: {
        type: Array,
        default: () => [],
    },
    votedMessage: {
        type: String,
        default: "",
    },
    localUserVoted: {
        type: Array,
        default: () => [],
    },
    isUserPhoneValid: {
        type: Boolean,
        default: true,
    },
});

const swiper = ref();
const store = useGamesStore();
const sliderDislike = ref(null);
const sliderLike = ref(null);
const { isModalVisible, showModal, hideModal } = useModal();

const activeSlideGame = computed(() => {
    return props.sliderGameCards[swiper.value.activeIndex];
});

const playSliderLikeAnimation = () => {
    if (
        !props.localUserVoted.includes(activeSlideGame.value.id) &&
        props.isUserPhoneValid
    ) {
        sliderLike.value.play();
        setTimeout(() => {
            sliderLike.value.stop();
        }, 1600);
    }
};
const playSliderDislikeAnimation = () => {
    if (
        !props.localUserVoted.includes(activeSlideGame.value.id) &&
        props.isUserPhoneValid
    ) {
        sliderDislike.value.play();
        setTimeout(() => {
            sliderDislike.value.stop();
        }, 1600);
    }
};

const onSwiper = (instance) => (swiper.value = instance);

const submitPhoneNumber = (isLike) => {
    if (isLike) {
        emit("add-like", { activeSlideGame: { ...activeSlideGame.value } });
    } else {
        emit("add-dislike", { activeSlideGame: { ...activeSlideGame.value } });
    }
};
</script>
