"use client";
import { cadastrarNave, listarNaves } from "@/api/client";
import styles from "./style.module.css";
import React, { useState } from "react";
import clsx from "clsx";

export default function FormularioInventario() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    nomeDaNave: "",
    tamanho: "",
    cor: "",
    localDeQueda: "",
    periculosidadeLocalDeQueda: "",
    armamentos: [],
    tipoDeCombustivel: [],
    numeroDeTripulantes: "",
    estadoDosTripulantes: "",
    grauDeAvaria: "",
    potencialTecnologico: "",
    grauDePericulosidade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "armamentos" || name === "tipoDeCombustivel") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePopupShow = (message) => {
    setPopupMessage(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateFields = () => {
      return (
        formData.nomeDaNave &&
        formData.tamanho &&
        formData.cor &&
        formData.localDeQueda &&
        formData.periculosidadeLocalDeQueda &&
        formData.armamentos.length > 0 &&
        formData.tipoDeCombustivel.length > 0 &&
        formData.numeroDeTripulantes &&
        formData.estadoDosTripulantes &&
        formData.grauDeAvaria &&
        formData.potencialTecnologico &&
        formData.grauDePericulosidade
      );
    };

    if (!validateFields()) {
      return handlePopupShow("Preencher todos os dados para cadastrar a nave.");
    }

    const pesos = {
      tamanho: { pequena: 10, media: 30, grande: 50, colossal: 80 },
      periculosidadeLocalDeQueda: {
        seguro: 50,
        moderado: 25,
        perigoso: 5,
        "extremamente perigoso": 0,
      },
      grauDeAvaria: {
        "perda total": 0,
        "muito destruída": 10,
        "parcialmente destruída": 50,
        "praticamente intacta": 80,
        "sem avarias": 100,
      },
      potencialTecnologico: { baixo: 20, médio: 40, alto: 70, altíssimo: 100 },
      grauDePericulosidade: { baixo: 50, médio: 30, alto: 15, extremo: 0 },
      armamentos: {
        nenhum: 0,
        "canhões de plasma": 20,
        "lasers de alta potência": 30,
        "mísseis teleguiados": 40,
        "defesa anti-matéria": 50,
      },
      tipoDeCombustivel: {
        antimatéria: 50,
        bioenergia: 20,
        "energia escura": 40,
        "cristais energéticos": 30,
        "matéria escura": 60,
      },
    };

    const utilidade =
      (pesos.tamanho[formData.tamanho] || 0) +
      (pesos.periculosidadeLocalDeQueda[formData.periculosidadeLocalDeQueda] ||
        0) +
      (pesos.grauDeAvaria[formData.grauDeAvaria] || 0) +
      (pesos.potencialTecnologico[formData.potencialTecnologico] || 0) +
      (pesos.grauDePericulosidade[formData.grauDePericulosidade] || 0) +
      formData.armamentos.reduce(
        (acc, curr) => acc + (pesos.armamentos[curr] || 0),
        0
      ) +
      formData.tipoDeCombustivel.reduce(
        (acc, curr) => acc + (pesos.tipoDeCombustivel[curr] || 0),
        0
      );

    const percentual = parseFloat(
      Math.min(100, Math.max(0, (utilidade / 500) * 100)).toFixed(2)
    );
    const classificacao =
      percentual === 100
        ? "Perfeito"
        : percentual >= 80
        ? "Excelente"
        : percentual >= 60
        ? "Bom"
        : percentual >= 40
        ? "Médio"
        : percentual >= 20
        ? "Baixo"
        : "Inviável";

    const envio = {
      ...formData,
      ["PontosDeUtilidade"]: utilidade,
      ["percentualDeUtilidade"]: percentual,
      ["classificacao"]: classificacao,
    };

    (async () => {
      await cadastrarNave(envio);

      await listarNaves();
    })();

    handlePopupShow("Nave cadastrada com sucesso!");
  };

  return (
    <>
      <div
        className={clsx(styles.popup, {
          [styles.active]: showPopup,
        })}
      >
        <div>
          {popupMessage}
        </div>
      </div>

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <h2>Cadastro de Inventário Estelar</h2>

        <div>
          <label>Nome da nave:</label>
          <input
            type="text"
            name="nomeDaNave"
            value={formData.nomeDaNave}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Tamanho:</label>
          {["pequena", "media", "grande", "colossal"].map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="tamanho"
                value={size}
                checked={formData.tamanho === size}
                onChange={handleToggleChange}
              />
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>Cor:</label>
          {[
            "vermelha",
            "laranja",
            "amarela",
            "verde",
            "azul",
            "anil",
            "violeta",
          ].map((color) => (
            <label key={color}>
              <input
                type="radio"
                name="cor"
                value={color}
                checked={formData.cor === color}
                onChange={handleToggleChange}
              />
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>Local de Queda:</label>
          <input
            type="text"
            name="localDeQueda"
            value={formData.localDeQueda}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Periculosidade do Local da Queda:</label>
          {["seguro", "moderado", "perigoso", "extremamente perigoso"].map(
            (option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="periculosidadeLocalDeQueda"
                  value={option}
                  checked={formData.periculosidadeLocalDeQueda === option}
                  onChange={handleToggleChange}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            )
          )}
        </div>

        <div>
          <label>Armamentos:</label>
          {[
            "nenhum",
            "canhões de plasma",
            "lasers de alta potência",
            "mísseis teleguiados",
            "defesa anti-matéria",
          ].map((weapon) => (
            <label key={weapon}>
              <input
                type="checkbox"
                name="armamentos"
                value={weapon}
                checked={formData.armamentos.includes(weapon)}
                onChange={handleToggleChange}
              />
              {weapon.charAt(0).toUpperCase() + weapon.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>Tipo de Combustível:</label>
          {[
            "antimatéria",
            "bioenergia",
            "energia escura",
            "cristais energéticos",
            "matéria escura",
          ].map((fuel) => (
            <label key={fuel}>
              <input
                type="checkbox"
                name="tipoDeCombustivel"
                value={fuel}
                checked={formData.tipoDeCombustivel.includes(fuel)}
                onChange={handleToggleChange}
              />
              {fuel.charAt(0).toUpperCase() + fuel.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>Número de Tripulantes:</label>
          <input
            type="number"
            name="numeroDeTripulantes"
            value={formData.numeroDeTripulantes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado dos Tripulantes:</label>
          <input
            type="text"
            name="estadoDosTripulantes"
            value={formData.estadoDosTripulantes}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Grau de Avaria:</label>
          {[
            "perda total",
            "muito destruída",
            "parcialmente destruída",
            "praticamente intacta",
            "sem avarias",
          ].map((damage) => (
            <label key={damage}>
              <input
                type="radio"
                name="grauDeAvaria"
                value={damage}
                checked={formData.grauDeAvaria === damage}
                onChange={handleToggleChange}
              />
              {damage.charAt(0).toUpperCase() + damage.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>Potencial de Prospecção Tecnológica:</label>
          {["baixo", "médio", "alto", "altíssimo"].map((potential) => (
            <label key={potential}>
              <input
                type="radio"
                name="potencialTecnologico"
                value={potential}
                checked={formData.potencialTecnologico === potential}
                onChange={handleToggleChange}
              />
              {potential.charAt(0).toUpperCase() + potential.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>Grau de Periculosidade:</label>
          {["baixo", "médio", "alto", "extremo"].map((risk) => (
            <label key={risk}>
              <input
                type="radio"
                name="grauDePericulosidade"
                value={risk}
                checked={formData.grauDePericulosidade === risk}
                onChange={handleToggleChange}
              />
              {risk.charAt(0).toUpperCase() + risk.slice(1)}
            </label>
          ))}
        </div>

        <button type="submit">Cadastrar Nave</button>
      </form>
    </>
  );
}
