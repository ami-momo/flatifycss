// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "FlatifyCSS",
  tagline: "Modern Flat Design Framework",
  favicon: "img/favicon.ico",
  url: "https://flatifycss.amimomo.me",
  baseUrl: "/",
  organizationName: "ami-momo",
  projectName: "flatifycss",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/ami-momo/flatifycss/tree/master/website",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/ami-momo/flatifycss/tree/master/website",
          onUntruncatedBlogPosts: "ignore",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: false,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/logo.png",
      navbar: {
        title: "FlatifyCSS",
        logo: {
          alt: "FlatifyCSS logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          { to: "/blog", label: "News", position: "left" },
          {
            href: "https://react-flatifycss.amimomo.me",
            label: "React",
            position: "left",
          },
          {
            href: "https://github.com/ami-momo/flatifycss",
            label: "Contribute",
            position: "left",
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.palenight,
        additionalLanguages: ["scss"],
      },
      footer: {
        copyright: `Made with ❤️ by Amir M. Mohamadi and contributors.`,
      },
    }),
};

module.exports = config;
