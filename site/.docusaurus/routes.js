import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Gippsland-Open-Strategy/strategy',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy', 'd90'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/90-day-launch',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/90-day-launch', '57f'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/brand-narrative',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/brand-narrative', '30c'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/economic-development',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/economic-development', '3fc'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/environmental-impact',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/environmental-impact', '103'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/innovation-hub',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/innovation-hub', '8a6'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/just-transition',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/just-transition', '159'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/master-blueprint',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/master-blueprint', '300'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/master-strategy',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/master-strategy', '51f'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/policy-regulatory',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/policy-regulatory', '85a'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/strategy/stakeholder-engagement',
    component: ComponentCreator('/Gippsland-Open-Strategy/strategy/stakeholder-engagement', '3ab'),
    exact: true
  },
  {
    path: '/Gippsland-Open-Strategy/docs',
    component: ComponentCreator('/Gippsland-Open-Strategy/docs', '520'),
    routes: [
      {
        path: '/Gippsland-Open-Strategy/docs',
        component: ComponentCreator('/Gippsland-Open-Strategy/docs', '880'),
        routes: [
          {
            path: '/Gippsland-Open-Strategy/docs',
            component: ComponentCreator('/Gippsland-Open-Strategy/docs', '258'),
            routes: [
              {
                path: '/Gippsland-Open-Strategy/docs/intro',
                component: ComponentCreator('/Gippsland-Open-Strategy/docs/intro', '036'),
                exact: true,
                sidebar: "mainSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/Gippsland-Open-Strategy/',
    component: ComponentCreator('/Gippsland-Open-Strategy/', 'd96'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
