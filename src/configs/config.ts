const config = {
  app: {
    name: "My App",
    version: "1.0.0",
    description: "My App Description",
    port: 3000,
    secret: "secret",
    test: "test",
    cdn_link: "https://space.ngc.nexg.dev/ngc/",
    env: process.env.NODE_ENV || "development",
    // env: 'production',
  },
  routes: {
    public: ["/auth/login", "/auth/register"],
  },
  token: {
    access_token_cookie_key: "auth.access.key",
    refresh_token_cookie_exp: "auth.refresh.key",
  },
};

export default config;
