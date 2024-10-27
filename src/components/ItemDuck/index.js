import clsx from "clsx";
import styles from "./style.module.css";
import Image from "next/image";

export default function ItemDuck({ data }) {
  const {
    id,
    raca,
    imagem,
    grauDePerigo,
    localidade,
    habitat,
    curiosidade,
    comoInteragir,
  } = data;

  const getDangerClass = (grauDePerigo) => {
    switch (grauDePerigo) {
      case "Perigoso":
        return styles.perigoso;
      case "Alto":
        return styles.alto;
      case "Médio":
        return styles.medio;
      case "Baixo":
        return styles.baixo;
      case "Pacífico":
        return styles.pacifico;
      default:
        return "";
    }
  };

  return (
    <li key={id} className={styles.wrapper}>
      <div className={styles.picture}> 
        <Image 
        src={imagem}
        alt={raca}
        fill
        /> 
        <div className={clsx(`${getDangerClass(grauDePerigo)}`)}>{grauDePerigo}</div>
      </div>
      <div className={styles.title}>
        <h3>{raca}</h3>
      </div>
      <div className={styles.item}>
        <div className={styles.itemTitle}>Informações da Nave</div>
        <div>
          <span>Localidade:</span> {localidade}
        </div>
        <div>
          <span>Habitat:</span> {habitat}
        </div>
        <div>
          <span>Curiosidade:</span> {curiosidade}
        </div>
        <div>
          <span>Como Interagir:</span> {comoInteragir}
        </div>
      </div>
    </li>
  );
}
