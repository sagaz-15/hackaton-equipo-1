export function crearRepositorioMemoria() {
  let items = [];
  const copia = (e) => ({ ...e });

  return {
    listar() {
      return items.map(copia);
    },

    obtener(id) {
      const encontrada = items.find((e) => e.id === id);
      return encontrada ? copia(encontrada) : undefined;
    },

    guardar(evaluacion) {
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const id = items.reduce((max, e) => Math.max(max, e.id), 0) + 1;
        const nueva = { ...evaluacion, id };
        items.push(nueva);
        return copia(nueva);
      }
      const i = items.findIndex((e) => e.id === evaluacion.id);
      if (i === -1) items.push(copia(evaluacion));
      else items[i] = copia(evaluacion);
      return copia(evaluacion);
    },

    eliminar(id) {
      const antes = items.length;
      items = items.filter((e) => e.id !== id);
      return items.length < antes;
    },
  };
}