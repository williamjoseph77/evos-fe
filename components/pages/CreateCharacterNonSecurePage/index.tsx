import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, Fragment, useCallback, useState } from "react";
import {
  defaultFieldInputError,
  defaultFieldValue,
  FieldName,
  formFields,
} from "./schema";
import styles from "./style.module.css";
import { iFieldInput, iFieldInputError, iFormFields } from "./types";

const CreatePage: NextPage = () => {
  const [fieldValues, setFieldValues] =
    useState<iFieldInput>(defaultFieldValue);
  const [error, setError] = useState<iFieldInputError>(defaultFieldInputError);

  const validateInputs = useCallback(
    (currError: iFieldInputError, key: string, value: string | number) => {
      if (!value) {
        return { ...currError, [key]: "Field ini tidak boleh kosong" };
      }

      switch (key) {
        case FieldName.RoleID:
          if (value < 1 || value > 2) {
            return { ...currError, [key]: "Value harus 1 atau 2" };
          }
          break;
        case FieldName.Power:
          if (!(value > 0 && value < 100)) {
            return { ...currError, [key]: "Value harus diantara 0 dan 100" };
          }
          break;
        case FieldName.Wealth:
          if (value < 0) {
            return { ...currError, [key]: "Value minimal 0" };
          }
          break;
      }

      return { ...currError, [key]: "" };
    },
    []
  );

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

  const handleSubmit = useCallback(async () => {
    const payload = { ...fieldValues };
    let isError = false;

    let currError = error;

    Object.entries(payload).forEach(([key, value]) => {
      currError = validateInputs(currError, key, value);
    });

    setError(currError);

    Object.entries(currError).forEach(([key, value]) => {
      if (value) {
        isError = true;
        return;
      }
    });

    if (isError) {
      console.log("error submit: ", currError);
      return;
    }

    let request = new Request(
      "http://localhost:8080/api/characters/non-secure",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
        }),
      }
    );

    await fetch(request).then((response) => console.log("Success: ", response));
  }, [error, fieldValues, validateInputs]);

  const handleOnReset = useCallback(() => {
    setFieldValues(defaultFieldValue);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Game</title>
        <meta name="description" content="Game test for EVOS" />
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
                  <td>
                    {error[e.fieldName as keyof iFieldInputError] && (
                      <div className={styles.errorContainer}>
                        {error[e.fieldName as keyof iFieldInputError]}
                      </div>
                    )}
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
    </div>
  );
};

export default CreatePage;
