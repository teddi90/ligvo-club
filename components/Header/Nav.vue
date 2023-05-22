<template>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="nav__wrapper">
                    <div class="nav__logo">
                        <NuxtLink to="/">
                            <img src="~/assets/img/logo.png" alt="Ligvo logo" />
                        </NuxtLink>
                    </div>
                    <ul class="menu">
                        <li class="menu__item">
                            <a class="menu__link menu__link_sub-menu" href="#"
                                >Каталог Ігор</a
                            >
                            <ul class="sub-menu">
                                <li class="sub-menu__item">
                                    <a class="sub-menu__link" href="#"
                                        >Настільні ігри</a
                                    >
                                </li>
                                <li class="sub-menu__item">
                                    <a class="sub-menu__link" href="#"
                                        >Рольові ігри</a
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
                            <NuxtLink class="menu__link" to="#"
                                >Про нас</NuxtLink
                            >
                        </li>
                        <li class="menu__item">
                            <a class="menu__link" href="#footer">Контакти</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>
<script setup>
</script>
