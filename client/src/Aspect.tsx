import { useState } from 'react';
import "./Aspect.css";

type AspectProps = {
    isActive: boolean;
    onActivate: () => void;
};

function Aspect({ isActive, onActivate } : AspectProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clickOffset, setClickOffset] = useState({ x: 0, y: 0 });

    const handleDragStart = (e: any) => {
        console.log(isActive);

        setClickOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }

    const handleDragEnd = (e: any) => {
        setPosition({
            x: e.clientX - clickOffset.x,
            y: e.clientY - clickOffset.y
        });
    }

    return (
        <div
            className = "aspect"
            draggable = "true"
            style = {{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isActive ? 1 : 0
            }}
            onDragStart = {e => { onActivate(); handleDragStart(e) }}
            onDragEnd = {e => handleDragEnd(e)}
        >
            Test
        </div>
    )
}

export default Aspect;