<template>
    <section class="about">
        <div class="container">
            <h2 class="title">Про нас</h2>
            <p class="about__text">
                Текст про гру, які є ігри, вікова категорія, жанри, типи і тд.
                Текст про настільні ігри, які є ігри, вікова категорія, жанри,
                типи і тд. Текст про настільні ігри, які є ігри, вікова
                категорія, жанри, типи і тд. Текст про настільні ігри, які є
                ігри, вікова категорія, жанри, типи і тд. Текст про настільні
                ігри, які є ігри, вікова категорія, жанри, типи і тд.
            </p>
            <p class="about__text">
                Текст про гру, які є ігри, вікова категорія, жанри, типи і тд.
                Текст про настільні ігри, які є ігри, вікова категорія, жанри,
                типи і тд. Текст про настільні ігри, які є ігри, вікова
                категорія, жанри, типи і тд. Текст про настільні ігри, які є
                ігри, вікова категорія, жанри, типи і тд. Текст про настільні
                ігри, які є ігри, вікова категорія, жанри, типи і тд.
            </p>
            <div class="about__images">
                <div class="about__image-wrapper">
                    <img
                        class="about__image"
                        src="~/assets/img/about1.jpg"
                        alt=""
                    />
                </div>
                <div class="about__image-wrapper">
                    <img
                        class="about__image"
                        src="~/assets/img/about2.jpg"
                        alt=""
                    />
                </div>
                <div class="about__image-wrapper">
                    <img
                        class="about__image"
                        src="~/assets/img/about3.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div class="about-slider">
                <Swiper
                    class="about-slider"
                    @swiper="onSwiper"
                    :slides-per-view="1"
                    :loop="true"
                >
                    <SwiperSlide>
                        <div>
                            <div class="about-slider__item">
                                <img
                                    class="about-slider__img"
                                    src="~/assets/img/about1.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="about-slider__item">
                            <img
                                class="about-slider__img"
                                src="~/assets/img/about2.jpg"
                                alt=""
                            />
                        </div> </SwiperSlide
                    ><SwiperSlide>
                        <div class="about-slider__item">
                            <img
                                class="about-slider__img"
                                src="~/assets/img/about3.jpg"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div class="about-slider__naviagation">
                    <button
                        class="about-slider__arrow"
                        @click="swiper.slidePrev()"
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
                    <span class="about-slider__indicator"
                        >{{ swiper?.realIndex + 1 }}/3</span
                    >
                    <button
                        class="about-slider__arrow"
                        @click="swiper.slideNext()"
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
            <p class="about__text">
                Текст про гру, які є ігри, вікова категорія, жанри, типи і тд.
                Текст про настільні ігри, які є ігри, вікова категорія, жанри,
                типи і тд. Текст про настільні ігри, які є ігри, вікова
                категорія, жанри, типи і тд. Текст про настільні ігри, які є
                ігри, вікова категорія, жанри, типи і тд. Текст про настільні
                ігри, які є ігри, вікова категорія, жанри, типи і тд.
            </p>
            <p class="about__text">
                Текст про гру, які є ігри, вікова категорія, жанри, типи і тд.
                Текст про настільні ігри, які є ігри, вікова категорія, жанри,
                типи і тд. Текст про настільні ігри, які є ігри, вікова
                категорія, жанри, типи і тд. Текст про настільні ігри, які є
                ігри, вікова категорія, жанри, типи і тд. Текст про настільні
                ігри, які є ігри, вікова категорія, жанри, типи і тд.
            </p>
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useSwiper } from "swiper/vue";

const swiper = ref(null);

const onSwiper = (instance) => (swiper.value = instance);
</script>
