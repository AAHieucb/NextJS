"use client";
import { useGetQuotesQuery } from "@/lib/features/quotes/quotesApiSlice";
import { useState } from "react";
import styles from "./Quotes.module.css";
import { selectCount } from "@/lib/features/counter/counterSlice";
import { useAppSelector } from "@/lib/hooks";

const options = [5, 10, 20, 30];

export const Quotes = () => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10);
  const count = useAppSelector(selectCount);
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetQuotesQuery(numberOfQuotes, {
      pollingInterval: 200000, // auto refetch sau 200s, thay thế react-query được
    });

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h3>Select the Quantity of Quotes to Fetch:: {count}</h3>
        <select
          className={styles.select}
          value={numberOfQuotes}
          onChange={(e) => {
            setNumberOfQuotes(Number(e.target.value));
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data.quotes.map(({ author, quote, id }) => (
          <blockquote key={id}>
            &ldquo;{quote}&rdquo;
            <footer>
              <cite>{author}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  return null;
};
