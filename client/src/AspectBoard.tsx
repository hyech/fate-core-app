import { useState, useEffect } from 'react';
import Aspect from "./Aspect";

type AspectData = {
    id: number;
    text: string;
    position: { x: number, y: number };
}

function AspectBoard() {
    const [activeId, setActiveId] = useState(0);
    const [children, setChildren] = useState<AspectData[]>([]);

    const convertAllData = (data: any) => {
        let tempChildren = [];
        for (let i in data) {
            let newAspect = data[i];
            newAspect.position = {x: data[i].position[0], y: data[i].position[1]};
            tempChildren.push(newAspect);
        }

        setChildren(tempChildren);
        console.log(data);
        console.log(children);
    };

    const aspectToJson = (asp: AspectData) => {
        return JSON.stringify({
            id: asp.id,
            text: asp.text,
            position: [asp.position.x, asp.position.y]
        });
    }

    const findChildIndex = (idToFind: number) => {
        for (let i = 0; i < children.length; i++) {
            if (children[i].id === idToFind) return i;
        }
        return -1;
    }

    const handleButtonClick = async () => {
        let newAspect = {
            id: Math.random(),
            text: "",
            position: { x: 0.0, y: 0.0 }
        }
        setChildren([...children, newAspect]);

        await fetch("http://localhost:5013/api/Aspect", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: aspectToJson(newAspect)
        })
        .catch((error) => console.log(error));
    }

    const handleXClick = async (idToRemove: number) => {
        let deleteIndex = findChildIndex(idToRemove);
        if (deleteIndex != -1)
            setChildren([...children.slice(0, deleteIndex), ...children.slice(deleteIndex + 1)]);

            await fetch("http://localhost:5013/api/Aspect/" + idToRemove, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
            .catch((error) => console.log(error));
    }

    const handleAspectUpdate = async (data: AspectData) => {
        await fetch("http://localhost:5013/api/Aspect", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: aspectToJson(data)
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetch("http://localhost:5013/api/Aspect", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => convertAllData(data))
        .catch((error) => console.log(error));
    }, []);

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
                {children.map((child) => (
                    <Aspect
                        myId = {child.id}
                        text = {child.text}
                        myPosition = {child.position}
                        isActive = {activeId === child.id}
                        onActivate = {() => setActiveId(child.id)}
                        onXClick = {(idToRemove: number) => handleXClick(idToRemove)}
                        onUpdate = {(data: AspectData) => handleAspectUpdate(data)}
                        key = {child.id}
                    />
                ))}
            </div>
        </>
    )
}

export default AspectBoard;