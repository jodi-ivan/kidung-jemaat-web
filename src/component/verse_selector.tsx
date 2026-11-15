import React, { useState, useEffect } from 'react'

interface VerseSelectorProps {
    totalVerse: number;
    selected?: number;
    onChange?: (verse: number) => void;
}


export const VerseSelector: React.FC<VerseSelectorProps> = ({ totalVerse = 2, selected=1, onChange }) => {
    // Use local state if onChange is not provided, otherwise rely on props
    const [internalSelected, setInternalSelected] = useState(selected);

    // Sync internal state if the prop changes (e.g., parent updates selection)
    useEffect(() => {
        if (selected !== undefined && !onChange) {
            setInternalSelected(selected);
        }
    }, [selected, onChange]);


    const handleClick = (verse: number) => {
        if (onChange) {
            onChange(verse);
        }
        setInternalSelected(verse);
    };

    if (totalVerse === 1) return; 
    return (
        <div style={{ position: "absolute", top: 48, right: 48 }}>
            <ul className='selector scroll-container'>
                {Array.from({ length: totalVerse }, (_, index) => (
                    <li 
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        className={internalSelected === index + 1 ? 'selected' : ''} >{index+1}</li>
                ))}
            </ul>
        </div>
    )
}
