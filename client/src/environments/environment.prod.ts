import preview from '/projects/virtualagent/previewurl.json';
export const environment = {
  production: true,
  deployment: 'production',
  debug: false,
  APP_CONFIG_KEY: 'APP_CONFIG',
  API_BASE_URL: preview.url+'api',
  socket: {
    baseUrl: preview.url,
    options: {forceNew: false}
  }
};
