import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { getCharacterListURL } from "../../../services/api/url";
import styles from "./style.module.css";
import { iGetCharacterListResponse } from "./types";

const GetCharacterListPage: NextPage = () => {
  const [characters, setCharacters] = useState<
    iGetCharacterListResponse[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacters = useCallback(async () => {
    const getRolesRequest = new Request(getCharacterListURL, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    });

    await fetch(getRolesRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCharacters(data as iGetCharacterListResponse[]);
      })
      .catch((e) => console.log(e));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Character List</title>
        <meta name="description" content="Character List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table className={styles.characterListTableContainer}>
        <tbody>
          <tr>
            <td colSpan={4} className={styles.formTitleContainer}>
              Character List
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Role</td>
            <td>Power</td>
            <td>Wealth</td>
          </tr>
          {characters?.map((character) => {
            // if there's detail page, then use character guid as url query, and use Link component
            return (
              <tr key={character.guid}>
                <td>{character.name}</td>
                <td>{character.role.name}</td>
                <td>{character.power}</td>
                <td>{character.wealth}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GetCharacterListPage;
