"use client";

import { listarNaves, removerNave } from "@/api/client";
import ItemShip from "../ItemShip";
import styles from "./style.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SectionListShips() {
  const [ships, setShips] = useState([]);

  async function getShips() {
    const naves = await listarNaves(); 
    return naves;
  }

  useEffect(() => {
    (async () => {
      const naves = await getShips(); 
      setShips(naves); 
    })();
  }, []);

  const removeShip = (id) => {
    setShips((prevShips) => prevShips.filter(ship => ship.id !== id));
    (async () => {
      await removerNave(id);  
    })();
  };

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {ships.length > 0 ? (
          ships.map((ship) => <ItemShip key={ship.id} data={ship} onRemove={removeShip} />)
        ) : (
          <div className={styles.empty}>
            <Image
              src={"/imagem/empty.png"}
              alt={"Sem naves cadastradas"}
              width={240}
              height={240}
            />
            <span>Sem naves cadastradas</span>
          </div>
        )}
      </ul>
    </section>
  );
}
