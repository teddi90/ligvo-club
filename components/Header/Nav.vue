<template>
    <header
        class="header"
        :class="{ header_bg: scrollPosition > 50 }"
        ref="header"
    >
        <div class="container">
            <nav class="nav">
                <div class="nav__wrapper">
                    <div class="nav__logo">
                        <NuxtLink to="/" @click="closeMenu">
                            <img src="~/assets/img/logo.png" alt="Ligvo logo" />
                        </NuxtLink>
                    </div>
                    <ul class="menu">
                        <li class="menu__item">
                            <span class="menu__link menu__link_sub-menu"
                                >Каталог Ігор</span
                            >
                            <ul class="sub-menu">
                                <li class="sub-menu__item">
                                    <NuxtLink
                                        class="sub-menu__link"
                                        to="/boardgames"
                                        >Настільні ігри</NuxtLink
                                    >
                                </li>
                                <li class="sub-menu__item">
                                    <NuxtLink
                                        class="sub-menu__link"
                                        to="/rolegames"
                                        >Рольові ігри</NuxtLink
                                    >
                                </li>
                                <li class="sub-menu__item">
                                    <a class="sub-menu__link" href="#">МТГ</a>
                                </li>
                                <li class="sub-menu__item">
                                    <a class="sub-menu__link" href="#"
                                        >Варгейми</a
                                    >
                                </li>
                            </ul>
                        </li>
                        <li class="menu__item">
                            <NuxtLink class="menu__link" to="/about"
                                >Про нас</NuxtLink
                            >
                        </li>
                        <li class="menu__item">
                            <a class="menu__link" href="#footer">Контакти</a>
                        </li>
                    </ul>
                    <div
                        @click="toggleMenu(), closeSubMobileMenu()"
                        class="burger-container"
                    >
                        <div id="burger">
                            <div class="bar bar-top">
                                <img src="~/assets/img/mobile_left_arrow.svg" />
                            </div>
                            <div class="bar bar-mdl">
                                <img
                                    src="~/assets/img/mobile_right_arrow.svg"
                                />
                            </div>
                            <div class="bar bar-btm">
                                <img src="~/assets/img/mobile_left_arrow.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu-mobile__wrapper">
                    <div>
                        <ul class="menu-mobile">
                            <li class="menu-mobile__item">
                                <button
                                    @click="toggleSubMobileMenu"
                                    class="menu-mobile__link"
                                >
                                    Каталог ігор
                                </button>
                                <ul class="sub-menu-mobile" ref="subMenuMobile">
                                    <li class="sub-menu-mobile__item">
                                        <NuxtLink
                                            @click="
                                                closeMenu(),
                                                    closeSubMobileMenu()
                                            "
                                            to="/boardgames"
                                            class="sub-menu-mobile__link"
                                            >Настільні ігри</NuxtLink
                                        >
                                    </li>
                                    <li class="sub-menu-mobile__item">
                                        <NuxtLink
                                            @click="
                                                closeMenu(),
                                                    closeSubMobileMenu()
                                            "
                                            to="/rolegames"
                                            class="sub-menu-mobile__link"
                                            >Рольові ігри</NuxtLink
                                        >
                                    </li>
                                    <li class="sub-menu-mobile__item">
                                        <NuxtLink
                                            @click="
                                                closeMenu(),
                                                    closeSubMobileMenu()
                                            "
                                            to="#"
                                            class="sub-menu-mobile__link"
                                            >МТГ</NuxtLink
                                        >
                                    </li>
                                    <li class="sub-menu-mobile__item">
                                        <NuxtLink
                                            @click="
                                                closeMenu(),
                                                    closeSubMobileMenu()
                                            "
                                            to="#"
                                            class="sub-menu-mobile__link"
                                            >Варгейми</NuxtLink
                                        >
                                    </li>
                                </ul>
                            </li>
                            <li class="menu-mobile__item">
                                <NuxtLink
                                    @click="closeMenu"
                                    to="/about"
                                    class="menu-mobile__link"
                                    >Про нас</NuxtLink
                                >
                            </li>

                            <li class="menu-mobile__item">
                                <a
                                    @click="closeMenu"
                                    href="#footer"
                                    class="menu-mobile__link"
                                    >Контакти</a
                                >
                            </li>
                        </ul>
                        <div class="menu-mobile__bottom">
                            <h4>Зв’язатися з нами</h4>
                            <a href="tel:+0954314083" class="btn"
                                >Зателефонувати</a
                            >
                            <a
                                href="https://t.me/+380954314083"
                                target="_blank"
                                class="btn"
                                >Телеграм чат</a
                            >
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>
<script setup>
const header = ref(null);
const subMenuMobile = ref(null);
const scrollPosition = ref(null);

const toggleMenu = () => {
    header.value.classList.toggle("menu-mobile-opened");
};
const closeMenu = () => {
    header.value.classList.remove("menu-mobile-opened");
};
const toggleSubMobileMenu = () => {
    subMenuMobile.value.classList.toggle("sub-menu-mobile__open");
};
const closeSubMobileMenu = () => {
    subMenuMobile.value.classList.remove("sub-menu-mobile__open");
};
const updateScroll = () => {
    scrollPosition.value = window.scrollY;
};
onMounted(() => {
    window.addEventListener("scroll", updateScroll);
});
</script>
