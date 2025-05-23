'use client';
import { useState, DragEvent, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ElementType = 'Text' | 'Image' | 'Div' | 'List';

interface CanvasElement {
	id: string;
	type: ElementType;
	content: string;
	style: React.CSSProperties;
	children?: CanvasElement[];
}

export default function Home() {
	const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
	const [selectedElementIndex, setSelectedElementIndex] = useState<
		number | null
	>(null);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

	const handleDragStart = (e: DragEvent<HTMLLIElement>, type: ElementType) => {
		e.dataTransfer.setData('type', type);
	};
	const handleElementDragStart = (index: number) => {
		setDraggingIndex(index);
	};
	const allowDrop = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

	const handleElementDrop = (dropIndex: number) => {
		if (draggingIndex === null || draggingIndex === dropIndex) return;

		const reordered = [...canvasElements];
		const [moved] = reordered.splice(draggingIndex, 1);
		reordered.splice(dropIndex, 0, moved);
		setCanvasElements(reordered);
		setDraggingIndex(null);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const type = e.dataTransfer.getData('type') as ElementType;
		const newElement: CanvasElement = {
			id: uuidv4(),
			type,
			content: `${type} Content`,
			style: {
				fontSize: '16px',
				color: '#000000',
				padding: '8px',
			},
		};

		setCanvasElements((prev) => [...prev, newElement]);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (selectedElementIndex === null) return;

		const updated = [...canvasElements];
		updated[selectedElementIndex] = {
			...updated[selectedElementIndex],
			content: e.target.value,
		};
		setCanvasElements(updated);
	};

	const handleStyleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		if (selectedElementIndex === null) return;

		const { name, value } = e.target;
		const updated = [...canvasElements];

		let newStyleValue: string | number = value;

		// For numeric styles that require 'px'
		if (name === 'fontSize' || name === 'padding' || name === 'margin') {
			newStyleValue = `${value}px`;
		}

		updated[selectedElementIndex] = {
			...updated[selectedElementIndex],
			style: {
				...updated[selectedElementIndex].style,
				[name]: newStyleValue,
			},
		};

		setCanvasElements(updated);
	};

	return (
		<div className="h-screen flex font-sans text-gray-800">
			{/* Left Sidebar */}
			<aside className="w-64 bg-gray-100 p-4 border-r border-gray-300">
				<h2 className="text-lg font-semibold mb-4">Elements</h2>
				<ul className="grid grid-cols-2 gap-2">
					{(['Text', 'Image', 'Div', 'List'] as ElementType[]).map((type) => (
						<li
							key={type}
							draggable
							onDragStart={(e) => handleDragStart(e, type)}
							className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
						>
							{type}
						</li>
					))}
				</ul>
			</aside>

			{/* Main Canvas Area */}
			<main className="flex-1 bg-white p-4 overflow-auto">
				<h2 className="text-xl font-bold mb-4">Canvas</h2>
				<div
					id="canvas"
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					className="min-h-full border-2 border-dashed border-gray-300 p-4 rounded"
				>
					{canvasElements.length === 0 ? (
						<p className="text-gray-500 text-center">Drag elements here...</p>
					) : (
						canvasElements.map((el, index) => (
							<div
								key={el.id}
								draggable
								onDragStart={() => handleElementDragStart(index)}
								onDrop={() => handleElementDrop(index)}
								onDragOver={allowDrop}
								onClick={() => setSelectedElementIndex(index)}
								style={el.style}
								className={`p-2 mb-2 border rounded cursor-move ${
									index === selectedElementIndex
										? 'border-blue-500'
										: 'border-gray-300'
								}`}
							>
								{el.content}
							</div>
						))
					)}
				</div>
			</main>

			{/* Right Sidebar */}
			<aside className="w-64 bg-gray-50 p-4 border-l border-gray-300">
				<h2 className="text-lg font-semibold mb-4">Edit Options</h2>
				{selectedElementIndex !== null ? (
					<div className="space-y-4">
						{/* Background Color */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Background Color
							</label>
							<input
								type="color"
								name="backgroundColor"
								value={
									canvasElements[selectedElementIndex].style.backgroundColor ||
									'#ffffff'
								}
								onChange={handleStyleChange}
								className="w-full border rounded p-1"
							/>
						</div>

						{/* Font Weight */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Font Weight
							</label>
							<select
								name="fontWeight"
								value={
									canvasElements[selectedElementIndex].style.fontWeight ||
									'normal'
								}
								onChange={handleStyleChange}
								className="w-full border rounded p-2"
							>
								<option value="normal">Normal</option>
								<option value="bold">Bold</option>
								<option value="lighter">Lighter</option>
								<option value="bolder">Bolder</option>
							</select>
						</div>

						{/* Margin */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Margin (px)
							</label>

							<input
								type="number"
								name="margin"
								value={parseInt(
									canvasElements[
										selectedElementIndex
									].style.margin?.toString() || '8',
									10
								)}
								onChange={handleStyleChange}
								className="w-full border rounded p-2"
							/>
						</div>

						{/* Padding */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Padding (px)
							</label>

							<input
								type="number"
								name="padding"
								value={parseInt(
									canvasElements[
										selectedElementIndex
									].style.padding?.toString() || '8',
									10
								)}
								onChange={handleStyleChange}
								className="w-full border rounded p-2"
							/>
						</div>

						{/* Content Editor */}
						<div>
							<label className="block text-sm font-medium mb-1">Content</label>
							<input
								type="text"
								value={canvasElements[selectedElementIndex].content}
								onChange={handleContentChange}
								className="w-full border rounded p-2"
							/>
						</div>

						{/* Font Size */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Font Size (px)
							</label>
							<input
								type="number"
								name="fontSize"
								value={parseInt(
									canvasElements[
										selectedElementIndex
									].style.fontSize?.toString() || '16',
									10
								)}
								onChange={handleStyleChange}
								className="w-full border rounded p-2"
							/>
						</div>

						{/* Font Color */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Font Color
							</label>
							<input
								type="color"
								name="color"
								value={
									canvasElements[selectedElementIndex].style.color as string
								}
								onChange={handleStyleChange}
								className="w-full border rounded p-1"
							/>
						</div>
					</div>
				) : (
					<p className="text-gray-700">Select an element to see options</p>
				)}
			</aside>
		</div>
	);
}
