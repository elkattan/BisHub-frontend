export const state = () => ({
  locales: ["en", "ar"],
  rtl: ["ar"],
  locale: ""
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  }
};
