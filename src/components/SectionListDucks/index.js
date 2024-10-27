import {ducks} from "@/mock/ducks"; 
import ItemDuck from "../ItemDuck";
import styles from "./style.module.css";

export default function SectionListDucks() { 
  
  return(
  <section className={styles.section}>
    <ul className={styles.list}>
      {ducks.map((ship) => (
        <ItemDuck key={ship.id} data={ship} />
      ))}
    </ul>
  </section>)
}