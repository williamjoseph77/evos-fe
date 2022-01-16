import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, Fragment, useCallback, useState } from "react";
import { createCharacterNonSecureURL } from "../../../services/api/url";
import { defaultFieldValue, FieldName, formFields } from "./schema";
import styles from "./style.module.css";
import {
  iCreateCharacterNonSecureResponse,
  iFieldInput,
  iFormFields,
} from "./types";

const CreateCharacterNoValidation: NextPage = () => {
  const [fieldValues, setFieldValues] =
    useState<iFieldInput>(defaultFieldValue);
  const [createResponse, setCreateResponse] =
    useState<iCreateCharacterNonSecureResponse>({});

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const key = e?.target?.name;

      if (!key) return;

      let currFieldValue;

      switch (e.target.name) {
        case FieldName.Name:
          currFieldValue = {
            [key]: e.target.value || defaultFieldValue.name,
          };
          break;
        case FieldName.RoleID:
          currFieldValue = {
            [key]: parseInt(e.target.value) || defaultFieldValue.roleID,
          };
          break;
        case FieldName.Power:
          currFieldValue = {
            [key]: parseInt(e.target.value) || defaultFieldValue.power,
          };
          break;
        case FieldName.Wealth:
          currFieldValue = {
            [key]: parseFloat(e.target.value) || defaultFieldValue.wealth,
          };
          break;
      }

      setFieldValues({ ...fieldValues, ...currFieldValue });
    },
    [fieldValues]
  );

  const handleOnReset = useCallback(() => {
    setFieldValues(defaultFieldValue);
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = { ...fieldValues };

    let request = new Request(createCharacterNonSecureURL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    });

    await fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setCreateResponse(data);
        handleOnReset();
      })
      .catch((e) => console.log(e));
  }, [fieldValues, handleOnReset]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Character Non Secure</title>
        <meta name="description" content="Create Character Non Secure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table>
        <tbody>
          <tr>
            <td colSpan={2} className={styles.formTitleContainer}>
              Create New Game Character
            </td>
          </tr>
          {formFields.map((e: iFormFields, index: number) => {
            return (
              <Fragment key={`Fragment-${index}`}>
                <tr key={`Field-${index}`}>
                  <td>
                    <label htmlFor={e.fieldName}>{e.label}</label>
                  </td>
                  <td>
                    <input
                      type={e.fieldType}
                      id={e.fieldId}
                      name={e.fieldName}
                      value={fieldValues[e.fieldName as keyof iFieldInput]}
                      onChange={handleOnChange}
                      step={e.step}
                      min={e.min}
                      max={e.max}
                    />
                  </td>
                </tr>
              </Fragment>
            );
          })}
          <tr>
            <td colSpan={2}>
              <div className={styles.actionButtonContainer}>
                <button onClick={handleOnReset}>Reset</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {createResponse.guid && (
        <div className={styles.successResponseContainer}>
          Berhasil membuat character dengan guid {createResponse.guid}
        </div>
      )}
      {createResponse.error && (
        <div className={styles.failedResponseContainer}>
          Error membuat karakter, {createResponse.error}, silakan coba lagi
        </div>
      )}
    </div>
  );
};

export default CreateCharacterNoValidation;
