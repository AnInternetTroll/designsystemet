<br>
<div align="center">
    <img alt="Designsystemet logo" src="assets/img/logo.svg">
</div>

<h1 align="center">
    Designsystemet
</h1>

<div align="center">

---

</div>

## 📖 About Designsystemet

Designsystemet is a collection of important design elements, componenents and patterns that can be used to build public services.

Our goal is to create consistent and user-friendly experiences in digital solutions for public services, making them more efficient and reliable.

---

## 🔗 Links

[Storybook](https://storybook.designsystemet.no/) - For developing and testing our React components.

[Storefront](https://designsystemet.no/) - General documentation about the design system.

---

## 📦 Packages

[`@digdir/design-system-react`](https://www.npmjs.com/package/@digdir/design-system-react) – React library with common UI components like Buttons and Checkboxes.

[`@digdir/design-system-tokens`](https://www.npmjs.com/package/@digdir/design-system-tokens) – Tokens that contain UI data like colors and spacing for building user interfaces.

---

## 🚀 Get started

Follow these steps to get started with the React components.

### 1. Install the packages

```
npm install @digdir/design-system-react @digdir/design-system-tokens
```

### 2. Add the Inter font

Add the `<link>` tag to your application and set the `font-family` to `Inter`.

The `font-feature-settings` adds a tail to lowecase `L`'s and must be set with the `!important` flag.

#### HTML

```html
<link
  rel="stylesheet"
  href="https://altinncdn.no/fonts/inter/inter.css"
/>
```

#### CSS

```css
body {
  font-family: 'Inter', sans-serif;
  font-feature-settings: 'cv05' 1 !important; /* Enable lowercase l with tail */
}
```

If you choose to install the font in a different way, remember to include the `400`, `500` and `600` font weights.

### 3. Use a React component

```jsx
import '@digdir/design-system-tokens/brand/digdir/tokens.css';

import { Button } from '@digdir/design-system-react';

<Button variant='secondary'>I am a button!</Button>;
```

The `tokens.css` file only has to be imported once in your application.

---

## 🫶 Contributing

Learn how you can contribute to this project by reading our Code of Conduct and Contributing Guide.

### Code of Conduct

The [Code of Conduct](./CODE_OF_CONDUCT.md) emphasizes the importance of respectful communication and the avoidance of discrimination, harassment, or any harmful behavior, promoting a positive and diverse community.

### Contributing Guide

Our [Contributing Guide](./CONTRIBUTING.md) provides clear instructions on how to participate in the project, ensuring that developers can efficiently contribute their skills and ideas to the community.

---

## 💪 Contributors

We are lucky to have a great group of people who help with the design system.

<a style="margin-top: 32px; display: block;" href="https://github.com/digdir/designsystem/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=digdir/designsystem" />
</a>

---

## 📃 Licence

Designsystemet is [MIT licensed](./LICENSE).
