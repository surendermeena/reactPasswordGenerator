import { useState, useCallback, useEffect, useRef } from 'react'


function App() {


  const [length, setLength] = useState(4)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789"
    };
    if (charAllowed) {
      str += "}{][~!@#$`%^&*()_-+=><?/"
    };

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  //  useRef()



  return (
    <div>

      < div className = "w-full max-w-md mx-auto px-4  m-8 text-center  text-orange-500 bg-gray-800 text-2xl" > Password Generator

        < div className = 'flex shadow rounded-lg overflow-hidden mb-4' >
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly />

          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>

        </div >

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <label >Length {length}</label>
        <input type="range"
          min={4}
          max={30}
          value={length}
          className='cursor-pointer'
          onChange={(e) => { setLength(e.target.value) }}
          ref={passwordRef}
        />
      </div>
      <div className='flex items-center gap-x-3'>
        <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
        />

        <label htmlFor="numberInput">Number</label>

        <input type="checkbox" defaultChecked={charAllowed} id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
        />
        <label htmlFor="charInput">Character</label>
      </div>

    </div>


      </div >
    </div >
  )
}

export default App
