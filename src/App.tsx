import { useState, useCallback, type Dispatch, type SetStateAction } from 'react';
import Song from './entity/entity'
import Metadata from './entity/metadata';

import { Breadcrumb } from './component/breadcrumb';
import { Navigator } from './component/navigator'
import { Search } from './component/search'
import { VerseSelector } from './component/verse_selector'
import { SvgViewer } from './SvgViewerMetadata'

import './App.css'


export function useDebugState<T>(
  initialValue: T | (() => T),
  label: string = 'State'
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);

  const debugSetState: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      console.groupCollapsed(`[${label}] State Updated`);
      console.log('Incoming value/updater:', value);
      console.trace('Triggered by:');
      console.groupEnd();
      setState(value);
    },
    [label]
  );

  return [state, debugSetState];
}
function App() {
  const [currentSong, setCurrentSong] = useDebugState<Song>(new Song(1, '', 1));
  const [totalVerse, setTotalVerse] = useState<number>(2);
  const [metadata, setMetadata] = useState<Metadata>(new Metadata(1, []));

 


  const updateTotalVerse = (newTotalVerse: number) => {
    setTotalVerse(newTotalVerse);
  }

  const updateSelectedVerse = (verse: number) => {
    const { hymnNo, variant, focus } = currentSong;
    const newState = new Song(hymnNo, variant, verse, focus);
    console.log(newState);
    setCurrentSong(newState);
  }
  return (
    <>
      <div style={{ display: "block", width: "100%", background:"#FAFAF7" }}>
        <div style={{ display: "flex", gap: "16px", padding: "10px" }}>
          <div className='sidebar' style={{ width: "20%", padding: "2px 8px 2px 8px", flexShrink: 0, borderRight: "1px solid #D6DAD6", color: "#273331" }}>
            <Search onSelected={setCurrentSong}/>
            <Navigator onChange={setCurrentSong} all_variant={metadata.all_variants} selected={metadata.selected_variant} song={currentSong} />
          </div>
          <div style={{ flex: 1 }}>
            <Breadcrumb metadata={metadata} />
            <div className='controls'></div>
            <div style={{ marginTop: "32px", position: "relative" }}>
              <VerseSelector totalVerse={totalVerse} key={`verse-${currentSong.hymnNo}`} onChange={(a) => updateSelectedVerse(a)} selected={currentSong.verse}/>
              <SvgViewer
                url={`http://localhost:8888/kidung-jemaat/render/${currentSong.getURL()}`}
                key={`key-${currentSong.hymnNo}`}
                onMetadataLoaded={(metadata) => {
                  updateTotalVerse(Number(metadata.total_verse));
                  setMetadata(metadata);
                }} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
