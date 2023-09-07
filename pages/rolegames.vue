<template>
    <UILoader v-if="!allGames.length && isFetchingData" />
    <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
        <UIForm
            :reservedGame="reservedGame"
            @clearReservedGame="clearReservedGame"
            @hideModal="hideModal"
            @changeResultMessage="changeResultMessage"
        />
    </UIModal>
    <UIModal
        class="filter-modal"
        :isModalVisible="isFilterVisible"
        @hideModal="hideFilter"
    >
        <UIFilterForm
            @submit="hideFilter"
            @resetCurrentPage="resetCurrentPage"
            @getFilteredGames="getFilteredGames"
            :filter="filter"
            :games="store.getRoleGames"
            @updateFilter="updateFilter"
        />
    </UIModal>
    <UIDropInfo :resultMessage="resultMessage" />
    <section class="games">
        <div class="games__bg"></div>
        <div class="container">
            <div class="games__top">
                <h2 class="title">Рольові ігри</h2>
                <button @click="showFilter" class="games__filter">
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
                            v-if="getAmountOfUsedFilterOptions"
                            class="filter-img__indicator"
                            >{{ getAmountOfUsedFilterOptions }}</span
                        >
                    </div>
                    Фільтр
                </button>
            </div>
            <div class="row">
                <div v-for="game in paginate" :key="game.id" class="col-lg-6">
                    <CardGame
                        :game="game"
                        @showModal="showModal"
                        @setReservedGame="setReservedGame"
                    />
                </div>
            </div>
            <div class="pagination" v-if="getAmountOfPages > 1">
                <button
                    class="pagination__btn pagination__btn_nav"
                    @click="paginationPrevPage"
                >
                    <svg
                        width="33"
                        height="24"
                        viewBox="0 0 33 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M32.75 20.4053L12.344 16.9041V23.6364L0.75 12H32.75C32.75 12 32.75 19.2727 32.75 20.4053Z"
                            fill="url(#paint0_linear_918_27453)"
                        />
                        <path
                            d="M32.75 3.59468L12.344 7.09594V0.363636L0.75 12H32.75C32.75 12 32.75 4.72727 32.75 3.59468Z"
                            fill="#EABD48"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_918_27453"
                                x1="26.1592"
                                y1="28.9141"
                                x2="-7.79741"
                                y2="12.7883"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#F1D04A" />
                                <stop offset="0.09" stop-color="#ECC349" />
                                <stop offset="0.23" stop-color="#E1A746" />
                                <stop offset="0.31" stop-color="#DD9E46" />
                                <stop offset="0.43" stop-color="#D38746" />
                                <stop offset="0.55" stop-color="#C76B46" />
                                <stop offset="0.79" stop-color="#4F3131" />
                                <stop offset="1" stop-color="#482C2E" />
                            </linearGradient>
                        </defs>
                    </svg>
                </button>
                <button
                    class="pagination__btn"
                    :class="{ active: btn === currentPage }"
                    v-for="btn in getAmountOfPages"
                    :key="btn"
                    @click="setCurrentPage(btn)"
                >
                    {{ btn }}
                </button>
                <button
                    class="pagination__btn pagination__btn_nav"
                    @click="paginationNextPage(getAmountOfPages)"
                >
                    <svg
                        width="33"
                        height="24"
                        viewBox="0 0 33 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.75 20.4053L21.156 16.9041V23.6364L32.75 12H0.75C0.75 12 0.75 19.2727 0.75 20.4053Z"
                            fill="url(#paint0_linear_918_27465)"
                        />
                        <path
                            d="M0.75 3.59468L21.156 7.09594V0.363636L32.75 12H0.75C0.75 12 0.75 4.72727 0.75 3.59468Z"
                            fill="#EABD48"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_918_27465"
                                x1="7.34085"
                                y1="28.9141"
                                x2="41.2974"
                                y2="12.7883"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#F1D04A" />
                                <stop offset="0.09" stop-color="#ECC349" />
                                <stop offset="0.23" stop-color="#E1A746" />
                                <stop offset="0.31" stop-color="#DD9E46" />
                                <stop offset="0.43" stop-color="#D38746" />
                                <stop offset="0.55" stop-color="#C76B46" />
                                <stop offset="0.79" stop-color="#4F3131" />
                                <stop offset="1" stop-color="#482C2E" />
                            </linearGradient>
                        </defs>
                    </svg>
                </button>
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
                <VeeForm
                    class="tinder__form"
                    v-slot="{ validate, values }"
                    as="div"
                >
                    <form @submit.prevent>
                        <div class="tinder__phone-wrapper">
                            <label class="tinder__label">Номер телефону</label>
                            <Field
                                :rules="isPhoneNumberValid"
                                :validateOnBlur="true"
                                class="tinder__input"
                                type="tel"
                                name="phone"
                                placeholder="+380"
                            />
                            <ErrorMessage
                                class="tinder__input-error"
                                name="phone"
                            />
                        </div>
                        <TinderSlider
                            @add-like="handleAddLike($event, values, validate)"
                            @add-dislike="addDislike"
                            :sliderGameCards="sliderGameCards"
                            :sessionUserGames="sessionUserGames"
                            :isUserPhoneValid="isUserPhoneValid"
                        />
                    </form>
                </VeeForm>
            </div>
        </div>
    </section>
    <Callback class="tinder-callback" />
</template>

<script setup>
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { storeToRefs } from "pinia";
import { useGamesStore } from "~/stores/games";
import useModal from "~/composables/useModal";
import useDropInfo from "~/composables/useDropInfo";
import useFilter from "~/composables/useFilter";
import usePaginate from "~/composables/usePaginate";

const config = useRuntimeConfig();
const store = useGamesStore();
const { isModalVisible, showModal, hideModal } = useModal();
const { resultMessage, changeResultMessage } = useDropInfo();
const {
    currentPage,
    pageSize,
    paginationPrevPage,
    paginationNextPage,
    setCurrentPage,
    resetCurrentPage,
} = usePaginate();
const {
    isFilterVisible,
    filter,
    filteredGames,
    getFilteredGames,
    updateFilter,
    getAmountOfUsedFilterOptions,
    showFilter,
    hideFilter,
} = useFilter();
const TOKEN = config.public.telegramToken;
const CHAT_ID = config.public.telegramChatId;

const { allGames, isFetchingData } = storeToRefs(store);
const currentVotedGames = ref([]);
const isUserPhoneValid = ref(true);
const reservedGame = ref("");
let sessionUserGames = ref([]);

const sliderGameCards = computed(() => {
    return store.getRoleGames.filter(
        (game) => !currentVotedGames.value.includes(game.id)
    );
});
const paginate = computed(() => {
    if (getAmountOfUsedFilterOptions.value) {
        return filteredGames.value.slice(
            (currentPage.value - 1) * pageSize.value,
            currentPage.value * pageSize.value
        );
    } else
        return store.getRoleGames.slice(
            (currentPage.value - 1) * pageSize.value,
            currentPage.value * pageSize.value
        );
});
const getAmountOfPages = computed(() => {
    if (getAmountOfUsedFilterOptions.value) {
        return Math.ceil(filteredGames.value.length / pageSize.value);
    } else return Math.ceil(store.getRoleGames.length / pageSize.value);
});

const setReservedGame = (game) => {
    reservedGame.value = game;
};
const clearReservedGame = () => {
    reservedGame.value = "";
};

const isPhoneNumberValid = (value) => {
    const regex = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm;
    if (!value) {
        isUserPhoneValid.value = false;
        return "Це поле обов'язкове";
    }
    if (!regex.test(value) && value) {
        isUserPhoneValid.value = false;
        return "Введіть номер телефону в форматі +380";
    }
    isUserPhoneValid.value = true;
    return true;
};

const addLike = async ({ activeSlideGame, phone }) => {
    if (sessionUserGames.includes(activeSlideGame.id)) {
        changeResultMessage("Ви вже подали заявку на дану гру");
    } else {
        const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        let message = `<b>Tinder</b>\n`;
        message += `<b>Гра: </b>${activeSlideGame.game_title}\n`;
        message += `<b>Телефон: </b>${phone}\n`;
        await useFetch(URI_API, {
            method: "POST",
            params: { chat_id: CHAT_ID, parse_mode: "html", text: message },
            onResponse({ request, response, options }) {
                if (response.status === 200) {
                    sessionUserGames.push(activeSlideGame.id);
                    sessionStorage.setItem(
                        "userVotedGamesId",
                        JSON.stringify(sessionUserGames)
                    );
                    currentVotedGames.value.push(activeSlideGame.id);
                    changeResultMessage(
                        `Дякуєм за вашу заявку. Ми вже шукаєм гравців для організації гри ${activeSlideGame.game_title} для Вас`
                    );
                }
            },
            onResponseError({ request, response, options }) {
                if (response.status > 399) {
                }
            },
        });
    }
};
const addDislike = (activeSlideGame) => {
    if (sessionUserGames.includes(activeSlideGame.id)) {
        changeResultMessage("Ви вже подали заявку на дану гру");
    } else {
        currentVotedGames.value.push(activeSlideGame.id);
        changeResultMessage("Дякуєм за ваш голос");
    }
};

const handleAddLike = async ({ activeSlideGame }, { phone }, validate) => {
    const { valid } = await validate();

    if (valid) {
        addLike({ activeSlideGame, phone });
    }
};

store.fetchAllGames();
onMounted(() => {
    sessionUserGames = sessionStorage.userVotedGamesId
        ? JSON.parse(sessionStorage.userVotedGamesId)
        : [];
});
</script>
