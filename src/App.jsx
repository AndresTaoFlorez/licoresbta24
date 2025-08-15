import './App.css'
import Header from './components/Header/index.jsx'
import ContentBody from './components/ContentBody/index.jsx'
import Footer from './components/Footer/index.jsx'
import SwipeToEnter from './pages/SwipeToEnter/index.jsx'

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <SwipeToEnter>
        <div className="flex flex-col flex-3 bg-gradient-to-b from-[#000000] via-[#294a30] via-[20%] to-[#000000b5]">
          <Header />
          <ContentBody />
        </div>
        <Footer />
      </SwipeToEnter>

    </div>
  )
}

export default App
