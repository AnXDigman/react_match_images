import { useState, useEffect } from 'react'
import trophy from './assets/trophy.svg';
import error from './assets/error.svg';
import vectors from './vectors'
import successSound from './assets/tada.wav'
import errorSound from './assets/error.wav'

const App = () => {

  let url = ``
  let randomIndexBoxOne
  let randomIndexBoxTwo
  const [imageOne, setImageOne] = useState(url)
  const [imageTwo, setImageTwo] = useState(url)
  const [showCongrats, setShowCongrats] = useState(false)
  const [showRed, setShowRed] = useState(false)

  
  function getImage(){
    randomIndexBoxOne = Math.floor(Math.random() * vectors.length)
    randomIndexBoxTwo = Math.floor(Math.random() * vectors.length)
    setImageOne(vectors[randomIndexBoxOne])
    setImageTwo(vectors[randomIndexBoxTwo])
    // Display the congratulatory message
    if (randomIndexBoxOne === randomIndexBoxTwo) {
      setShowCongrats(true)
      setShowRed(false)
      new Audio(successSound).play()
    }else{
      setShowCongrats(false)
      setShowRed(true)
      new Audio(errorSound).play()
    }
  }
  let imageNameOne = imageOne.slice(12, -4)
  let imageNameTwo = imageTwo.slice(12, -4)

  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState()
  const [tries, setTries] = useState(0)

  useEffect(() => {
    const savedPlayerOne = localStorage.getItem('playerOne')
    const savedPlayerTwo = localStorage.getItem('playerTwo')
    setPlayerOne(savedPlayerOne || '')
    setPlayerTwo(savedPlayerTwo || '')
    setCurrentPlayer(savedPlayerOne ? 1 : savedPlayerTwo ? 2 : null)
  }, [])

  function handlePlayerChange(event){
    const { name, value} = event.target
    name === 'playerOne' ? setPlayerOne(value) : setPlayerTwo(value)
  }

  function switchPlayer(){
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    setTries(0)
  }

  function handleSubmit(event){
    event.preventDefault()
    if (!playerOne || !playerTwo){
      alert('Please enter names for both players.')
      return
    }
    setTries(tries + 1)
    if (tries >= 2){
      switchPlayer()
    }
  }

  useEffect(() => {
    localStorage.setItem('playerOne', playerOne)
    localStorage.setItem('playerTwo', playerTwo)
  }, [playerOne, playerTwo])

  return (
    <div>
      {/* Title Section */}
      <div className="h-24 w-full flex justify-center items-center shadow-md heading-one">
        <h1 className="font-bold text-6xl text-slate-100">Image Matcher</h1>
      </div>

      {/* Player Switcher */}
      <div className="absolute">
        <h2>Player Switcher</h2>
        <form onSubmit={handleSubmit} className="text-black">
          <label>
            Player One: <input type="text" name="playerOne" value={playerOne} onChange={handlePlayerChange}/>
          </label>
          <br />
          <label>
            Player Two: <input type="text" name="playerTwo" value={playerTwo} onChange={handlePlayerChange}/>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <h3>Current Player: {currentPlayer === 1 ? playerOne : currentPlayer === 2 ? playerTwo : 'N/A'}</h3>
        {tries < 2 && <p>Tries left: {2 - tries}</p>}
      </div>

      {/* Congratulatory Text Section */}
      <div className="h-24 w-full mt-5">
      {showCongrats && <div className="h-20 w-[35rem] bg-teal-500 p-4 m-auto rounded-lg flex justify-around items-center congrats">
        <div className="h-16 w-16 bg-gray-500 rounded-full flex justify-center items-center">
          <figure>
            <img className="w-12" src={trophy} alt="" />
          </figure>
        </div>
        <p className="text-lg text-slate-100 font-bold">
          Congratulations! <span className="capitalize">{imageNameOne}</span> and <span className="capitalize">{imageNameTwo}</span> Match!
        </p>
      </div>
      }
      {showRed && <div className="h-20 w-[35rem] bg-red-600 p-4 m-auto rounded-lg flex justify-around items-center congrats">
        <div className="h-16 w-16 bg-gray-500 rounded-full flex justify-center items-center">
          <figure>
            <img className="w-12" src={error} alt="" />
          </figure>
        </div>
        <p className="text-lg text-slate-100 font-bold">
          Error! <span className="capitalize">{imageNameOne}</span> and <span className="capitalize">{imageNameTwo}</span> do not Match!
        </p>
      </div>
      }
      </div>
      {/* Matching Section */}
      <div className="h-[25rem] w-[65rem] mt-5 m-auto flex justify-between items-center gap-4">
        <div className="box">
          <figure>
            <img src={imageOne} alt="" />
          </figure>
        </div>
        <button className="h-16 w-32 rounded-md bg-purple-500 font-bold text-lg active:scale-95" onClick={getImage}>Match</button>
        <div className="box">
          <figure>
            <img src={imageTwo} alt="" />
          </figure>
        </div>
      </div>
    </div>
  )
}

export default App

