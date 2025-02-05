import React from "react";
import { useQuery } from "react-query";

const Test5 = () => {
    const { data, isLoading } = useQuery("tete", async () => { 
        console.log("Run fucking here");
        await new Promise(resolve => setTimeout(resolve, 2000));
        const a = await fetch(`http://localhost:4000/news`);
        return await a.json();
    }, {
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    console.log(data);

    return(
        <>
            {isLoading && <div>Loading...</div>}
            {data && <div>{data[0].id}</div>}
        </>
    )
}
export default Test5;