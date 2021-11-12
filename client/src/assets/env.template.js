(function(window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["APP_CONFIG_KEY"] = "${APP_CONFIG_KEY}";
  window["env"]["API_BASE_URL"] = "${API_BASE_URL}";
  window["env"]["debug"] = "${DEBUG}";
})(this);
