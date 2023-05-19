<template>
    <section class="hero">
        <div class="container">
            <div class="hero__wrapper">
                <h1 class="hero__title">
                    Клуб<br />
                    настільних ігор
                </h1>
                <div class="hero__btn-wrapper">
                    <a class="hero__btn" href="#">Забронювати гру</a>
                </div>
            </div>
        </div>
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
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ea doloribus, animi quaerat blanditiis nemo
                            molestias reiciendis dolor mollitia quo nesciunt.
                        </p>
                    </div>
                </div>
                <div class="catalog-wrapper__item catalog-wrapper__item_2">
                    <h3 class="catalog-wrapper__title">РоЛьові ігри</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>РоЛьові ігри</h3>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ea doloribus, animi quaerat blanditiis nemo
                            molestias reiciendis dolor mollitia quo nesciunt.
                        </p>
                    </div>
                </div>
                <div class="catalog-wrapper__item catalog-wrapper__item_3">
                    <h3 class="catalog-wrapper__title">МТГ</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>МТГ</h3>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ea doloribus, animi quaerat blanditiis nemo
                            molestias reiciendis dolor mollitia quo nesciunt.
                        </p>
                    </div>
                </div>
                <div class="catalog-wrapper__item catalog-wrapper__item_4">
                    <h3 class="catalog-wrapper__title">Варгейми</h3>
                    <div class="catalog-wrapper__item_hover">
                        <h3>Варгейми</h3>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ea doloribus, animi quaerat blanditiis nemo
                            molestias reiciendis dolor mollitia quo nesciunt.
                        </p>
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
                    <a class="btn" href="#">Написати у Телеграм</a>
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
</script>

