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
                            <a href="#">Каталог Ігор</a>
                        </li>
                        <li class="menu__item">
                            <NuxtLink to="#">Про нас</NuxtLink>
                        </li>
                        <li class="menu__item">
                            <a href="#footer">Контакти</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>
<script setup>
</script>
