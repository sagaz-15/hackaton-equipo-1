import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function crearRepositorioArchivo(ruta) {
  const leer = () => (existsSync(ruta) ? JSON.parse(readFileSync(ruta, 'utf8')) : []);

  const escribir = (items) => {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, JSON.stringify(items, null, 2));
  };

  return {
    listar() {
      return leer();
    },

    obtener(id) {
      return leer().find((e) => e.id === id);
    },

    guardar(evaluacion) {
      const items = leer();
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const id = items.reduce((max, e) => Math.max(max, e.id), 0) + 1;
        const nueva = { ...evaluacion, id };
        items.push(nueva);
        escribir(items);
        return { ...nueva };
      }
      const i = items.findIndex((e) => e.id === evaluacion.id);
      if (i === -1) items.push({ ...evaluacion });
      else items[i] = { ...evaluacion };
      escribir(items);
      return { ...evaluacion };
    },

    eliminar(id) {
      const items = leer();
      const quedan = items.filter((e) => e.id !== id);
      if (quedan.length === items.length) return false;
      escribir(quedan);
      return true;
    },
  };
}