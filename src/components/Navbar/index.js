"use client";

import styles from "./style.module.css";
import Link from "next/link";
import { GiSpaceShuttle } from "react-icons/gi";
import { LuBadgePlus } from "react-icons/lu";
import { GiDuck } from "react-icons/gi";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={clsx(styles.navItem, {
          [styles.selected]: path === "/naves/cadastro",
        })}
        href={"/naves/cadastro"}
      >
        <LuBadgePlus fontSize={20} />
        <span>Cadastro de naves</span>
      </Link>
      <Link
        className={clsx(styles.navItem, {
          [styles.selected]: path === "/naves/lista",
        })}
        href={"/naves/lista"}
      >
        <GiSpaceShuttle fontSize={20} />
        <span>Naves Avariadas</span>
      </Link>
      <Link
        className={clsx(styles.navItem, {
          [styles.selected]: path === "/patopedia",
        })}
        href={"/patopedia"}
      >
        <GiDuck fontSize={20} />
        <span>Patopédia</span> 
      </Link>
    </nav>
  );
}
