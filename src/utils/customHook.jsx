import { useState } from "react";

// Custom hook.
const useInput = () => {
  const [value, setValue] = useState("");
  const onChange          = (e) => setValue(e.target.value);
  
  return { value, onChange };
}

export default useInput;
