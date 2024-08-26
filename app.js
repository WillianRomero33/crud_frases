const { createApp, ref, computed, onupdate, reactive } = Vue;

const frases = [
  { frase: "Hola", autor: "Willian" },
  { frase: "Como estas", autor: "Antonio" },
  { frase: "nuevo mundo", autor: "Romero" },
  { frase: "viejo mundo", autor: "Alvarado" },
];

createApp({
  setup() {
    const nFrase = ref("");
    const nAutor = ref("");

    const eIndex = ref(null);
    const efrase = reactive({ frase: "", autor: "" });

    // const update = ref("");

    const message = ref(frases);
    //Funcion add
    const add = () => {
      message.value.unshift({ frase: nFrase.value, autor: nAutor.value });
      nFrase.value = "";
      nAutor.value = "";
    };

    // eliminar
    const remove = (numeros) => {
      message.value.splice(numeros, 1);
    };

    // Función para iniciar la edición
    const eeditar = (index) => {
      eIndex.value = index;
      efrase.frase = message.value[index].frase;
      efrase.autor = message.value[index].autor;
    };

    // Función para guardar los cambios
    const update = () => {
      if (eIndex.value !== null) {
        message.value[eIndex.value] = { ...efrase };
        eIndex.value = null;
        efrase.frase = "";
        efrase.autor = "";
        // Cerrar el modal después de guardar
        const modalElement = document.getElementById("editar");
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    };

    return {
      message,
      add,
      nFrase,
      nAutor,
      remove,
      update,
      eeditar,
      efrase,
    };
  },
}).mount("#app");
