import { useState } from 'react';
import Aspect from "./Aspect";

function AspectBoard() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="AspectBoard">
            <Aspect
                isActive = {activeIndex === 0}
                onActivate = {() => setActiveIndex(0)}
            />
            <Aspect
                isActive = {activeIndex === 1}
                onActivate = {() => setActiveIndex(1)}
            />
        </div>
    )
}

export default AspectBoard;