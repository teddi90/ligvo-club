<template>
    <UILoader v-if="pending && !game" />
    <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
        <UIForm
            :reservedGame="reservedGame"
            @clearReservedGame="clearReservedGame"
            @hideModal="hideModal"
            @changeResultMessage="changeResultMessage"
        />
    </UIModal>
    <UIDropInfo :resultMessage="resultMessage" />

    <section class="game-page" v-if="game">
        <div class="container">
            <div class="game-page__breadcrumbs">
                <NuxtLink to="/">Домашня сторінка</NuxtLink>/
                <NuxtLink
                    v-if="getCategoryInfo"
                    :to="`/${getCategoryInfo.path}`"
                    >{{ getCategoryInfo.name }}</NuxtLink
                >/
                <NuxtLink>{{ game.game_title }}</NuxtLink>
            </div>
            <h2 class="title">{{ game.game_title }}</h2>
            <div class="game-page__wrapper">
                <div class="game-page__img-wrapper">
                    <img
                        :src="game.image.guid"
                        :alt="game.game_title"
                        class="game-page__img"
                        :class="{
                            'game-page__img_cover':
                                game.game_category[0] === 'war_game',
                        }"
                    />
                </div>
                <div class="game-page__info">
                    <h3 class="game-page__title">{{ game.game_title }}</h3>
                    <div class="game-page__info_item-wrapper">
                        <div
                            class="game-page__info_item game-page__info_indicator-wrapper"
                        >
                            <div class="game-page__info_indicators">
                                <span
                                    class="game-page__info_indicator active"
                                ></span>
                                <span
                                    :class="{
                                        active:
                                            game.difficult[0] === 'medium' ||
                                            game.difficult[0] === 'hard',
                                    }"
                                    class="game-page__info_indicator"
                                ></span>
                                <span
                                    :class="{
                                        active: game.difficult[0] === 'hard',
                                    }"
                                    class="game-page__info_indicator"
                                ></span>
                            </div>
                        </div>

                        <div class="game-page__info_item">
                            <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.42854 6.00028C4.76622 6.00028 5.1006 5.93377 5.41258 5.80454C5.72456 5.67531 6.00803 5.4859 6.24681 5.24712C6.48559 5.00835 6.675 4.72487 6.80423 4.41289C6.93345 4.10091 6.99997 3.76654 6.99997 3.42885C6.99997 3.09117 6.93345 2.75679 6.80423 2.44481C6.675 2.13283 6.48559 1.84935 6.24681 1.61058C6.00803 1.3718 5.72456 1.18239 5.41258 1.05316C5.1006 0.923934 4.76622 0.857422 4.42854 0.857422C3.74655 0.857422 3.0925 1.12834 2.61026 1.61058C2.12803 2.09281 1.85711 2.74687 1.85711 3.42885C1.85711 4.11084 2.12803 4.76489 2.61026 5.24712C3.0925 5.72936 3.74655 6.00028 4.42854 6.00028ZM8.77139 10.354C9.20739 10.4883 9.75082 10.5717 10.4285 10.5717C13.8571 10.5717 13.8571 8.42885 13.8571 8.42885C13.8571 8.08786 13.7217 7.76083 13.4805 7.51971C13.2394 7.27859 12.9124 7.14314 12.5714 7.14314H8.76797C9.10008 7.48869 9.28525 7.94957 9.28454 8.42885V8.74599L9.28282 8.79342C9.2707 8.98427 9.24124 9.17362 9.19482 9.35914C9.10657 9.71058 8.96389 10.0461 8.77197 10.3534L8.77139 10.354ZM12.4285 4.00028C12.4285 4.26292 12.3768 4.52299 12.2763 4.76565C12.1758 5.0083 12.0285 5.22878 11.8428 5.41449C11.657 5.60021 11.4366 5.74753 11.1939 5.84804C10.9513 5.94855 10.6912 6.00028 10.4285 6.00028C10.1659 6.00028 9.90582 5.94855 9.66317 5.84804C9.42052 5.74753 9.20004 5.60021 9.01432 5.41449C8.82861 5.22878 8.68129 5.0083 8.58078 4.76565C8.48027 4.52299 8.42854 4.26292 8.42854 4.00028C8.42854 3.46985 8.63925 2.96114 9.01432 2.58607C9.3894 2.21099 9.8981 2.00028 10.4285 2.00028C10.959 2.00028 11.4677 2.21099 11.8428 2.58607C12.2178 2.96114 12.4285 3.46985 12.4285 4.00028ZM0.142822 8.42885C0.142822 8.08786 0.278281 7.76083 0.519399 7.51971C0.760517 7.27859 1.08754 7.14314 1.42854 7.14314H7.42854C7.76953 7.14314 8.09656 7.27859 8.33767 7.51971C8.57879 7.76083 8.71425 8.08786 8.71425 8.42885V8.71456C8.71425 8.71456 8.71425 11.7146 4.42854 11.7146C0.142822 11.7146 0.142822 8.71456 0.142822 8.71456V8.42885Z"
                                    fill="white"
                                />
                            </svg>
                            <span
                                >{{ game.min_players }}-{{
                                    game.max_players
                                }}</span
                            >
                        </div>
                        <div class="game-page__info_item">
                            <svg
                                width="12"
                                height="14"
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.00004 2.33366C7.50293 2.33366 8.94427 2.93068 10.007 3.99339C11.0697 5.05609 11.6667 6.49743 11.6667 8.00033C11.6667 9.50322 11.0697 10.9446 10.007 12.0073C8.94427 13.07 7.50293 13.667 6.00004 13.667C4.49715 13.667 3.05581 13.07 1.9931 12.0073C0.930396 10.9446 0.333374 9.50322 0.333374 8.00033C0.333374 6.49743 0.930396 5.05609 1.9931 3.99339C3.05581 2.93068 4.49715 2.33366 6.00004 2.33366ZM6.00004 4.33366C5.87922 4.33366 5.76248 4.37742 5.67142 4.45684C5.58036 4.53625 5.52114 4.64596 5.50471 4.76566L5.50004 4.83366V7.83366L5.50471 7.90166C5.52117 8.02133 5.58041 8.131 5.67147 8.21039C5.76252 8.28977 5.87924 8.33351 6.00004 8.33351C6.12084 8.33351 6.23756 8.28977 6.32862 8.21039C6.41967 8.131 6.47891 8.02133 6.49537 7.90166L6.50004 7.83366V4.83366L6.49537 4.76566C6.47894 4.64596 6.41972 4.53625 6.32866 4.45684C6.2376 4.37742 6.12087 4.33366 6.00004 4.33366ZM10.78 2.41566L10.8347 2.45633L11.6007 3.12299C11.6967 3.2061 11.7575 3.32262 11.7707 3.4489C11.7839 3.57519 11.7486 3.70177 11.6719 3.80297C11.5953 3.90418 11.4829 3.97241 11.3578 3.99383C11.2326 4.01526 11.104 3.98826 10.998 3.91833L10.944 3.87766L10.178 3.21099C10.0829 3.1277 10.0228 3.01145 10.0099 2.88564C9.99707 2.75983 10.0323 2.63382 10.1087 2.53299C10.185 2.43215 10.2967 2.36399 10.4213 2.34222C10.5458 2.32044 10.674 2.34669 10.78 2.41566ZM7.50004 0.666992C7.62672 0.667031 7.74867 0.715155 7.84124 0.801641C7.9338 0.888126 7.99009 1.00652 7.99872 1.13291C8.00736 1.2593 7.9677 1.38425 7.88775 1.48252C7.80781 1.5808 7.69354 1.64506 7.56804 1.66233L7.50004 1.66699H4.50004C4.37336 1.66695 4.25141 1.61883 4.15885 1.53234C4.06628 1.44586 4.00999 1.32746 4.00136 1.20107C3.99272 1.07468 4.03238 0.949731 4.11233 0.85146C4.19227 0.753188 4.30654 0.688926 4.43204 0.671659L4.50004 0.666992H7.50004Z"
                                    fill="white"
                                />
                            </svg>
                            <span>{{ game.duration }} хв</span>
                        </div>
                    </div>
                </div>
                <div v-if="game.game_quote" class="game-page__quote">
                    {{ game.game_quote }}
                </div>
                <div class="game-page__text" v-html="game.description" />
                <button
                    @click="
                        showModal();
                        setReservedGame(game.game_title);
                    "
                    class="btn game-page__btn"
                >
                    Забронювати гру
                </button>
            </div>
        </div>
    </section>
    <Callback />
</template>

<script setup>
import { useGamesStore } from "~/stores/games";
import useModal from "~/composables/useModal";
import useDropInfo from "~/composables/useDropInfo";

const config = useRuntimeConfig();
const route = useRoute();
const wpUri = config.public.wpUri;
const { isModalVisible, showModal, hideModal } = useModal();
const { resultMessage, changeResultMessage } = useDropInfo();

const reservedGame = ref("");

const { pending, data: game } = await useFetch(
    `${wpUri}/wp-json/wp/v2/game/${route.params.id}`
);

if (!game.value) {
    showError({
        statusCode: 404,
        statusMessage: "Упс! Сталася помилка: Гру не знайдено",
    });
}

const setReservedGame = (game) => {
    reservedGame.value = game;
};
const clearReservedGame = () => {
    reservedGame.value = "";
};
const getCategoryInfo = computed(() => {
    let category = game.value?.game_category[0].split("_").join("");
    category = category !== "mtg" ? category + "s" : "mtg";

    if (category === "boardgames") {
        return { name: "Настільні ігри", path: category };
    } else if (category === "roledgames") {
        return { name: "Рольові ігри", path: category };
    } else if (category === "mtg") {
        return { name: "МТГ", path: category };
    } else if (category === "wargames") {
        return { name: "Варгейми", path: category };
    } else false;
});
</script>
