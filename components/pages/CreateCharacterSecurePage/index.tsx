import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import {
  createCharacterSecureURL,
  getRoleListURL,
} from "../../../services/api/url";
import {
  defaultFieldInputError,
  defaultFieldValue,
  FieldName,
  formFields,
} from "./schema";
import styles from "./style.module.css";
import {
  iCreateCharacterSecureResponse,
  iFieldInput,
  iFieldInputError,
  iFormFields,
  iGetRoleListResponse,
} from "./types";

const CreateCharacterSecurePage: NextPage = () => {
  const [fieldValues, setFieldValues] =
    useState<iFieldInput>(defaultFieldValue);
  const [error, setError] = useState<iFieldInputError>(defaultFieldInputError);
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState<iGetRoleListResponse[] | undefined>(
    undefined
  );
  const [createResponse, setCreateResponse] =
    useState<iCreateCharacterSecureResponse>({});

  const fetchRoles = useCallback(async () => {
    const getRolesRequest = new Request(getRoleListURL, {
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
        setRoles(data as iGetRoleListResponse[]);
      })
      .catch((e) => console.log(e));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const validateInputs = useCallback(
    (currError: iFieldInputError, key: string, value: string | number) => {
      if (!value) {
        return { ...currError, [key]: "Field ini tidak boleh kosong" };
      }

      switch (key) {
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
        case FieldName.RoleGUID:
          currFieldValue = {
            [key]: e.target.value || defaultFieldValue.roleGUID,
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

    let request = new Request(createCharacterSecureURL, {
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
      });
  }, [error, fieldValues, handleOnReset, validateInputs]);

  if (isLoading) return <div>Loading...</div>;

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
            let element;

            if (e.fieldName === FieldName.RoleGUID) {
              element = (
                <>
                  <td>
                    <label htmlFor={e.fieldName}>{e.label}</label>
                  </td>
                  <td>
                    {roles?.map((role, index) => {
                      return (
                        <Fragment key={`radio-${index}`}>
                          <input
                            type="radio"
                            id={role.guid}
                            name={e.fieldName}
                            value={role.guid}
                            checked={fieldValues.roleGUID === role.guid}
                            onChange={handleOnChange}
                            style={{ width: "unset" }}
                          />
                          <label htmlFor={role.guid}>{role.name}</label>
                        </Fragment>
                      );
                    })}
                  </td>
                </>
              );
            } else {
              element = (
                <>
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
                </>
              );
            }

            return (
              <Fragment key={`Fragment-${index}`}>
                <tr key={`Field-${index}`}>
                  {element}
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

export default CreateCharacterSecurePage;
