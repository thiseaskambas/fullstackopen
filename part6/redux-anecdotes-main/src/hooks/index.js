import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const hook = {
    type,
    value,
    onChange,
  };

  Object.defineProperty(hook, "reset", {
    value: () => setValue(""),
    enumerable: false,
  });

  return hook;
};

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
};
