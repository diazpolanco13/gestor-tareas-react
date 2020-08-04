import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  //Metodo para agregar tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Por favor agregue algo...");
      return;
    }

    setTareas([
      ...tareas,
      {
        id: shortid.generate(),
        nombreTarea: tarea,
      },
    ]);
    setTarea("");
    setError(null);
  };

  //Eliminar Tarea
  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter((item) => item.id !== id);
    setTareas(tareasFiltradas);
  };
  //Editar Tarea
  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };
  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento Vacio");
      setError("Por favor agregue algo...");
      return;
    }

    const arrayTareasEditadas = tareas.map((item) =>
      item.id === id ? { id, nombreTarea: tarea } : item
    );
    setTareas(arrayTareasEditadas);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5">GESTOR DE TAREAS</h1>
      <hr />
      <div className="row">
        {/* Lista de tareas (COLUMNA IZQUIERDA) */}
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Columna del formulario (COLUMNA DERECHA) */}
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar tarea" : "Agregar Tarea"}
          </h4>
          {/* cuerpo de formulario */}
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Agregar tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Guardar
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
