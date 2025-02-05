import React, { useState } from "react";
import { useQuery } from "react-query";
import { getData } from "./utils";
import { Link } from "react-router-dom";

const Test1 = () => {
    const {data: data, isLoading, isFetching, refetch, isLoadingError} = useQuery("test1", getData, 
    {
        // staleTime: 1000, 
        refetchInterval: 1000,
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
        refetchIntervalInBackground: false,
    }
    );

    console.log(isFetching);
    console.log(isLoadingError);
    console.log(data);
    console.log(isLoading);
    
    const [counter, setCounter] = useState(0);
    return(
        <>
            <button onClick={() => setCounter(counter + 1)}>{counter}</button>
            {isLoading && <div>Loading...</div>}
            {data && <div>{data[0].id}</div>}
            <Link to={"1"}>
                <button>Navigate</button>
            </Link>
            <button onClick={() => refetch()}>Refetch</button>
        </>
    )
}
export default Test1;