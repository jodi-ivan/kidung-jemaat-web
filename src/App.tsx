import { useState } from 'react'
import { Search, ArrowLeft, SquareArrowRightEnter, ChevronLeft, ChevronRight } from 'lucide-react';
import { SvgViewer } from './SvgViewerMetadata'
import './App.css'
import {Navigator} from './component/navigator'
import Song from './entity/entity'

function App() {
  const [currentSong, setCurrentSong] = useState<Song>(new Song(1));

  return (
    <>
      <div style={{ display: "block", width: "100%" }}>
        <div style={{ display: "flex", gap: "16px", padding: "10px"}}>
          <div style={{ width: "20%", padding:"2px", flexShrink: 0, borderRight: "1px solid #D6DAD6" }}>
            <div className="search" style={{ display: "flex", alignItems: "center" }}>
              <input className='global-search' name='q' type="input" placeholder='search' />
              <button style={{ backgroundColor: "transparent", height:"100%" }} >
                <Search className='search-btn' size="1em" />
              </button>
            </div>
            <Navigator onChange={setCurrentSong}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{display:"block", textAlign:"left"}}>
              <span>Layer 1</span>
              <span>
                <ChevronRight size={14} />
              </span>
              <span>Layer 2</span>
                <ChevronRight size={14} />

              <span>Title</span>
            </div>
            <div className='controls'></div>
            <div style={{marginTop:"32px"}}> 
              <SvgViewer url={`http://localhost:8888/kidung-jemaat/render/${currentSong.hymnNo}`} key={`key-${currentSong.hymnNo}`} onMetadataLoaded={console.log} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
