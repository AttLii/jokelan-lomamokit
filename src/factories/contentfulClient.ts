import * as contentful from 'contentful';
import Contentful from '../repositories/contentful';

const client = new Contentful(
  contentful.createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE,
  }).withoutUnresolvableLinks
);

export default client;
