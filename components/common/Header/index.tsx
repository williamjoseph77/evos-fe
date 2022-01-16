import Link from "next/link";
import { FC } from "react";
import styles from "./style.module.css";

const Header: FC = () => {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <a>
          <button>Character List</button>
        </a>
      </Link>
      <Link href={"/create/secure"}>
        <a>
          <button>Create Character Secure</button>
        </a>
      </Link>
      <Link href={"/create/non-secure"}>
        <a>
          <button>Create Character Non Secure</button>
        </a>
      </Link>
      <Link href={"/create/no-validation"}>
        <a>
          <button>Create Character No Validation</button>
        </a>
      </Link>
    </div>
  );
};

export default Header;
