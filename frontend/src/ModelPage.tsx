import "./styles/modelPage.css";
import { useState } from "react";
interface DiamondData {
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  depth: number;
  table: number;
  x: number;
  y: number;
  z: number;
}

const ModelPage = () => {
  const [predict, setPredict] = useState<{ priceEstimate: number } | null>(null);
  const [request, setRequest] = useState<boolean | null>(null);

  const handleSubmit = async () => {
    const carat = parseFloat((document.getElementById("carat") as HTMLInputElement).value);
    const depth = parseFloat((document.getElementById("depth") as HTMLInputElement).value);
    const table = parseFloat((document.getElementById("table") as HTMLInputElement).value);
    const x = parseFloat((document.getElementById("X") as HTMLInputElement).value);
    const y = parseFloat((document.getElementById("Y") as HTMLInputElement).value);
    const z = parseFloat((document.getElementById("Z") as HTMLInputElement).value);
    const cut = (document.getElementById("cut") as HTMLSelectElement).value;
    const color = (document.getElementById("color") as HTMLSelectElement).value;
    const clarity = (document.getElementById("clarity") as HTMLSelectElement).value;

    const fields = [carat, depth, table, x, y, z];

    const hasEmptyFields = fields.some((val) => isNaN(val));

    if (hasEmptyFields || !cut || !color || !clarity) {
      alert("Por favor completá todos los campos correctamente.");
      return;
    }

    const diamond: DiamondData = {
      carat,
      cut,
      color,
      clarity,
      depth,
      table,
      x,
      y,
      z,
    };

    console.log("✅ Datos validados:", diamond);

    const req = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(diamond),
    });

    if (!req.ok) {
      const errorText = await req.text();
      console.error("Error del backend:", errorText);
      return;
    }
    setRequest(req.ok);

    const res: { priceEstimate: number } = await req.json();
    setPredict(res);
    console.log(res);
  };

  return (
    <>
      <div className="container">
        <header>
          <img src="../public/diamond.svg" alt="" />
          <h1>Diamonds Price</h1>
        </header>
        <main>
          <form>
            <label>
              quilates
              <input type="number" id="carat" />
            </label>
            <label>
              cortes
              <select name="cortes" id="cut">
                <option>Ideal</option>
                <option>Premium</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </label>
            <label>
              Color
              <select name="color" id="color">
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
                <option>H</option>
                <option>I</option>
                <option>J</option>
              </select>
            </label>
            <label>
              Claridad
              <select name="claridad" id="clarity">
                <option>IF</option>
                <option>VVS1</option>
                <option>VVS2</option>
                <option>VS1</option>
                <option>VS2</option>
                <option>SI1</option>
                <option>SI2</option>
                <option>I1</option>
              </select>
            </label>
            <label>
              Profundidad
              <input type="number" id="depth"></input>
            </label>
            <label>
              Mesa
              <input type="number" id="table"></input>
            </label>
            <label>
              Ancho
              <input type="number" id="X"></input>
            </label>
            <label>
              Longitud
              <input type="number" id="Y"></input>
            </label>
            <label>
              Altura
              <input type="number" id="Z"></input>
            </label>
          </form>
          <h3 className="estimation">
            {predict ? "$" + Math.round(predict.priceEstimate) : request == null ? "" : "no se pudo obtener la estimación del diamante "}
          </h3>
          <button id="submit" onClick={handleSubmit}>
            Obtener Estimación
          </button>
        </main>
      </div>
      <aside className="info-panel">
        <h2>Guía de Carteristas</h2>
        <ul>
          <li>
            <strong>Quilates:</strong> peso del diamante, usualmente entre 0.2 y 5.0
          </li>
          <li>
            <strong>Corte:</strong> Ideal, Premium, Very Good, Good, Fair (determina el brillo)
          </li>
          <li>
            <strong>Color:</strong> De D (incoloro) a J (más teñido)
          </li>
          <li>
            <strong>Claridad:</strong> FL (perfecto) hasta I1 (inclusiones visibles)
          </li>
          <li>
            <strong>Profundidad:</strong> porcentaje vertical del corte (entre 58% y 64%)
          </li>
          <li>
            <strong>Mesa:</strong> tamaño de la faceta superior (ideal: 53%–62%)
          </li>
          <li>
            <strong>Ancho (x):</strong> en mm, ej. 5.8
          </li>
          <li>
            <strong>Longitud (y):</strong> en mm, ej. 6.0
          </li>
          <li>
            <strong>Altura (z):</strong> en mm, ej. 3.6
          </li>
        </ul>
      </aside>
    </>
  );
};
export default ModelPage;
