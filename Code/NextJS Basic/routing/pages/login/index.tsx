import useConstructor from "../../customhooks/useConstructor";
import "./Login.module.css";

// # Basic / Tạo constructor giống class component chỉ chạy 1 lần
let isRun = false;

export default function Login() {
    if(isRun == false){ 
        console.log("Đây là nd trong constructor 1");
        isRun = true;
    }

    useConstructor(() => {
        console.log("Constructor cách 2");
    })
    
    return(
        <h1 className="h1">Login Page</h1>
    )
}