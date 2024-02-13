import { DragToBlankExtension } from './DragToBlankExtension';
import { fireEvent } from '@testing-library/dom';

describe('DragToBlankTest', () => {
	let element: HTMLElement;
	let instance: DragToBlankExtension;

	beforeEach(() => {
		element = document.createElement('div');
		instance = new DragToBlankExtension(element);
		jest.spyOn(console, 'log').mockImplementation();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should log "mouseDown" when mouseDown is called', () => {
		fireEvent.mouseDown(element);
		expect(console.log).toHaveBeenCalledWith(
			'mouseDown',
		);
	});

	it('should log "dragStart" when dragStart is called', () => {
		fireEvent.mouseDown(element);
		fireEvent.mouseMove(window);
		expect(console.log).toHaveBeenCalledWith(
			'dragStart',
		);
	});

	it('should log "dragMove" when dragMove is called', () => {
		fireEvent.mouseDown(element);
		fireEvent.mouseMove(window);
		fireEvent.mouseMove(window);
		expect(console.log).toHaveBeenCalledWith(
			'dragMove',
		);
	});

	it('should log "dragEnd" when dragEnd is called', () => {
		fireEvent.mouseDown(element);
		fireEvent.mouseMove(element);
		fireEvent.mouseUp(window);
		expect(console.log).toHaveBeenCalledWith('dragEnd');
	});
});
