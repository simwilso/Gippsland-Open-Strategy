import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = {[
  {
    title: 'Community Driven',
    Svg: require('@site/static/img/undraw_community.svg').default,
    description: (
      <>
        Built by the community, for the community. Contribute to the roadmap
        and help shape Gippsland's digital future.
      </>
    ),
  },
  {
    title: 'Open Data',
    Svg: require('@site/static/img/undraw_data.svg').default,
    description: (
      <>
        Promoting transparency and accessibility through open data initiatives
        that benefit all stakeholders in the region.
      </>
    ),
  },
  {
    title: 'Collaborative Development',
    Svg: require('@site/static/img/undraw_collaboration.svg').default,
    description: (
      <>
        Working together across councils, organizations, and communities to
        build better digital infrastructure.
      </>
    ),
  },
]};

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