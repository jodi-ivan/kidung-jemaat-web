import React, { useState, useEffect } from 'react'
import Song from '../entity/entity'
import { ArrowLeft, SquareArrowRightEnter, ChevronLeft, ChevronRight } from 'lucide-react';

// export Navigator 

interface NavigatorProps {
    onChange?: (changed: Song) => void;
}


export const Navigator: React.FC<NavigatorProps> = ({ onChange }) => {
    const [hymnNumber, setHymnNumber] = useState<string>('1');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHymnNumber(e.target.value);
    };

    const handleDigitClick = (digit: string) => {
        setHymnNumber((prev) => prev + digit);
    };

    const handleBackspace = () => {
        setHymnNumber((prev) => prev.slice(0, -1));
    };

    const handleEnter = () => {
        // Assuming song object has a property to update the hymn number
        if (onChange) {
            let no: number = parseInt(hymnNumber)
            onChange(new Song(no));

        }
    };

    const handleInputChangeFromButton = (value: number) => {
        setHymnNumber((prev) => {
            const currentNumber = parseInt(prev);
            return (currentNumber + value).toString();
        });
    };

    useEffect(() => {
        if (onChange) {
            let no: number = parseInt(hymnNumber)
            onChange(new Song(no));

        }
    })

    return (
        <div className="navigator">
            <div style={{ display: "flex", marginTop: "16px", marginBottom: "16px", gap:"8px", minHeight:"32px" }} >
                <button onClick={() => handleInputChangeFromButton(-1)} style={{ background: "tranparent", flexShrink: 0, marginLeft: "8px" }}>
                    <ChevronLeft size={12} />
                </button>
                <input
                    type="number"
                    name="hymn"
                    id=""
                    style={{ flex: 1, minWidth: 0 }}
                    value={hymnNumber}
                    onChange={handleInputChange}
                />
                <button onClick={() => handleInputChangeFromButton(1)} style={{ background: "tranparent", flexShrink: 0, marginRight: "8px" }}>
                    <ChevronRight size={12} />
                </button>
            </div >
            <div className='dialpad'>
                <div className='botton' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                    <button onClick={() => handleDigitClick('1')} style={{ flex: 1, minHeight: '40px' }}>1</button>
                    <button onClick={() => handleDigitClick('2')} style={{ flex: 1, minHeight: '40px' }}>2</button>
                    <button onClick={() => handleDigitClick('3')} style={{ flex: 1, minHeight: '40px' }}>3</button>
                    <button onClick={() => handleDigitClick('4')} style={{ flex: 1, minHeight: '40px' }}>4</button>
                    <button onClick={() => handleDigitClick('5')} style={{ flex: 1, minHeight: '40px' }}>5</button>
                    <button onClick={() => handleDigitClick('6')} style={{ flex: 1, minHeight: '40px' }}>6</button>
                    <button onClick={() => handleDigitClick('7')} style={{ flex: 1, minHeight: '40px' }}>7</button>
                    <button onClick={() => handleDigitClick('8')} style={{ flex: 1, minHeight: '40px' }}>8</button>
                    <button onClick={() => handleDigitClick('9')} style={{ flex: 1, minHeight: '40px' }}>9</button>
                    <button onClick={handleBackspace} style={{ flex: 1, minHeight: '40px' }}>
                        <ArrowLeft size={18} />
                    </button>
                    <button onClick={() => handleDigitClick('0')} style={{ flex: 1, minHeight: '40px' }}>0</button>
                    <button onClick={handleEnter} style={{ flex: 1, minHeight: '40px' }}>
                        <SquareArrowRightEnter size={18} />
                    </button>
                </div >

            </div>
        </div>
    )
}
