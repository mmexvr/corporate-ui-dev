import { h } from '@stencil/core';

import { Header } from '../header/header';
import { Content } from '../content/content';
import { Footer } from '../footer/footer';

export const Main = () => (
  <main>
    <Header />
    <Content />
    <Footer />
  </main>
);