<template>
    <section class="callback">
        <div class="container">
            <h2 class="title">Зв’яжіться з нами</h2>
            <UIFrame />
            <div class="callback-card">
                <div class="callback-card__wrapper">
                    <p class="callback-card__text">
                        Буль ласка, звяжіться з нами якщо бажаєте записатись на
                        гру або хочете дізнатись будь-яку іншу інформацію.
                    </p>
                    <div class="callback-btn__wrapper">
                        <button @click="showModal" class="btn">
                            Написати у Телеграм
                        </button>
                        <img
                            src="~/assets/img/flag.png"
                            class="callback-btn__flag"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const emit = defineEmits(["showModal"]);
const showModal = (e) => {
    emit("showModal", e.target);
};
</script>
