<template>
    <Form @submit="onSubmit" class="form">
        <h3>Зв’яжіться з нами</h3>
        <p>Ми відповімо Вам протягом 24 годин</p>
        <div class="form__input-wrapper">
            <Field
                class="form__input"
                name="name"
                type="text"
                placeholder="Ім'я"
            />
            <ErrorMessage class="form__error" name="name" />
        </div>
        <div class="form__input-wrapper">
            <Field
                :rules="validateEmail"
                class="form__input"
                type="email"
                name="email"
                placeholder="email@example.com"
            />
            <ErrorMessage class="form__error" name="email" />
        </div>
        <div class="form__input-wrapper">
            <Field
                :rules="validatePhone"
                class="form__input"
                type="tel"
                name="phone"
                placeholder="+380"
            />
            <ErrorMessage class="form__error" name="phone" />
        </div>
        <div class="form__input-wrapper">
            <Field
                class="form__textarea"
                placeholder="Текст"
                type="text"
                name="message"
            />
            <ErrorMessage class="form__error" name="message" />
            <div
                :class="{
                    success: resultMessage.status === 'success',
                    faild: resultMessage.status === 'faild',
                }"
                class="form__result-message"
                v-if="resultMessage.isShow"
            >
                {{ resultMessage.message }}
            </div>
        </div>
        <div class="form__btn-wrapper">
            <button type="submit" class="btn form__btn">Відправити</button>
        </div>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
const config = useRuntimeConfig();
const TOKEN = config.public.telegramToken;
const CHAT_ID = config.public.telegramChatId;

const resultMessage = ref({ isShow: false, status: "", message: "" });

const onSubmit = async (value, { resetForm }) => {
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    let message = `<b>Ім'я: </b>${value.name}\n`;
    message += `<b>Емейл: </b>${value.email}\n`;
    message += `<b>Телефон: </b>${value.phone}\n`;
    message += `<b>Повідомлення: </b>${value.message}`;

    await useFetch(URI_API, {
        method: "POST",
        params: { chat_id: CHAT_ID, parse_mode: "html", text: message },
        onResponse({ request, response, options }) {
            if (response.status === 200) {
                resultMessage.value = {
                    isShow: true,
                    status: "success",
                    message: "Ваше заявка надіслана успішно",
                };
                resetForm();
            }
        },
        onResponseError({ request, response, options }) {
            if (response.status > 399) {
                resultMessage.value = {
                    isShow: true,
                    status: "faild",
                    message: "Щось пішло не так, спробуйте ще раз",
                };
            }
        },
    });
    setTimeout(() => {
        resultMessage.value = { isShow: false, status: "", message: "" };
    }, 3000);
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
const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return "Це поле обов'язкове";
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return "Введіть правельну поштову адресу";
    }
    // All is good
    return true;
};
</script>

