import { useEffect, useState } from "react";

export default function useStateHelper(key, defVal) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defVal;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value])

  return [value, setValue]
}