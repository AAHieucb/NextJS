import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getData, getData1 } from "./utils";

const Test3 = () => {
    const { data, isLoading } = getData1({id: 1});

    return(
        <>
            {isLoading && <div>Loading...</div>}
            {data && <div>{data[0].id}</div>}
            <Link to={"/3"}>
                <button>Navigate</button>
            </Link>
            <Link to={"/4"}>
                <button>Navigate 4</button>
            </Link>
        </>
    )
}
export default Test3;