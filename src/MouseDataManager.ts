type Position = { x: number; y: number };

export type StampedPosition = {
	timestamp: number;
	position: Position;
};

export type LinkedStampedPosition = StampedPosition & {
	prev?: LinkedStampedPosition;
	next?: LinkedStampedPosition;
};

export class MouseDataManager {
	private data: {
		mouseDown?: StampedPosition;
		dragMove?: LinkedStampedPosition;
		dragStart?: StampedPosition;
		dragEnd?: StampedPosition;
	} = {};

	get(key: 'dragMove'): LinkedStampedPosition | undefined;
	get(
		key: 'mouseDown' | 'dragStart' | 'dragEnd',
	): StampedPosition | undefined;
	get(
		key:
			| 'mouseDown'
			| 'dragStart'
			| 'dragMove'
			| 'dragEnd',
	): StampedPosition | undefined {
		return this.data[key];
	}

	set(
		key:
			| 'mouseDown'
			| 'dragStart'
			| 'dragMove'
			| 'dragEnd',
		position: Position | MouseEvent,
		timestamp: number = Date.now(),
	): StampedPosition {
		if (this.isMouseEvent(position))
			position = this.XYfromEvent(position);
		const { x, y } = position;
		let data: StampedPosition = {
			timestamp,
			position: {
				x,
				y,
			},
		};
		if (key === 'dragMove')
			if (this.data.dragMove === undefined)
				data = this.initiatedragMove(data);
			else data = this.appenddragMove(data);
		return (this.data[key] = data);
	}

	private isMouseEvent(
		position: Position | MouseEvent,
	): position is MouseEvent {
		return (
			(position as MouseEvent).clientX !== undefined
		);
	}

	private XYfromEvent(event: MouseEvent): Position {
		return {
			x: event.clientX,
			y: event.clientY,
		};
	}

	private initiatedragMove(
		data: StampedPosition,
	): LinkedStampedPosition {
		let newData: LinkedStampedPosition = data;
		if (this.data.dragMove === undefined) {
			newData.prev =
				this.data.dragStart ??
				this.data.mouseDown ??
				undefined;
			return newData;
		}
		return newData;
	}

	private appenddragMove(
		newValue: StampedPosition,
	): LinkedStampedPosition {
		const data: LinkedStampedPosition = {
			...newValue,
			prev: this.data.dragMove,
		};
		if (this.data.dragMove !== undefined)
			this.data.dragMove.next = data;
		return data;
	}

	clearMouseData(): void {
		this.data = {};
	}
}
