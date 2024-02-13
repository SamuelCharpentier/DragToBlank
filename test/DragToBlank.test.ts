import { DragToBlank } from '../src/index';
import { fireEvent } from '@testing-library/dom';

describe('DragToBlank', () => {
	let element: HTMLElement;
	let instance: DragToBlank;
	let windowSpy: jest.SpyInstance;
	let consoleSpy: jest.SpyInstance;

	beforeEach(() => {
		element = document.createElement('div');
		instance = new DragToBlank(element);
		consoleSpy = jest
			.spyOn(console, 'log')
			.mockImplementation();
		windowSpy = jest.spyOn(globalThis, 'window', 'get');
	});

	it('should exist', () => {
		expect(DragToBlank).toBeDefined();
	});

	it('should be created', () => {
		expect(instance).toBeInstanceOf(DragToBlank);
	});

	it('should store the DOM element', () => {
		expect(instance.DOMelement).toBe(element);
	});

	it('should throw an error if the element is not an HTMLElement', () => {
		const badFn = () => {
			new DragToBlank({} as HTMLElement);
		};
		expect(badFn).toThrow('DOMelement not found');
	});
	process.env.NODE_ENV = 'DEV';
	it('should log "mouseDown" when mouseDown is called', () => {
		fireEvent.mouseDown(element);
		// check if console.log was called with a string containing 'placeholderFunction: mouseDown'
		const numberOfMatches = (
			console.log as jest.Mock
		).mock.calls.filter((call) => {
			return call[0].includes(
				'placeholderFunction: mouseDown',
			);
		}).length;
		expect(numberOfMatches).toBeGreaterThan(0);
	});

	it('should log "dragStart" when dragStart is called', () => {
		fireEvent.mouseDown(element);
		fireEvent.mouseMove(window);

		const numberOfMatches = (
			console.log as jest.Mock
		).mock.calls.filter((call) => {
			return call[0].includes(
				'placeholderFunction: dragStart',
			);
		}).length;
		expect(numberOfMatches).toBeGreaterThan(0);
	});

	it('should log "dragMove" when dragMove is called', () => {
		fireEvent.mouseDown(element);
		fireEvent.mouseMove(window);
		fireEvent.mouseMove(window);

		const numberOfMatches = (
			console.log as jest.Mock
		).mock.calls.filter((call) => {
			return call[0].includes(
				'placeholderFunction: dragMove',
			);
		}).length;
		expect(numberOfMatches).toBeGreaterThan(0);
	});

	it('should log "dragEnd" when dragEnd is called', () => {
		fireEvent.mouseDown(element);
		fireEvent.mouseMove(element);
		fireEvent.mouseUp(window);

		const numberOfMatches =
			consoleSpy.mock.calls.filter((call) => {
				return call[0].includes(
					'placeholderFunction: dragEnd',
				);
			}).length;
		expect(numberOfMatches).toBeGreaterThan(0);
	});

	it('will loop through the states if the drag happens more than once', () => {
		let numberOfMatches;
		for (let i = 0; i < 20; i++) {
			consoleSpy.mockClear();
			const randomLengthLoop = Math.floor(
				Math.random() * 100,
			);
			fireEvent.mouseDown(element); // mouseDown
			fireEvent.mouseMove(window); // dragStart
			for (let i = 0; i < randomLengthLoop; i++) {
				fireEvent.mouseMove(window); // dragMove x randomLengthLoop
			}
			fireEvent.mouseUp(window); // dragEnd

			// check if console.log was called with a string containing 'placeholderFunction: dragMove' ${randomLengthLoop} times
			numberOfMatches = consoleSpy.mock.calls.filter(
				(call) => {
					return call[0].includes(
						'placeholderFunction: dragMove',
					);
				},
			).length;
			expect(numberOfMatches).toBeGreaterThanOrEqual(
				randomLengthLoop,
			);

			// check if console.log was called with a string containing 'placeholderFunction: dragStart' 1 times
			numberOfMatches = consoleSpy.mock.calls.filter(
				(call) => {
					return call[0].includes(
						'placeholderFunction: dragStart',
					);
				},
			).length;
			expect(numberOfMatches).toBe(1);
		}

		// clear the mock
		consoleSpy.mockClear();

		// check if it will loop back to the beginning if the drag happens again
		fireEvent.mouseDown(element); // mouseDown
		fireEvent.mouseMove(window); // dragStart
		fireEvent.mouseMove(window); // dragMove
		fireEvent.mouseUp(window); // dragEnd
		// check if console.log was called with a string containing 'placeholderFunction: dragStart' 2 times
		numberOfMatches = consoleSpy.mock.calls.filter(
			(call) => {
				return call[0].includes(
					'placeholderFunction: dragStart',
				);
			},
		).length;
		expect(numberOfMatches).toBe(1);
	});
	it.todo('removes window event listener after dragEnd');
	it('should apply DragToBlank functionality to all elements with the given class name', () => {
		const defaultClassName = 'drag-to-blank';
		const customClassName = 'custom-class-name';
		const element1 = document.createElement('div');
		element1.classList.add(defaultClassName);
		const element2 = document.createElement('div');
		element2.classList.add(defaultClassName);
		const element3 = document.createElement('div');
		element3.classList.add(customClassName);
		document.body.appendChild(element1);
		document.body.appendChild(element2);
		document.body.appendChild(element3);

		DragToBlank.apply();

		//trigger all events on each element and check mock console for the class logs
		consoleSpy.mockClear();
		fireEvent.mouseDown(element1);
		fireEvent.mouseMove(window);
		fireEvent.mouseMove(window);
		fireEvent.mouseUp(window);
		let numberOfMatches = consoleSpy.mock.calls.filter(
			(call) => {
				return call[0].includes(
					'placeholderFunction: mouseDown',
				);
			},
		).length;
		expect(numberOfMatches).toBe(1);

		DragToBlank.apply(customClassName);
	});
});
