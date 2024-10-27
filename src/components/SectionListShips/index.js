import { ships } from "@/mock/ships";
import ItemShip from "../ItemShip";
import styles from "./style.module.css";
import Image from "next/image";

export default function SectionListShips() {
  console.log(ships.length)
  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {ships.length > 0 ? (
          ships.map((ship) => <ItemShip key={ship.id} data={ship} />)
        ) : (
          <div className={styles.empty}>
            <Image src={"/imagem/empty.png"} alt={"Sem naves cadastradas"} width={240} height={240} />
            <span>Sem naves cadastradas</span>
          </div>
        )}
      </ul>
    </section>
  );
}
