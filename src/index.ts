import { MouseDataManager } from './MouseDataManager';

/**
 * Placeholder function for debugging.
 */
const placeholderFunction = (
	message: string,
	event: Event,
): void => {
	if (process.env.NODE_ENV === 'DEV')
		console.log(
			`placeholderFunction: ${message}`,
			event,
		);
};

/**
 * Checks if the given element is an instance of HTMLElement.
 * @param element - The element to check.
 * @returns True if the element is an instance of HTMLElement, false otherwise.
 */
function isHTMLElement(
	element: any,
): element is HTMLElement {
	return (
		element !== undefined &&
		typeof element === 'object' &&
		element instanceof HTMLElement
	);
}

/**
 * Class that adds draggability to an HTMLElement.
 */
export class DragToBlank {
	DOMelement: HTMLElement;
	private mouseDataManager: MouseDataManager;
	protected static defaultClassName = 'drag-to-blank';
	mouseData;

	dragMoveHandler: (event: MouseEvent) => void;

	boundMouseDown: (event: MouseEvent) => void;
	boundDragStart: (event: MouseEvent) => void;
	boundDragEnd: (event: MouseEvent) => void;
	boundDragMove: (event: MouseEvent) => void;

	boundMouseDownHandler: (event: MouseEvent) => void;
	boundMouseUpHandler: (event: MouseEvent) => void;
	boundDragMoveHandler: (event: MouseEvent) => void;

	/**
	 *
	 * Creates an instance of DragToBlank.
	 * @param {HTMLElement} DOMelement
	 * @memberof DragToBlank
	 * @throws Error if the provided element is not an instance of HTMLElement.
	 *
	 */
	constructor(DOMelement: HTMLElement) {
		if (!isHTMLElement(DOMelement))
			throw new Error('DOMelement not found');
		this.DOMelement = DOMelement;

		this.mouseDataManager = new MouseDataManager();
		this.mouseData = {
			get: this.mouseDataManager.get.bind(
				this.mouseDataManager,
			),
		};
		this.dragMoveHandler = (event: MouseEvent) => {
			this.handleDragStart(event);
		};

		this.boundMouseDown = this.mouseDown.bind(this);
		this.boundDragStart = this.dragStart.bind(this);
		this.boundDragEnd = this.dragEnd.bind(this);
		this.boundDragMove = this.dragMove.bind(this);

		this.boundMouseDownHandler = (event: MouseEvent) =>
			this.handleMouseDown(event);
		this.boundMouseUpHandler = (event: MouseEvent) =>
			this.handleMouseUp(event);
		this.boundDragMoveHandler = (event: MouseEvent) => {
			this.dragMoveHandler(event);
		};

		this.DOMelement.addEventListener(
			'mousedown',
			this.boundMouseDownHandler,
		);
	}

	/**
	 * Placeholder function for mouse down event. Override this function to implement custom functionality.
	 *
	 * @protected
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 */
	protected mouseDown(event: MouseEvent): void {
		placeholderFunction('mouseDown', event);
	}

	/**
	 * Placeholder function for drag start event. Override this function to implement custom functionality.
	 *
	 * @protected
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 *
	 */
	protected dragStart(event: MouseEvent): void {
		placeholderFunction('dragStart', event);
	}

	/**
	 * Placeholder function for drag move event. Override this function to implement custom functionality.
	 *
	 * @protected
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 *
	 */
	protected dragMove(event: MouseEvent): void {
		placeholderFunction('dragMove', event);
	}

	/**
	 * Placeholder function for drag end event. Override this function to implement custom functionality.
	 *
	 * @protected
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 *
	 */
	protected dragEnd(event: MouseEvent): void {
		placeholderFunction('dragEnd', event);
	}

	/**
	 * Applies DragToBlank functionality to all elements with the given class name.
	 *
	 * @public
	 * @param {string} [className]
	 * @returns void
	 * @memberof DragToBlank
	 */
	static apply(className?: string): void {
		className = className ?? this.defaultClassName;
		if (className[0] !== '.')
			className = `.${className}`;
		let elements = document.querySelectorAll(className);
		elements.forEach((element) => {
			new DragToBlank(element as HTMLElement);
		});
	}

	/**
	 * Internal handler for mouse down event.
	 *
	 * @private
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 */
	private handleMouseDown(event: MouseEvent): void {
		this.mouseDataManager.set('mouseDown', event);
		window.addEventListener(
			'mouseup',
			this.boundMouseUpHandler,
		);
		window.addEventListener(
			'mousemove',
			this.boundDragMoveHandler,
		);
		this.boundMouseDown(event);
	}

	/**
	 * Internal handler for drag start event.
	 *
	 * @private
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 */
	private handleDragStart(event: MouseEvent): void {
		this.mouseDataManager.set('dragStart', event);
		this.dragMoveHandler = (event: MouseEvent) =>
			this.handleDragMove(event);
		this.boundDragStart(event);
	}

	/**
	 * Internal handler for drag move event.
	 *
	 * @private
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 */
	private handleDragMove(event: MouseEvent): void {
		this.mouseDataManager.set('dragMove', event);
		this.boundDragMove(event);
	}

	/**
	 * Internal handler for mouse up event.
	 *
	 * @private
	 * @param {MouseEvent} event
	 * @returns void
	 * @memberof DragToBlank
	 */
	private handleMouseUp(event: MouseEvent): void {
		window.removeEventListener(
			'mouseup',
			this.boundMouseUpHandler,
		);
		window.removeEventListener(
			'mousemove',
			this.boundDragMoveHandler,
		);
		this.mouseDataManager.set('dragEnd', event);
		this.boundDragEnd(event);
		this.dragMoveHandler = (event: MouseEvent) =>
			this.handleDragStart(event);
		this.mouseDataManager.clearMouseData();
	}
}

(window as any).DragToBlank = DragToBlank;
