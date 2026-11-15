import { useState } from 'react'
import { Search, Music, ArrowLeft, SquareArrowRightEnter, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css'

function App() {

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
            <div className="navigator">
              <div style={{ display: "flex", marginTop:"16px", marginBottom:"16px" }} > 
                <ChevronLeft style={{ width: "10%", flexShrink: 0, marginLeft:"8px" }}/>
                <input type="number" name="hymn" id="" style={{ flex: 1, minWidth:0 }} />
                <ChevronRight style={{ width: "10%", flexShrink: 0, marginRight:"8px" }}/>
              </div>
              <div className='dialpad'> 
                <div className='botton' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                  <button style={{ flex: 1, minHeight: '40px' }}>1</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>2</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>3</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>4</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>5</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>6</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>7</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>8</button>
                  <button style={{ flex: 1, minHeight: '40px' }}>9</button>
                  <button style={{ flex: 1, minHeight: '40px' }}><ArrowLeft size={18} /></button>
                  <button style={{ flex: 1, minHeight: '40px' }}>0</button>
                  <button style={{ flex: 1, minHeight: '40px' }}><SquareArrowRightEnter size={18} /></button>
                </div>

              </div>
            </div>
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
              <object id="svg-display" type="image/svg+xml" data="http://localhost:8888/kidung-jemaat/render/1"></object>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
