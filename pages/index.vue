<template>
    <section class="hero">
        <div class="container">
            <img
                class="hero-bg hero-layer1"
                src="~/assets/img/hero_bg.jpg"
                alt=""
            />
            <img
                class="hero-bg hero-layer2"
                src="~/assets/img/hero_ground.png"
                alt=""
            />
            <div class="hero__wrapper">
                <h1 class="hero__title">
                    Клуб<br />
                    настільних ігор
                </h1>
                <div class="hero__btn-wrapper">
                    <a @click="showModal" class="hero__btn" href="#"
                        >Забронювати гру</a
                    >
                </div>
            </div>
        </div>
        <UIModal v-model:isModalVisible="isModalVisible">
            <UIForm />
        </UIModal>
    </section>
    <section class="catalog">
        <div class="container">
            <h2 class="title">Каталог ігор</h2>
            <UIFrame />
            <div class="catalog-wrapper">
                <div class="catalog-wrapper__item catalog-wrapper__item_1">
                    <h3 class="catalog-wrapper__title">Настільні ігри</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>Настільні ігри</h3>
                        <p>
                            Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд. Текст про настільні
                            ігри, які є ігри, вікова категорія, жанри, типи і
                            тд. Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд.
                        </p>
                        <NuxtLink class="btn catalog__btn" to="boardgames"
                            >Більше</NuxtLink
                        >
                    </div>
                </div>
                <div class="catalog-wrapper__item catalog-wrapper__item_2">
                    <h3 class="catalog-wrapper__title">Рольові ігри</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>Рольові ігри</h3>
                        <p>
                            Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд. Текст про настільні
                            ігри, які є ігри, вікова категорія, жанри, типи і
                            тд. Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд. Текст про настільні
                            ігри, які є ігри, вікова категорія, жанри, типи і
                            тд. Текст про настільні ігри
                        </p>
                        <NuxtLink class="btn catalog__btn" to="#"
                            >Більше</NuxtLink
                        >
                    </div>
                </div>
                <div class="catalog-wrapper__item catalog-wrapper__item_3">
                    <h3 class="catalog-wrapper__title">МТГ</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>МТГ</h3>
                        <p>
                            Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд. Текст про настільні
                            ігри, які є ігри, вікова категорія, жанри, типи і
                            тд. Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд. Текст про настільні
                            ігри, які є ігри, вікова категорія, жанри, типи і
                            тд.
                        </p>
                        <NuxtLink class="btn catalog__btn" to="#"
                            >Більше</NuxtLink
                        >
                    </div>
                </div>
                <div class="catalog-wrapper__item catalog-wrapper__item_4">
                    <h3 class="catalog-wrapper__title">Варгейми</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>Варгейми</h3>
                        <p>
                            Текст про настільні ігри, які є ігри, вікова
                            категорія, жанри, типи і тд. Текст про настільні
                            ігри, які є ігри, вікова категорія, жанри, типи і
                            тд.
                        </p>
                        <NuxtLink class="btn catalog__btn" to="#"
                            >Більше</NuxtLink
                        >
                    </div>
                </div>
            </div>
            <UIFrame :downFrame="true" />
        </div>
    </section>
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
                        <a @click="showModal" class="btn" href="#"
                            >Написати у Телеграм</a
                        >
                        <img
                            src="~/assets/img/flag.png"
                            class="callback-btn__flag"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="map-wrapper">
        <Map />
    </section>
    <Footer />
</template>

<script setup>
let heroLayer1;
let heroLayer2;
let heroContent;
const isModalVisible = ref(false);

const showModal = () => {
    isModalVisible.value = true;
};
const heroParalax = () => {
    let scrollValue = window.scrollY;
    if (scrollValue > 230) {
        heroContent.style.zIndex = 1;
    } else {
        heroContent.style.zIndex = 2;
    }
    heroLayer2.style.bottom = `${-450 + scrollValue / 2}px`;
    heroLayer2.style.filter = `brightness(${1 - scrollValue / 2000})`;
    heroLayer1.style.filter = `brightness(${1 - scrollValue / 1000})`;
    heroContent.style.filter = `brightness(${1 - scrollValue / 1000})`;
};
onMounted(() => {
    heroContent = document.querySelector(".hero__wrapper");
    heroLayer1 = document.querySelector(".hero-layer1");
    heroLayer2 = document.querySelector(".hero-layer2");

    window.addEventListener("scroll", heroParalax);
});
</script>

