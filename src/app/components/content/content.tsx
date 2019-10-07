import { h } from '@stencil/core';

import { routes } from '../../routes';

const items = routes.filter(item => item.component);

export const Content = () => (
  <div class="content">
    <stencil-router>
      <stencil-route-switch scrollTopOffset={0}>
        { items.map(item =>
          <stencil-route url={item.path} component={item.component} exact={item.exact} />
        ) }
      </stencil-route-switch>
    </stencil-router>
  </div>
);
