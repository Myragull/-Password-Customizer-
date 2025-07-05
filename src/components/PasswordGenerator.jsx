import { useState, useCallback, useEffect, useRef } from 'react';

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false); // ✅ Added feedback state

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) {
      str += '0123456789';
    }
    if (charAllowed) {
      str += '!@#$%^&*()_+-=`~[]{}';
    }

    for (let i = 1; i <= length; i++) {
      // ✅ Fixed random index bug: removed +1
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopied(true); // ✅ Show feedback
    setTimeout(() => setCopied(false), 1500); // ✅ Hide after 1.5s
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]); // ✅ Simplified dependencies

  return (
    <>
      {/* Main container */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        {/* Input and Copy */}
        <div className="flex shadow rounded-lg overflow-hidden mb-8 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-gray-700 placeholder-gray-400 text-base rounded-md"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
          {copied && (
            <span className="ml-2 text-green-400 px-2 py-1">Copied!</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex text-sm gap-x-2">
          {/* Length */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50} // ✅ Adjusted max length
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))} // ✅ Convert to number
            />
            <label>Length: {length}</label>
          </div>

          {/* Numbers */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed} // ✅ Switched to controlled
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* Characters */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed} // ✅ Switched to controlled
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
