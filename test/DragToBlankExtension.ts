import { DragToBlank } from '../src/index';

export class DragToBlankExtension extends DragToBlank {
	protected override mouseDown(): void {
		console.log('mouseDown');
	}

	protected override dragStart(): void {
		console.log('dragStart');
	}

	protected override dragMove(): void {
		console.log('dragMove');
	}

	protected override dragEnd(): void {
		console.log('dragEnd');
	}
}
