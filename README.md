# react-heading

## Smart Headings for React

`react-heading` is a React component that intelligently selects HTML Heading Elements (`<h1>`, ..., `<h6>`) for you.

It is often confusing which HTML Heading Element is most appropriate to use based on the DOM structure of your project. Further complicating this, the appropriate heading element can change within the context of where the component is rendered. For example, imagine you have a "Chart" component that is used both as the content of a full page and also shown as a widget on a dashboard page. In the former scenario you may use the `<h2>` element, but in the latter `<h5>` may be more appropriate because it's nested deeper in the DOM. This makes manually selecting heading elements infeasible since they should change dynamically within the context of the DOM hierarchy.

In modern HTML these specific heading elements (`<h1>`, ..., `<h6>`) should only be referenced by DOM interfacing technologies like screen-readers, using attributes like classes to dictate the visual styles or other behaviors. Using `react-heading` solves this and allows you to divorce this from the UI/UX designs. With this philosophy there should be no visual difference between the following `<h2 className='my-heading'>` and `<h5 className='my-heading'>`, these elements should be selected programmatically based on the ancestral DOM structure of the component.

To achieve this, `react-heading` uses a `ref` to search up the DOM using the `parentElement` and `children` properties from `HTMLElement`. This searches over all the element's "uncles" (`parentElement`'s `parentElement`'s `children`) for any elements that are `instanceof HTMLHeadingElement`, then recurses up to the `parentElement` to continue. The search is capped at a count depth of 5 because anything beyond that will default as `<h6>`.

## Installation

To install `react-heading` using `yarn`, run the following command:

```
yarn add @nicodes/react-heading
```

Or install with `npm`:

```
npm install @nicodes/react-heading
```

## Usage

### Basic Example

Below is a basic example of how to use `react-heading`:

```jsx
import H from "@nicodes/react-heading";

const App = () => (
  <div>
    <H>Level 1</H>
    <div>
      <H>Level 2</H>
      <div>
        <H>Level 3</H>
      </div>
    </div>
    <div>
      <p>Not a heading</p>
      <div>
        <H>Level 2</H>
      </div>
    </div>
  </div>
);
```

Which will render the following HTML:

```html
<div>
  <h1>Level 1</h1>
  <div>
    <h2>Level 2</h2>
    <div>
      <h3>Level 3</h3>
    </div>
  </div>
  <div>
    <p>Not a heading</p>
    <div>
      <h2>Level 2</h2>
    </div>
  </div>
</div>
```

### Props Examples

`react-heading` has two optional props `min` and `max`, that limit the potential heading degrees. For example limiting the degrees between `<h2>`, ..., `<h5>`, which you may want to do if `<h1>` is reserved to be specifically defined.

`react-heading` also supports all standard HTML Heading Element Attributes so you can add any props you'd normally use:

```jsx
<H
  min={2}
  max={5}
  id="my-id"
  className="my-class-name"
  data-cy="my-test-selector"
  {/* ... */}
>
  My Heading
</H>
```

## More Information

- Github: https://github.com/nicodes/react-heading
- npm: https://www.npmjs.com/package/@nicodes/react-heading
- Medium: https://nicodes.medium.com/react-heading-8ad7438d8f11
