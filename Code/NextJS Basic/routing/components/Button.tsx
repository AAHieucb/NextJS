import React, { useState, useCallback, useRef } from "react";

const Button = () => {\
    const [counter, setCounter] = useState(0);
    console.log("Client vào trang thì server cũng chạy");
    console.log(counter);

    const handleClick = useCallback(() => {
        console.log(counter);
        setCounter(counter + 1);
    }, []);

    // useRef / Nó ref được tới cấu hình DOM thg dùng để thay thế PP dùng JS thuần dù dùng cách nào cũng được. Khi dùng JS thuần phải check or đảm bảo thẻ refer tới tồn tại 
    const ref = useRef(null);

    return(
        <div>
            <div>{counter}</div>
            <button onClick={() => handleClick()}>
                Increase
            </button>
            <input ref={ref} type="file" style={{display: "none"}}/>
            <button onClick={() => {
                ref.current.click();
            }}>Open file1</button>
            <button onClick={() => {
                // document.querySelector("input[type='file'").click(); // JS
                const input = document.querySelector("input[type='file']") as HTMLInputElement;
                input.click(); // TS phải nói rõ type vì nó sợ query thẻ DOM khác sẽ k có hàm click
            }}>Open file2</button>
        </div>
    )
}

export default Button;