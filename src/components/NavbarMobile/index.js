"use client";

import styles from "./style.module.css";
import Link from "next/link";
import { GiSpaceShuttle } from "react-icons/gi";
import { LuBadgePlus } from "react-icons/lu";
import { GiDuck } from "react-icons/gi";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

export default function NavbarMobile() {
  const path = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  function toggleNav() {
    return setOpenMenu((state) => !state);
  }

  return (
    <>
      <div
        className={clsx(styles.menu, {
          [styles.open]: openMenu == true,
        })}
        onClick={toggleNav}
      >
        <RiMenu3Line fontSize={32} />
      </div>
      <nav className={clsx(styles.nav, { [styles.open]: openMenu == true })}>
        <div className={styles.close}>
          <span>StellarAlliance</span>
          <IoCloseSharp fontSize={32} onClick={toggleNav} />
        </div>
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
    </>
  );
}
