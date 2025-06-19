import { useState } from 'react';
import "./Aspect.css";

type AspectProps = {
    isActive: boolean;
    onActivate: () => void;
};

function Aspect({ isActive, onActivate } : AspectProps) {
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

    const handleClick = (e: any) => {
        setInputVis("flex");
    }

    const handleKeyDown = (e: any) => {
        console.log(e);
        if (e.key === "Enter") {
            if (e.shiftKey) setMyText(myText + <br></br>);
            else setInputVis("none");
        }
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
            onClick = {e => handleClick(e)}
        >
            <textarea
                className = "aspect_textarea"
                style = {{
                    display: `${inputVis}`
                }}
                onKeyDown = {e => handleKeyDown(e)}
                onChange = {e => setMyText(e.target.value)}
            />
            { myText }
        </div>
    )
}

export default Aspect;