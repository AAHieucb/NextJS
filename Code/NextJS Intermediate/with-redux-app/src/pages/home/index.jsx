import React from "react";
import { useSelector } from "react-redux";
import { selectCount } from '../../features/counter/counterSlice';
import Link from "next/link"

const User = () => {
    const count = useSelector(selectCount);
    return (
        <>
            <div>Hello {count}</div>
            <Link href={"/"}>TEST</Link>
        </>
    )
}

export default User;