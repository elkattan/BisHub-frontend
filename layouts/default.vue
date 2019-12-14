<template>
  <div dir="auto">
    <v-app>
      <nuxt />
    </v-app>
  </div>
</template>

<style>
html,
body {
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  box-sizing: border-box;
  background-color: var(--primary-bg-color);
}

@media screen and (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  margin: 0;
}

.is-clickable {
  cursor: pointer;
}

.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
</style>
