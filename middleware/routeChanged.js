export default function({ isHMR, app, store, route, params, error, redirect }) {
  console.log("%cWelcome To BisHub", "color: #0f111a; font-size: large;");
  console.log(
    "%cHello Instructor, is this proof enough ? 1718500",
    "color: #0f111a; font-size: large;"
  );

  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }

  // Auth
  if (
    route.name != null && // Ensuring the route is valid
    store.state.auth.user === null && // Checking is user is NOT authenticated
    !store.state.anonAllowed.includes(route.name) // If this route is allowed for Anonymouse users
  ) {
    // Redirect to login
    return redirect(`/?next=${route.fullPath}`);
  }

  // Localization

  // Getting browser preference
  const language = window
    ? (window.navigator.userLanguage || window.navigator.language).substr(0, 2)
    : undefined;
  const browserPref =
    language && store.state.localization.locales.includes(language)
      ? language
      : undefined;

  // Get locale from params
  const locale = params.lang || browserPref || defaultLocale;
  if (!store.state.localization.locales.includes(locale)) {
    return error({ message: "This page could not be found.", statusCode: 404 });
  }
  // Set locale in certain conditions
  if (!store.state.localization.locale || params.lang) {
    store.commit("localization/SET_LANG", locale);
  }
  app.i18n.locale = store.state.localization.locale;
  app.vuetify.rtl = store.state.localization.rtl.includes(locale);
  // If route is /<locale>/... -> redirect to /...
  if (route.fullPath.indexOf("/" + locale) === 0) {
    const toReplace =
      "^/" +
      locale +
      (route.fullPath.indexOf("/" + locale + "/") === 0 ? "/" : "");
    const re = new RegExp(toReplace);
    return redirect(route.fullPath.replace(re, "/"));
  }
}
