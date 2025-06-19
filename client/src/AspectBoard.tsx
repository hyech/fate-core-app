import { useState } from 'react';
import Aspect from "./Aspect";

function AspectBoard() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [aspectIndex, setAspectIndex] = useState(0);
    const [children, setChildren] = useState<number[]>([]);

    const handleClick = () => {
        setChildren([...children, aspectIndex]);
        setAspectIndex(aspectIndex + 1);
    }

    return (
        <>
            <button
                style = {{
                    height: "100px",
                    width: "100px",
                    fontSize: "50px"
                }}
                onClick = {() => handleClick()}
            >+</button>
            <div className="AspectBoard">
                {children.map((index) => (
                    <Aspect
                        isActive = {activeIndex === index}
                        onActivate = {() => setActiveIndex(index)}
                        key = {index}
                    />
                ))}
            </div>
        </>
    )
}

export default AspectBoard;