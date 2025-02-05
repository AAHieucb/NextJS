import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getData, getData1 } from "./utils";

const Test4 = () => {
    const { data, isLoading } = getData1({id: 2}); 
    return(
        <>
            {isLoading && <div>Loading...</div>}
            {data && <div>{data[0].id}</div>}
            <Link to={"/2"}> 
                <button>Navigate</button>
            </Link>
        </>
    )
}
export default Test4;