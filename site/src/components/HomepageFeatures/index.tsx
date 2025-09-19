import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Community Driven',
    Svg: require('@site/static/img/undraw_community.svg').default,
    description: (
      <>
        Built by the community, for the community. We are using an open source 
        approach combined with the power of AI Agents to imagine and document a 
        vision for Gippslands Energy Transition.
      </>
    ),
  },
  {
    title: 'Open Data',
    Svg: require('@site/static/img/undraw_data.svg').default,
    description: (
      <>
        Anyone can access, download, review or provide feedback. In fact we 
        encourage you to.
      </>
    ),
  },
  {
    title: 'Collaborative Development',
    Svg: require('@site/static/img/undraw_collaboration.svg').default,
    description: (
      <>
        No tech knowledge required. Click the feedback button on any page and 
        give us your thoughts whatever they may be. Each week our AI Team will 
        be given your inputs to integrate.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}