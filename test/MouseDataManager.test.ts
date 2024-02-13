import { MouseDataManager } from '../src/MouseDataManager';

describe('MouseDataManager', () => {
	let instance: MouseDataManager;

	beforeEach(() => {
		instance = new MouseDataManager();
	});

	it('should exist', () => {
		expect(MouseDataManager).toBeDefined();
	});

	it('should initialize with no data', () => {
		expect(instance.get('mouseDown')).toBeUndefined();
		expect(instance.get('dragStart')).toBeUndefined();
		expect(instance.get('dragMove')).toBeUndefined();
		expect(instance.get('dragEnd')).toBeUndefined();
	});

	it('should set and get mouseDown data', () => {
		const position = { x: 10, y: 20 };
		const timestamp = Date.now();
		instance.set('mouseDown', position, timestamp);
		const data = instance.get('mouseDown');
		expect(data).toEqual({ timestamp, position });
	});

	it('should set and get dragStart data', () => {
		const position = { x: 30, y: 40 };
		const timestamp = Date.now();
		instance.set('dragStart', position, timestamp);
		const data = instance.get('dragStart');
		expect(data).toEqual({ timestamp, position });
	});

	it('should set and get dragMove data', () => {
		const position = { x: 50, y: 60 };
		const timestamp = Date.now();
		instance.set('dragMove', position, timestamp);
		const data = instance.get('dragMove');
		expect(data).toEqual({
			timestamp,
			position,
			prev: undefined,
		});
	});

	it('should set and get dragEnd data', () => {
		const position = { x: 70, y: 80 };
		const timestamp = Date.now();
		instance.set('dragEnd', position, timestamp);
		const data = instance.get('dragEnd');
		expect(data).toEqual({ timestamp, position });
	});

	it('should clear all data', () => {
		instance.set('mouseDown', { x: 10, y: 20 });
		instance.set('dragStart', { x: 30, y: 40 });
		instance.set('dragMove', { x: 50, y: 60 });
		instance.set('dragEnd', { x: 70, y: 80 });
		instance.clearMouseData();
		expect(instance.get('mouseDown')).toBeUndefined();
		expect(instance.get('dragStart')).toBeUndefined();
		expect(instance.get('dragMove')).toBeUndefined();
		expect(instance.get('dragEnd')).toBeUndefined();
	});
	it('should be able to handle mouseEvent as data input', () => {
		const position = { x: 10, y: 20 };
		const timestamp = Date.now();
		const event = new MouseEvent('mousedown', {
			clientX: position.x,
			clientY: position.y,
		});
		instance.set('mouseDown', event, timestamp);
		const data = instance.get('mouseDown');
		expect(data).toEqual({ timestamp, position });
	});
	it('should append dragMove data', () => {
		const position = { x: 10, y: 20 };
		const timestamp = Date.now();
		instance.set('dragMove', position, timestamp);
		const data = instance.get('dragMove');
		expect(data).toEqual({
			timestamp,
			position,
			prev: undefined,
		});
		const position2 = { x: 30, y: 40 };
		const timestamp2 = Date.now();
		instance.set('dragMove', position2, timestamp2);
		const data2 = instance.get('dragMove');
		const expectedData: any = {
			timestamp: timestamp2,
			position: position2,
		};
		expectedData.prev = {
			timestamp,
			position,
			prev: undefined,
			next: expectedData,
		};
		expect(data2).toEqual(expectedData);
	});
});
