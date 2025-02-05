import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getData } from "./utils";

const Test2 = () => {
    const {data: data, isLoading} = useQuery("test1", getData);
    return(
        <>
            {isLoading && <div>Loading...</div>}
            {data && <div>{data[1].id}</div>}
            <Link to={"/"}>
                <button>Navigate</button>
            </Link>
        </>
    )
}
export default Test2;