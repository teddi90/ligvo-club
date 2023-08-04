<template>
    <UILoader v-if="!store.getAllGames.length && store.isFetchingData" />
    <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
        <UIForm
            :reservedGame="reservedGame"
            @clearReservedGame="clearReservedGame"
            @hideModal="hideModal"
            :resultMessage="resultMessage"
            v-model="resultMessage"
        />
    </UIModal>
    <div v-if="resultMessage.length" class="drop-down-info">
        {{ resultMessage }}
    </div>
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
                    <CardGame
                        :game="game"
                        @showModal="showModal"
                        @setReservedGame="setReservedGame"
                    />
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
                            :votedMessage="votedMessage"
                            :sessionUserGames="sessionUserGames"
                            :isUserPhoneValid="isUserPhoneValid"
                        />
                    </form>
                </VeeForm>
            </div>
        </div>
    </section>
    <Callback class="tinder-callback" />
    <section class="map-wrapper">
        <Map />
    </section>
    <Footer />
</template>

<script setup>
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { storeToRefs } from "pinia";
import { useGamesStore } from "~/stores/games";
import useModal from "~/composables/useModal";

const config = useRuntimeConfig();
const store = useGamesStore();
const TOKEN = config.public.telegramToken;
const CHAT_ID = config.public.telegramChatId;

const { allGames } = storeToRefs(store);
const isFilterVisible = ref(false);
const votedMessage = ref("");
const currentVotedGames = ref([]);
const isUserPhoneValid = ref(true);
const reservedGame = ref("");
const resultMessage = ref("");
let sessionUserGames = ref([]);

const { isModalVisible, showModal, hideModal } = useModal();

const sliderGameCards = computed(() => {
    return allGames.value.filter(
        (game) => !currentVotedGames.value.includes(game.id)
    );
});

const setReservedGame = (game) => {
    reservedGame.value = game;
};
const clearReservedGame = () => {
    reservedGame.value = "";
};
const showFilter = () => {
    isFilterVisible.value = true;
};
const hideFilter = () => {
    isFilterVisible.value = false;
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
const changeVotedMessage = (message, duration) => {
    votedMessage.value = message;
    setTimeout(() => {
        votedMessage.value = "";
    }, duration);
};

const addLike = async ({ activeSlideGame, phone }) => {
    if (sessionUserGames.includes(activeSlideGame.id)) {
        changeVotedMessage("Ви вже подали заявку на дану гру", 3000);
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
                    changeVotedMessage(
                        `Дякуєм за вашу заявку. Ми вже шукаєм гравців для організації гри ${activeSlideGame.game_title} для Вас`,
                        3000
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
        changeVotedMessage("Ви вже подали заявку на дану гру", 2000);
    } else {
        // sessionUserGames.push(activeSlideGame.id);
        // sessionStorage.setItem(
        //     "userVotedGamesId",
        //     JSON.stringify(sessionUserGames)
        // );
        currentVotedGames.value.push(activeSlideGame.id);
        changeVotedMessage("Дякуєм за ваш голос", 2000);
    }
};

const handleAddLike = async ({ activeSlideGame }, { phone }, validate) => {
    const { valid } = await validate();

    if (valid) {
        addLike({ activeSlideGame, phone });
    }
};
// const handleAddDislike = async ({ activeSlideGame }, { phone }, validate) => {
//     const { valid } = await validate();

//     if (valid) {
//         addDislike({ activeSlideGame, phone });
//     }
// };

store.fetchAllGames();
onMounted(() => {
    sessionUserGames = sessionStorage.userVotedGamesId
        ? JSON.parse(sessionStorage.userVotedGamesId)
        : [];
});
</script>
