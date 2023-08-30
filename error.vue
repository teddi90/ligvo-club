<template>
    <div>
        <HeaderNav />

        <div class="error-page">
            <div class="container">
                <h2 class="error-page__message">
                    {{ error.message }}
                </h2>
                <img src="~/assets/img/troll.png" alt="Троль" />
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup>
const error = useError();
</script>
