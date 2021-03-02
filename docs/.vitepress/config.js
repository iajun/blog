module.exports = {
  title: 'Title',
  description: 'desc',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Config Reference',
        link: '/config/basics',
        activeMatch: '^/config/',
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/vuejs/vitepress/releases',
      },
    ],
    plugins: ['permalink-pinyin', ['autobar', { pinyinNav: true }]],
  },
};
