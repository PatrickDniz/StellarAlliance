import { FaJediOrder } from "react-icons/fa6";
import styles from "./style.module.css";
import Link from "next/link";

export default function Logo({children}) {
  return (
    <Link href={"/"} className={styles.logo}>
      <FaJediOrder fontSize={48} />

      {children}
    </Link>
  );
}
