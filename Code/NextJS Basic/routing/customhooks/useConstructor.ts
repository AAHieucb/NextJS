// # Basic / Tạo constructor giống class component
// ## ReactJS / # Custom hook

import { useRef, useEffect } from "react";

type ConstructorCallback = () => void;

// Muốn tạo 1 hook giống kiểu useEffect thì bắt chước nó thôi
function useConstructor(callback: ConstructorCallback): void {
    const isRun = useRef(false);
    if(isRun.current == false){
        callback();
        isRun.current = true;
    }
}

export default useConstructor;