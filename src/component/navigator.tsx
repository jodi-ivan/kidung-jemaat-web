import React, { useState, useEffect, useRef } from 'react'
import Song from '../entity/entity'
import { ArrowLeft, SquareArrowRightEnter, ChevronsLeft, ChevronsRight } from 'lucide-react';

// export Navigator 

interface NavigatorProps {
    onChange?: (changed: Song) => void;
    all_variant?: string[];
    selected?: string;
    song?: Song;
}


export const Navigator: React.FC<NavigatorProps> = ({ onChange, all_variant, selected, song}) => {
    let defaultHymn: string = (song) ? String(song.hymnNo) : '1'; 
    const [hymnNumber, setHymnNumber] = useState<string>(defaultHymn); 
    const [localSelected, setLocalSelected] = useState(selected);
    // Sync internal state if the prop changes (e.g., parent updates selection)
    useEffect(() => {
        if (selected) {
            setLocalSelected(selected);
        }
    }, [selected]);


    useEffect(() => {
        if (song) {
            setHymnNumber(String(song.hymnNo));
        }
    }, [song])
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

    const hasConsumedInitialSong = useRef(false);
    useEffect(() => {
        if (!hymnNumber) {
            setHymnNumber("1")
            return
        }
        if (onChange) {
            let no: number = parseInt(hymnNumber)
            if (song && !hasConsumedInitialSong.current) { 
                 hasConsumedInitialSong.current = true; 
            } else {
                onChange(new Song(no)); // reset the variant and verse
            }
        }
    }, [hymnNumber, onChange])

    return (
        <div className="navigator">
            <div style={{ display: "flex", marginTop: "16px", marginBottom: "16px", gap: "8px", minHeight: "32px" }} >
                <button onClick={() => handleInputChangeFromButton(-1)} style={{ background: "tranparent", flexShrink: 0, marginLeft: "8px" }}>
                    <ChevronsLeft size={18} />
                </button>
                <input
                    type="number"
                    name="hymn"
                    style={{ flex: 1, minWidth: 0 }}
                    value={hymnNumber}
                    onChange={handleInputChange} 
                />
                <button onClick={() => handleInputChangeFromButton(1)} style={{ background: "tranparent", flexShrink: 0, marginRight: "8px" }}>
                    <ChevronsRight size={18} />
                </button>
            </div >
            <div key={`variant-${hymnNumber}`}>
            {
                all_variant && (
                    <div style={{ justifyItems: "center", marginTop: "28px" }}>
                        <ul className='selector variant'>
                            {all_variant.map((variant) => (
                                <li
                                    key={variant}
                                    className={localSelected === variant ? 'selected' : ''}
                                    onClick={() => {
                                        setLocalSelected(variant);
                                        if (onChange) {
                                             let no: number = parseInt(hymnNumber)
                                            onChange(new Song(no, variant));
                                        }
                                    }}
                                >
                                    {variant}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            </div>

            <div className='dialpad'>
                <div className='botton' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <button key={index + 1} onClick={() => handleDigitClick(String(index + 1))} style={{ flex: 1, minHeight: '40px' }}>
                            {index + 1}
                        </button>
                    ))}
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
