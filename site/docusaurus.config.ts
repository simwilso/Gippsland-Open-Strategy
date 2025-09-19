import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Gippsland Open Strategy',
  tagline: 'A Community Driven blueprint for Gippslands Energy Transition',
  favicon: 'img/favicon.ico',

  // Production URL configuration for GitHub Pages
  url: 'https://simwilso.github.io',
  baseUrl: '/Gippsland-Open-Strategy/',

  // GitHub Pages deployment configuration
  organizationName: 'simwilso',
  projectName: 'Gippsland-Open-Strategy',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/simwilso/Gippsland-Open-Strategy/edit/main/site/',
          routeBasePath: 'docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'Gippsland Open Strategy',
      logo: {
        alt: 'VAIO Logo',
        src: 'img/VAIOLogo.png',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'To integrate AI into your business',
          items: [
            {
              label: 'Visit www.virtualaiofficer.com.au',
              href: 'https://www.virtualaiofficer.com.au',
            },
            {
              label: 'Call: +61482082619',
              href: 'tel:+61482082619',
            },
            {
              label: 'LinkedIn: Virtual AI Officer',
              href: 'https://www.linkedin.com/company/virtual-ai-officer',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gippsland Open Strategy. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;