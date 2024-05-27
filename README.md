# Table of Contents

1. [Introduction](#DragToBlank)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Packages extending DragToBlank](#packages-extending-dragToBlank)
6. [License](#license)

# DragToBlank

DragToBlank is a simple, lightweight TypeScript NPM library that provides a foundation for adding drag interactions to your web applications. By extending the `DragToBlank` class and overriding the `mouseDown`, `dragStart`, `dragMove`, and `dragEnd` methods, you can easily customize the behavior of your DragToBlank elements.

## Installation

```bash
npm install -D drag-to-blank
```

## Usage

First, import the DragToBlank class from the package:

```typescript
import { DragToBlank } from 'drag-to-blank';
```

Next, extend the `DragToBlank` class and override or add the necessary methods and properties:

```typescript
export class MyDragToBlank extends DragToBlank {
	//...custom class properties
	protected override defaultClassName = 'my-DragToBlank';
	private options?: MyDragToBlankOptions;

	//... custom constructor
	constructor(
		element: HTMLElement,
		options?: MyDragToBlankOptions,
	) {
		super(element);
		this.options = options;
	}

	protected mouseDown(event: MouseEvent): void {
		// Custom mouse down behavior
	}

	protected dragStart(event: MouseEvent): void {
		// Custom drag start behavior
	}

	protected dragMove(event: MouseEvent): void {
		// Custom drag move behavior
	}

	protected dragEnd(event: MouseEvent): void {
		// Custom drag end behavior
	}

	//...custom class methods
}
```

Finally, instantiate your DragToBlank element by passing in the element to be dragged or by using the apply method to apply the DragToBlank behavior to all elements with the specified class name (defaults to `DragToBlank` if not overridden) or a specified class name:

```typescript
import { MyDragToBlank } from 'my-DragToBlank';

const DragToBlank = new MyDragToBlank(
	document.getElementById('my-DragToBlank-element'),
);
// or
MyDragToBlank.apply();
// or
MyDragToBlank.apply('my-DragToBlank-class');
```

## API

### Mouse Data

To access mouse data, use the `mouseData` property of the DragToBlank class. Its `get()` method retrieves the mouse data for a given mouse data type. If no data is found for the key, it returns undefined. The keys are as follows:

-   `'mouseDown'`
-   `'dragStart'`
-   `'dragMove'`
-   `'dragEnd'`

```typescript
const mouseDownData = this.mouseData.get('mouseDown');
```

All mouse data is stored as an object of type `StampedPosition` which has the following properties:

| Property    | Type                       | Description                       |
| ----------- | -------------------------- | --------------------------------- |
| `timestamp` | `number`                   | The timestamp of the mouse event. |
| `position`  | `{x : number, y : number}` | The position of the mouse event.  |

The mouse data of dragMove is stored as a `LinkedStampedPosition` object. It extends the `StampedPosition` type. Its additional properties are:

| Property | Type              | Description                                                                                                            |
| -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `prev`   | `StampedPosition` | The previous mouse move StampedPosition. On initializing the first node, the value of `dragStart` is assigned to prev. |
| `next`   | `StampedPosition` | The next mouse move StampedPosition. **On the latest node, this is undefined.**                                        |

### Static Properties

| Property           | Type            | Access           | Description                                                                                              |
| ------------------ | --------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `defaultClassName` | `string`        | protected static | The default class name to use when applying DragToBlank behavior to elements (defaults to `DragToBlank`) |
| `instances`        | `DragToBlank[]` | static           | An array to hold all instances of the DragToBlank class                                                  |

### Methods

| Method                         | Description                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apply(className?: string)`    | Applies DragToBlank behavior to all elements with either the specified `className` if provided or the `defaultClassName` property value                                 |
| `mouseDown(event: MouseEvent)` | This method is called when the mouse button is pressed down on the DragToBlank element. Override this method to implement custom behavior if desired.                   |
| `dragStart(event: MouseEvent)` | This method is called a single time on the first mouse movement event following the `mouseDown()` method. Override this method to implement custom behavior if desired. |
| `dragMove(event: MouseEvent)`  | This method is called on every mouse movement event after the `dragStart()` method. Override this method to implement custom behavior if desired.                       |
| `dragEnd(event: MouseEvent)`   | This method is called when the mouse button is released after the `dragStart()` method. Override this method to implement custom behavior if desired.                   |

## Example

This example shows how to extend the DragToBlank class to implement custom behavior. In this example, we will log a message, the original event and the mouse down data to the console on each mouse move event that occurs after the mouse is down event occured on the target element.

```typescript
import { DragToBlank } from 'DragToBlank';

export class MyDragToBlank extends DragToBlank {
	protected override defaultClassName = 'my-DragToBlank';

	constructor(element: HTMLElement) {
		super(element);
	}

	protected override dragMove(event: MouseEvent): void {
		let mouseDownData = this.mouseData.get('mouseDown');
		console.log('my mouse move', event, mouseDownData);
	}
}
```

## Packages extending DragToBlank

This section includes links to packages that extend the `DragToBlank` base class. If you've created a package that extends `DragToBlank`, feel free to add it here.

1. [DragToScroll](https://github.com/SamuelCharpentier/DragToScroll): Allows you to drag with the mouse to scroll a page or any elements with scrollbars.
2. [DragToTranslate](https://github.com/SamuelCharpentier/DragToTranslate): Allows you to drag with the mouse to translate an element.

To add your extension to this list, please submit a pull request with the changes to this README file.

<!-- ## Contributing

We welcome contributions from everyone. It can be as simple as adding a link to your extended DragToBlank class. Here are a few guidelines to help you get started:

1. **Fork the Repository**: Start by forking the repository to your own GitHub account.

2. **Clone the Repository**: Clone the repository to your local machine.

```bash
git clone https://github.com/<your-username>/DragToBlank.git
```

3. Create a New Branch: Create a new branch for your changes. This helps to keep the work isolated and makes it easy to update your fork with the latest changes from the main repository.

```bash
git checkout -b my-new-feature
```

4. Make Your Changes: Make your changes to the code. Try to keep your changes small and focused on fixing a specific problem or adding a specific feature.

5. Commit Your Changes: Commit your changes to your branch.

```bash
git commit -m "Add a brief description of your change"
```

6. Push Your Changes: Push your changes to your fork on GitHub.

```bash
git push origin my-new-feature
```
7. Submit a Pull Request: Go to your fork on GitHub and submit a pull request to the main repository. Please provide a clear description of the changes in the pull request description.

Before submitting a pull request, please make sure your code follows the existing style of the codebase and all tests pass.

## Demo

A demo of the DragToBlank class can be found [here (comming soon)](). -->

## License

[MIT](./LICENSE)
