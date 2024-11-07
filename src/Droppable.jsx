/* eslint-disable react/prop-types */
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});
	const style = {
		border: isOver ? '2px dashed green' : '2px dashed #ddd',
		padding: '20px',
		borderRadius: '8px',
		backgroundColor: isOver ? '#e8f5e9' : '#fafafa',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100px',
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={isOver ? 'droppable is-over' : 'droppable'}>
			{props.children}
		</div>
	);
}
