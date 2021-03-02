---
title: Postcss Preset Env
date: 2020-03-10 21:04:04
catagories: css
tags: css
---

`postcss-preset-env` lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments.

# the rules can be inside of it:

## all-property (postcss-initial):

```css
a {
  animation: initial;
  background: initial;
  white-space: initial;
}
p {
  background: url(/img1.png), url(/img2.png);
  background-repeat: initial no-repeat;
}
```

after transformed:

```css
a {
  animation: none 0s ease 0s 1 normal none running;
  animation: initial;
  background: transparent none repeat 0 0 / auto auto padding-box border-box
    scroll;
  background: initial;
  white-space: normal;
  white-space: initial;
}
p {
  background: url(/img1.png), url(/img2.png);
  background-repeat: repeat no-repeat;
}
```

```css
a {
  all: initial;
}
```

after transformed:

```css
a {
  animation: none 0s ease 0s 1 normal none running;
  backface-visibility: visible;
  background: transparent none repeat 0 0 / auto auto padding-box border-box
    scroll;
  border: medium none currentColor;
  border-collapse: separate;
  border-image: none;
  border-radius: 0;
  border-spacing: 0;
  bottom: auto;
  box-shadow: none;
  box-sizing: content-box;
  caption-side: top;
  clear: none;
  clip: auto;
  color: #000;
  columns: auto;
  column-count: auto;
  column-fill: balance;
  column-gap: normal;
  column-rule: medium none currentColor;
  column-span: 1;
  column-width: auto;
  content: normal;
  counter-increment: none;
  counter-reset: none;
  cursor: auto;
  direction: ltr;
  display: inline;
  empty-cells: show;
  float: none;
  font-family: serif;
  font-size: medium;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  line-height: normal;
  height: auto;
  hyphens: none;
  left: auto;
  letter-spacing: normal;
  list-style: disc outside none;
  margin: 0;
  max-height: none;
  max-width: none;
  min-height: 0;
  min-width: 0;
  opacity: 1;
  orphans: 2;
  outline: medium none invert;
  overflow: visible;
  overflow-x: visible;
  overflow-y: visible;
  padding: 0;
  page-break-after: auto;
  page-break-before: auto;
  page-break-inside: auto;
  perspective: none;
  perspective-origin: 50% 50%;
  position: static;
  right: auto;
  tab-size: 8;
  table-layout: auto;
  text-align: left;
  text-align-last: auto;
  text-decoration: none;
  text-indent: 0;
  text-shadow: none;
  text-transform: none;
  top: auto;
  transform: none;
  transform-origin: 50% 50% 0;
  transform-style: flat;
  transition: none 0s ease 0s;
  unicode-bidi: normal;
  vertical-align: baseline;
  visibility: visible;
  white-space: normal;
  widows: 2;
  width: auto;
  word-spacing: normal;
  z-index: auto;
  all: initial;
}
```

## any-link-pseudo-class (postcss-pseudo-class-any-link)

represents an element that acts as the source anchor of a hyperlink, such as `<a> <area> <link>` that has a href attribute

```html
<a href="https://example.com">External link</a><br />
<a href="#">Internal target link</a><br />
<a>Placeholder link (won't get styled)</a>
```

```css
a:any-link {
  border: 1px solid blue;
  color: orange;
}

/* WebKit browsers */
a:-webkit-any-link {
  border: 1px solid blue;
  color: orange;
}
```

{% img  /image/postcss-preset-env/any-link.png %}

## blank-pseudo-class (css-blank-pseudo)

The PostCSS plugin clones rules containing :blank, replacing them with an alternative [blank] selector. It represents three types of nodes: 1, with no child node 2, with just blank child text node 3, just child text node of space characters

```css
input:blank {
  background-color: yellow;
}

/* becomes */

input[blank] {
  background-color: yellow;
}

input:blank {
  background-color: yellow;
}
```
