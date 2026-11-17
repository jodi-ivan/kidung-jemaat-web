import React, { type ReactElement } from 'react'
import Song from '../entity/entity'
import * as Dialog from "@radix-ui/react-popover";
import SearchResult, { type Span } from '../entity/search_result';


export interface DialogProps {
    onSelected?: (song: Song) => void
    isOpen?: boolean
    data?: SearchResult
    onOpenChange: (open: boolean) => void
}

function highlight(snippet: string, spans: Span[]): ReactElement {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;

    for (const span of spans) {
        if (span.start > currentIndex) {
            parts.push(snippet.slice(currentIndex, span.start));
        }
        parts.push(
            <span key={span.start} className="highlight">
                {snippet.slice(span.start, span.end)}
            </span>
        );
        currentIndex = span.end;
    }

    if (currentIndex < snippet.length) {
        parts.push(snippet.slice(currentIndex));
    }

    return <>{parts}</>;
}

export const SearchDialog: React.FC<DialogProps> = ({ onSelected, isOpen = false, onOpenChange, data }) => {
    console.log(data);
    if (!(data && data.data)) {
        return null
    }
    return (
        <>
            <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
                <Dialog.Anchor style={{ display: 'block', width: '100%', opacity: 0 }} />
                <Dialog.Portal>
                    <Dialog.Content
                        onOpenAutoFocus={(event) => {
                            event.preventDefault(); // Keeps focus where it currently is
                        }}
                        align='start'
                    >
                        <div className='dialog'>
                            <div className='dialog title'></div>
                            <div className='dialog Body'>
                                <div className='top-section'>
                                    <div className='section-title'>Judul</div>
                                    {
                                        (data.data && data?.data.autocomplete.length == 0) && (
                                            <ul>
                                                <li className="see-more">Tidak ada yang sesuai</li>
                                            </ul>
                                        )
                                    }
                                    <ul>
                                        {
                                            (data.data && data?.data.autocomplete.map((i, v) => {
                                                return (
                                                    <li key={`autocomplete-${v}`}>
                                                        <span className='hymn-no'>{`${i.hymnno}${i.variant ? i.variant : ''}.`}</span>
                                                        <span className='hymn-title'>{highlight(i.title.snippet, i.title.spans)}</span>
                                                    </li>

                                                )
                                            }))
                                        }
                                    </ul>
                                </div>
                                <div className='bottom-section'>
                                    <div className='section-title'>Hasil pencarian</div>
                                    {
                                        (data.data && data?.data.search.length == 0) && (
                                            <ul>
                                                <li className="see-more">Tidak ada yang sesuai</li>
                                            </ul>
                                        )}
                                    <ul>
                                        {
                                            data && data.data.search.map((i, v) => {
                                                return (
                                                    <li key={`search-${v}`}>
                                                        <span className='hymn-no'>{`${i.hymnno}${i.variant ? i.variant : ''}.`}</span>
                                                        <span className='hymn-title'>{highlight(i.title.snippet, i.title.spans)}</span>
                                                        <ul>
                                                            {
                                                                Object.entries(i.verse).splice(0, 3).map(([key, element]) => {
                                                                    return (
                                                                        <li key={`search-verse-${key}`}>
                                                                            <span className='hymn-no'>{`${key}.`}</span>
                                                                            <span className='hymn-title snippet'>{highlight(element.snippet, element.spans)}</span>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                Object.entries(i.verse).length > 3 && (
                                                                    <li className='see-more'>{`${Object.entries(i.verse).length - 3}`}+ Lainnya</li>
                                                                )
                                                            }
                                                        </ul>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </>

    )
}