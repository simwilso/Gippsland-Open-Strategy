import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Gippsland Open Strategy',
  tagline: 'Community-driven roadmap and documentation',
  favicon: 'img/favicon.ico',

  // Production URL configuration for GitHub Pages
  url: 'https://simwilso.github.io',
  baseUrl: '/Gippsland-Open-Strategy/',

  // GitHub Pages deployment configuration
  organizationName: 'simwilso',
  projectName: 'Gippsland-Open-Strategy',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
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
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/strategy',
          label: 'Strategy Documents',
          position: 'left',
        },
        {
          href: 'https://github.com/simwilso/Gippsland-Open-Strategy/blob/main/README.md',
          label: 'Project Overview',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Quick Links',
          position: 'left',
          items: [
            {
              to: '/strategy/master-strategy',
              label: '📋 Master Strategy',
            },
            {
              to: '/strategy/master-blueprint',
              label: '🏗️ Master Blueprint',
            },
            {
              to: '/strategy/90-day-launch',
              label: '🚀 90-Day Launch Plan',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              to: '/strategy/economic-development',
              label: '💼 Economic Development',
            },
            {
              to: '/strategy/just-transition',
              label: '⚖️ Just Transition',
            },
            {
              to: '/strategy/innovation-hub',
              label: '💡 Innovation Hub',
            },
            {
              to: '/strategy/environmental-impact',
              label: '🌱 Environmental Impact',
            },
          ],
        },
        {
          href: 'https://github.com/simwilso/Gippsland-Open-Strategy/issues/new',
          label: 'Provide Feedback',
          position: 'right',
        },
        {
          href: 'https://github.com/simwilso/Gippsland-Open-Strategy',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Project Overview',
              to: '/docs/overview',
            },
            {
              label: 'Complete Library',
              to: '/docs/comprehensive-docs',
            },
          ],
        },
        {
          title: 'Strategy Documents',
          items: [
            {
              label: 'Strategy Overview',
              to: '/strategy',
            },
            {
              label: 'Master Strategy',
              to: '/strategy/master-strategy',
            },
            {
              label: '90-Day Launch Plan',
              to: '/strategy/90-day-launch',
            },
            {
              label: 'All Strategies',
              to: '/strategy',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Provide Feedback',
              href: 'https://github.com/simwilso/Gippsland-Open-Strategy/issues/new',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/simwilso/Gippsland-Open-Strategy/discussions',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/simwilso/Gippsland-Open-Strategy',
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