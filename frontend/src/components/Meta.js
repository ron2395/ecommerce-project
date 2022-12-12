import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keyword' content={keywords}></meta>
    </Helmet>
  );
}

Meta.defaultProps = {
    title: 'Welcome to anywhere store',
    keywords: 'buy cheap electronics, buy cheap products'
}

export default Meta
