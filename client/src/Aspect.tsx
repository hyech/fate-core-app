import { useState } from 'react';
import "./Aspect.css";

type AspectProps = {
    myId: number;
    isActive: boolean;
    onActivate: () => void;
    onXClick: (idToRemove: number) => void;
};

function Aspect({ myId, isActive, onActivate, onXClick } : AspectProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clickOffset, setClickOffset] = useState({ x: 0, y: 0 });
    const [myText, setMyText] = useState("Test\nTest\nTest");
    const [inputVis, setInputVis] = useState("none");

    const handleDragStart = (e: any) => {
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

    const handleClick = () => {
        setInputVis("flex");
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            if (e.shiftKey) setMyText(myText + "\n");
            else setInputVis("none");
        }
    }

    return (
        <div
            className = "aspect_container"
            draggable = "true"
            style = {{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isActive ? 1 : 0
            }}
            onDragStart = {e => { onActivate(); handleDragStart(e) }}
            onDragEnd = {e => handleDragEnd(e)}
            onClick = {() => handleClick()}
        >
            <div
                className = "aspect_text"
                style = {{
                    display: `${!inputVis}`
                }}
            >
                { myText }
            </div>
            <textarea
                className = "aspect_textarea"
                style = {{
                    display: `${inputVis}`
                }}
                onKeyDown = {e => handleKeyDown(e)}
                onChange = {e => setMyText(e.target.value)}
            />
            <button
                className = "aspect_xbutton"
                onClick = {() => onXClick(myId)}
            >
                X
            </button>
        </div>
    )
}

export default Aspect;