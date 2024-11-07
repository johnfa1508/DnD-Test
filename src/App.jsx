import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import './App.css';

export default function App() {
	const containers = ['unlisted', 'awaiting', 'processing', 'rejected'];
	const [items, setItems] = useState({
		unlisted: ['item1', 'item2', 'item3'],
		awaiting: [],
		processing: [],
		rejected: [],
	});

	function handleDragEnd(event) {
		const { active, over } = event;

		setItems((prevItems) => {
			const sourceContainer = prevItems.unlisted.includes(active.id)
				? 'unlisted'
				: Object.keys(prevItems).find((key) =>
						prevItems[key].includes(active.id)
				  );

			if (over) {
				const destinationContainer = over.id;

				if (sourceContainer === destinationContainer) {
					return prevItems;
				}

				console.log(
					`Moved ${active.id} from ${sourceContainer} to ${destinationContainer}`
				);

				return {
					...prevItems,
					[sourceContainer]: prevItems[sourceContainer].filter(
						(id) => id !== active.id
					),
					[destinationContainer]: [
						...prevItems[destinationContainer],
						active.id,
					],
				};
			} else {
				// If dropped outside any container, move it back to unlisted if not already there
				if (!prevItems.unlisted.includes(active.id)) {
					console.log(
						`Moved ${active.id} from ${sourceContainer} back to unlisted`
					);

					return {
						...prevItems,
						[sourceContainer]: prevItems[sourceContainer].filter(
							(id) => id !== active.id
						),
						unlisted: [...prevItems.unlisted, active.id],
					};
				} else {
					return prevItems;
				}
			}
		});
	}

	return (
		<>
			<h1>Drag & Drop Test</h1>

			<DndContext onDragEnd={handleDragEnd}>
				<div className="container">
					{containers.map((id) => (
						<div key={id}>
							<h3>{id}</h3>
							<Droppable id={id}>
								{items[id].map((itemId, index) => (
									<Draggable key={itemId} id={itemId} index={index}>
										{itemId}
									</Draggable>
								))}

								{items[id].length === 0 && <p>Drop here</p>}
							</Droppable>
						</div>
					))}
				</div>
			</DndContext>
		</>
	);
}
