import React, { useState } from "react";
import useLocalStorage from "@/components/useLocalStorage";

export default function LocalStorageTest() {
  const [value, setValue, clearValue] = useLocalStorage("demoKey", "initial");
  const [input, setInput] = useState("");

  return (
    <section>
      <h2>LocalStorage Test</h2>
      <div>Stored value: {String(value)}</div>
      <div>
        <input
          type="text"
          value={input}
          placeholder="Type a value"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => setValue(input)}>Set</button>
        <button onClick={() => setValue((prev) => `${prev}!`)}>Append</button>
        <button onClick={clearValue}>Clear</button>
      </div>
    </section>
  );
}
