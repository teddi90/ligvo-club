<template>
    <section class="hero">
        <div class="container">
            <img
                ref="heroLayer1"
                class="hero-bg hero-layer1"
                src="~/assets/img/hero_bg.jpg"
                alt=""
            />
            <img
                ref="heroLayer2"
                class="hero-bg hero-layer2"
                src="~/assets/img/hero_ground.png"
                alt=""
            />
            <div ref="heroContent" class="hero__wrapper">
                <h1 class="hero__title">
                    Клуб<br />
                    настільних ігор
                </h1>
                <div class="hero__btn-wrapper">
                    <button @click="showModal" class="hero__btn">
                        Забронювати гру
                    </button>
                </div>
            </div>
        </div>
        <UIModal :isModalVisible="isModalVisible" @hideModal="hideModal">
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
    <Callback @showModal="showModal" />
    <section class="map-wrapper">
        <Map />
    </section>
    <Footer />
</template>

<script setup>
import useModal from "~/composables/useModal";
const heroLayer1 = ref(null);
const heroLayer2 = ref(null);
const heroContent = ref(null);
const { showModal, isModalVisible, hideModal } = useModal();

const heroParalax = () => {
    let scrollValue = window.scrollY;
    if (scrollValue > 270) {
        heroContent.value.style.zIndex = 1;
    } else {
        heroContent.value.style.zIndex = 2;
    }
    heroLayer2.value.style.bottom = `${-450 + scrollValue / 2}px`;
    heroLayer2.value.style.filter = `brightness(${1 - scrollValue / 2000})`;
    heroLayer1.value.style.filter = `brightness(${1 - scrollValue / 1000})`;
    heroContent.value.style.filter = `brightness(${1 - scrollValue / 1000})`;
};
onMounted(() => {
    window.addEventListener("scroll", heroParalax);
});
onUnmounted(() => {
    window.removeEventListener("scroll", heroParalax);
});
</script>

