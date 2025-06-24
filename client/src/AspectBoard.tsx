import { useState } from 'react';
import Aspect from "./Aspect";

function AspectBoard() {
    const [activeId, setActiveId] = useState(0);
    const [children, setChildren] = useState<number[]>([]);

    const handleButtonClick = () => {
        setChildren([...children, Math.random()]);
    }

    const handleXClick = (idToRemove: number) => {
        let deleteIndex = children.indexOf(idToRemove);
        setChildren([...children.slice(0, deleteIndex), ...children.slice(deleteIndex + 1)]);
    }

    return (
        <>
            <button
                style = {{
                    height: "100px",
                    width: "100px",
                    fontSize: "50px"
                }}
                onClick = {() => handleButtonClick()}
            >+</button>
            <div className="AspectBoard">
                {children.map((childId) => (
                    <Aspect
                        myId = {childId}
                        isActive = {activeId === childId}
                        onActivate = {() => setActiveId(childId)}
                        onXClick = {(idToRemove: number) => handleXClick(idToRemove)}
                        key = {childId}
                    />
                ))}
            </div>
        </>
    )
}

export default AspectBoard;