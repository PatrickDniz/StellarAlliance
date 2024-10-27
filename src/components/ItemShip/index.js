"use client"

import { FaTrash } from "react-icons/fa";
import clsx from "clsx";
import styles from "./style.module.css";

export default function ItemShip({ data, onRemove }) {
  console.log(data)
  const {
    id,
    nomeDaNave,
    tamanho,
    cor,
    localDeQueda,
    periculosidadeLocalDeQueda,
    armamentos,
    tipoDeCombustivel,
    numeroDeTripulantes,
    estadoDosTripulantes,
    grauDeAvaria,
    potencialTecnologico,
    grauDePericulosidade,
    utilidade,
    percentualDeUtilidade,
    classificacao,
  } = data;

  const handleRemove = () => {
    onRemove(id);
  };

  const getClassificacaoClass = (classificacao) => {
    switch (classificacao) {
      case "Perfeito":
        return styles.perfeito;
      case "Excelente":
        return styles.excelente;
      case "Bom":
        return styles.bom;
      case "Médio":
        return styles.medio;
      case "Baixo":
        return styles.baixo;
      case "Inviável":
        return styles.inviavel;
      default:
        return "";
    }
  };

  return (
    <li key={id} className={styles.wrapper}>
      <div className={styles.title}>
        <h3>{nomeDaNave}</h3> 
        <div className={clsx(`${getClassificacaoClass(classificacao)}`)}>{percentualDeUtilidade}%</div>
        <div className={styles.remove} onClick={handleRemove}>  <FaTrash fontSize={16} /></div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemTitle}>Informações da Nave</div>
        <div><span>Nome:</span> {nomeDaNave}</div>
        <div><span>Tamanho:</span> {tamanho}</div>
        <div><span>Cor:</span> {cor}</div>
        <div><span>Potencial Tecnologico:</span> {potencialTecnologico}</div>
        <div><span>Armamentos:</span> {armamentos.map((i) => i).join(" ,")}</div>
        <div><span>Combustiveis:</span> {tipoDeCombustivel.map((i) => i).join(" ,")}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemTitle}>Informações da Queda</div>
        <div><span>local:</span> {localDeQueda}</div>
        <div><span>Periculosidade do local:</span> {periculosidadeLocalDeQueda}</div>
        <div><span>Periculosidade da manutençao:</span> {grauDePericulosidade}</div>
        <div><span>Grau de Avaria:</span> {grauDeAvaria}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemTitle}>Informações da Recupeção</div>
        <div><span>Quantidade de Tripulantes:</span> {numeroDeTripulantes}</div>
        <div><span>Estado dos Tripulantes:</span> {estadoDosTripulantes}</div>
        <div><span>Periculosidade da manutençao:</span> {grauDePericulosidade}</div>
      </div>
    </li>
  );
}
