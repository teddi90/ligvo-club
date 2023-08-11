<template>
    <Form @submit="onSubmit" class="form">
        <h3 class="form__title">Забронювати гру</h3>
        <div class="form__info">
            <p>Привіт, друже!</p>
            <p>
                Щоб забронювати гру заповни форму нижче, скоро ми зв’яжемося з
                тобою для уточнення інформації
            </p>
        </div>
        <div class="text-center">
            <div class="form__inputs-wrapper">
                <div class="form__input-item">
                    <label class="form__label" for="user-name">Ім'я</label>
                    <Field
                        :rules="validateName"
                        class="form__input"
                        name="name"
                        type="text"
                        id="user-name"
                        placeholder="Ім'я"
                    />
                    <ErrorMessage class="form__error" name="name" />
                </div>

                <div class="form__input-item">
                    <label class="form__label" for="user-phone"
                        >Номер телефону</label
                    >
                    <Field
                        :rules="validatePhone"
                        class="form__input"
                        type="tel"
                        name="phone"
                        id="user-phone"
                        placeholder="+380"
                    />
                    <ErrorMessage class="form__error" name="phone" />
                </div>
                <div class="form__input-item">
                    <label class="form__label" for="user-game">Назва гри</label>
                    <UISelect
                        placeholder="Назва гри"
                        :optionsList="allGameTitle"
                        :selectedOption="selectedOption"
                        v-model="selectedOption"
                    />
                </div>
                <div class="form__input-item">
                    <label class="form__label" for="user-game">Коментар</label>
                    <textarea
                        class="form__textarea"
                        placeholder="Коментар"
                        type="text"
                        name="message"
                        v-model.trim="userMessage"
                    />
                </div>
                <button type="submit" class="btn form__btn">Забронювати</button>
            </div>
        </div>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useGamesStore } from "~/stores/games";
const emit = defineEmits([
    "clearReservedGame",
    "hideModal",
    "changeResultMessage",
]);
const props = defineProps({
    reservedGame: {
        type: String,
        default: "",
    },
});
const store = useGamesStore();

const allGameTitle = computed(() => {
    return store.allGames.map((game) => game.game_title);
});
const clearReservedGame = () => {
    emit("clearReservedGame");
};
const changeResultMessage = (message) => {
    emit("changeResultMessage", message);
};
const config = useRuntimeConfig();
const TOKEN = config.public.telegramToken;
const CHAT_ID = config.public.telegramChatId;
const selectedOption = ref(props.reservedGame);
const userMessage = ref("");

const onSubmit = async (value, { resetForm }) => {
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    let message = selectedOption.value
        ? `<b>Гра: </b>${selectedOption.value}\n`
        : "";
    message += `<b>Ім'я: </b>${value.name}\n`;
    message += `<b>Телефон: </b>${value.phone}\n`;
    if (userMessage.value) {
        message += `<b>Повідомлення: </b>${userMessage.value}`;
    }

    await useFetch(URI_API, {
        method: "POST",
        params: { chat_id: CHAT_ID, parse_mode: "html", text: message },
        onResponse({ request, response, options }) {
            if (response.status === 200) {
                changeResultMessage(
                    "Бронювання успішне, скоро ми зв’яжемося з тобою для уточнення інформації"
                );
                resetForm();
                emit("hideModal");
            }
        },
        onResponseError({ request, response, options }) {
            if (response.status > 399) {
                changeResultMessage("Щось пішло не так, спробуйте ще раз");
            }
        },
    });
    clearReservedGame();
};
const validateName = (value) => {
    if (!value) {
        return "Це поле обов'язкове";
    } else if (value.trim().length < 2) {
        return "Введіть ваше ім'я";
    }
    return true;
};
const validatePhone = (value) => {
    const regex = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm;
    if (!value) {
        return "Це поле обов'язкове";
    }
    if (!regex.test(value) && value) {
        return "Введіть номер телефону в форматі +380";
    }
    return true;
};
</script>

