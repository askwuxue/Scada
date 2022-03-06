const config = {
  url: '',
  appID: '',
  userID: '',
  vue: {
    Vue: null,
    router: null,
  },
};

export function setConfig(options) {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
}

export default config;
