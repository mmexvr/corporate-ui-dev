export default {
  title: 'Navigation',
  description: [
    'The navigation has a desktop mode and a mobile mode where the break point is at 992px viewport width. Check out the header component to see the changes in mobile view. The navigation is highly customizable as it can host both primary and secondary items. You can also set the orientation to horisontal or vertical. If not set, the default is horisontal.',
    'You can populate navigation links in two ways: JSON objects or providing it in a slot. See examples below to see how it works with different ways of populating navigation links.',
  ],
  preview: '<c-header></c-header>',
  items: [
    {
      title: 'Items as data',
      description: 'This header setup shows the usage of a navigation inside the header.',
      content: `
<c-navigation
  primary-items='[{ "text": "home", "href": "/home", "class": "active" }, { "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "user", "href": "/user" }, { "text": "more", "href": "/more" }]'></c-navigation>
      `,
    },
    {
      title: 'Items in slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/about" slot="primary-items">about</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `,
    },
    {
      title: 'Items both as data and in slots displayed in vertical orientation',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation
  orientation="vertical"
  primary-items='[{ "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "more", "href": "/more" }]'>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `,
    },
    {
      title: 'Items both as data and in slots displayed in vertical orientation',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation
  orientation="vertical"
  primary-items='[{ "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "more", "href": "/more" }]'>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `,
    },
  ],
};