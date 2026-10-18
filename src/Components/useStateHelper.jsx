import { useEffect, useState } from "react";

export default function useStateHelper(key, defVal) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : defVal;
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value])

  return [value, setValue]
}