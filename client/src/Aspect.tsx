import { useState } from 'react';
import "./Aspect.css";

type AspectData = {
    id: number;
    text: string;
    position: { x: number, y: number };
}

type AspectProps = {
    myId: number;
    text: string;
    myPosition: { x: number, y: number }
    isActive: boolean;
    onUpdate: (data: AspectData) => void;
    onActivate: () => void;
    onXClick: (idToRemove: number) => void;
};

function Aspect({ myId, text, myPosition, isActive, onActivate, onXClick, onUpdate } : AspectProps) {
    const [position, setPosition] = useState(myPosition);
    const [clickOffset, setClickOffset] = useState({ x: 0, y: 0 });
    const [myText, setMyText] = useState(text);
    const [inputVis, setInputVis] = useState("none");

    const handleDragStart = (e: any) => {
        setClickOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }

    const handleDragEnd = async (e: any) => {
        let newPosition = {
            x: e.clientX - clickOffset.x,
            y: e.clientY - clickOffset.y
        }
        setPosition(newPosition);
        onUpdate({id: myId, text: myText, position: newPosition});
    }

    const handleClick = () => {
        setInputVis("flex");
    }

    const handleKeyDown = async (e: any) => {
        if (e.key === "Enter") {
            if (e.shiftKey) setMyText(myText + "\n");
            else {
                setInputVis("none");
                onUpdate({id: myId, text: myText, position: position});
            }
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