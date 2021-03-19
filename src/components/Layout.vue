<template>
  <v-app>
      <v-main class="pt-1">
        <transition name="fade-transform" mode="out-in">
        <keep-alive>
            <router-view />
        </keep-alive>
        </transition>
    </v-main>
  </v-app>
</template>