import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { JSX } from 'react';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'INDONESIA’s CARE PATHWAY',
    Svg: require('@site/static/cp/PDF1_SVG1.svg').default,
    description: (
      <>
        <a href="/care-pathways">INDONESIA’s CARE PATHWAY</a> Manajemen Alur Pelayanan Kesehatan di Fasilitas Pelayanan Kesehatan Tingkat Pertama (FKTP).
      </>
    ),
  },
  {
    title: 'Pemeriksaan Kesehatan Gratis',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <a href="/PKG/pendahuluan">Pemeriksaan Kesehatan Gratis (PKG)</a> dilaksanakan melalui pendekatan siklus hidup, dimulai sejak bayi baru lahir hingga lanjut usia.
      </>
    ),
  },
  {
    title: 'Integrasi Pelayanan Kesehatan Primer',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Strategi global pelayanan kesehatan berfokus pada individu (people centred), terintegrasi guna mewujudkan pelayanan yang lebih komprehensif, responsif dan terjangkau untuk mengatasi beragam kebutuhan kesehatan yang diperlukan masyarakat. <a href="/ILP/pendahuluan">Lihat...</a>
      </>
    ),
  },
  {
    title: 'Panduan Praktik Klinis',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Pedoman baku minimum dengan mengutamakan upaya maksimal sesuai kompetensi dan fasilitas yang ada. Pedoman ini berisi <a href="/PPK/praktik-klinis">Panduan Praktik Klinis</a> dan <a href="/PPK/keterampilan-klinis">Panduan Keterampilan Klinis</a>
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
