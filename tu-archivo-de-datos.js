// tu-archivo-de-datos.js

const app = Vue.createApp({
  data() {
    return {
      publicaciones: [], // Array para almacenar productos
      modalActivo: false, // Agrega un flag para controlar la apertura/cierre del modal
      editarActivo: false, // Agrega un flag para controlar la apertura/cierre del modal de edición
      publicacionAEditar: {}, // Almacena la publicación que se va a editar
      nuevaPublicacion: {
        id: null,
        titulo: '',
        imagenes: [],
        precio: null,
        estado: '',
        tipoEnvio: '',
        formasPago: [],
        etiquetas: [],
        categoria: ''
        // Inicializa los demás campos de acuerdo con la estructura de tu publicación
      }
    };
  },
  created() {
    this.leerProductos(); // Llama a la función para leer productos al iniciar la app
  },
  methods: {
    async agregarPublicacion() {
      try {
        const nuevoId = this.publicaciones.length + 1;

        const nuevoProducto = {
          id: nuevoId,
          titulo: this.nuevaPublicacion.titulo,
          imagenes: this.nuevaPublicacion.imagenes,
          precio: this.nuevaPublicacion.precio,
          estado: this.nuevaPublicacion.estado,
          tipoEnvio: this.nuevaPublicacion.tipoEnvio,
          formasPago: this.nuevaPublicacion.formasPago,
          etiquetas: this.nuevaPublicacion.etiquetas,
          categoria: this.nuevaPublicacion.categoria
          // Agregar otros campos según la estructura del producto
        };

        const response = await fetch('productos.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoProducto),
        });

        if (!response.ok) {
          throw new Error('No se pudo agregar el producto');
        }

        this.publicaciones.push(nuevoProducto);

        this.nuevaPublicacion = {
          id: null,
          titulo: '',
          imagenes: [],
          precio: null,
          estado: '',
          tipoEnvio: '',
          formasPago: [],
          etiquetas: [],
          categoria: ''
          // Limpiar otros campos según la estructura del producto
        };

        await this.leerProductos();
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    },
    async leerProductos() {
      try {
        const response = await fetch('productos.json');
        if (!response.ok) {
          throw new Error('No se pudieron obtener los productos');
        }
        const data = await response.json();
        this.publicaciones = data; // Asigna los productos al array en data
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    async escribirProductos() {
      try {
        const response = await fetch('productos.json', {
          method: 'POST', // Método para escribir en el archivo
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.publicaciones) // Convierte los datos a JSON para escribir
        });
        if (!response.ok) {
          throw new Error('No se pudieron escribir los productos');
        }
        console.log('Productos escritos exitosamente');
      } catch (error) {
        console.error('Error al escribir productos:', error);
      }
    },
    abrirModal() {
      this.modalActivo = true; // Cambia el estado del modal a activo
    },
    cerrarModal() {
      this.modalActivo = false; // Cambia el estado del modal a inactivo
    },
    abrirEdicion(id) {
      this.publicacionAEditar = this.publicaciones.find(publicacion => publicacion.id === id);
      this.editarActivo = true; // Abre el modal de edición
    },
    cerrarEdicion() {
      this.editarActivo = false; // Cierra el modal de edición
      this.publicacionAEditar = {}; // Restablece los datos de la publicación a editar
    },
    guardarEdicion() {
      // Aquí debes implementar la lógica para guardar las ediciones realizadas
      // a la publicación en this.publicacionAEditar

      // Encuentra el índice de la publicación en el array publicaciones
      const index = this.publicaciones.findIndex(publicacion => publicacion.id === this.publicacionAEditar.id);

      // Reemplaza la publicación en el array con la versión actualizada
      this.publicaciones.splice(index, 1, this.publicacionAEditar);

      // Guardar los cambios en el archivo productos.json
      this.escribirProductos();

      this.editarActivo = false; // Cierra el modal de edición
      this.publicacionAEditar = {}; // Restablece los datos de la publicación a editar
    },
    editarPublicacion(id) {
      // Obtiene la publicación que se quiere editar
      const publicacion = this.publicaciones.find((publicacion) => publicacion.id === id);

      // Muestra el modal de edición
      this.publicacionAEditar = publicacion;
      this.editarActivo = true;
    },
    handleFileChange(e) {

      const files = e.target.files

      for (let i = 0; i < files.length; i++) {

        const file = files[i]
        const reader = new FileReader()

        reader.onload = () => {

          this.nuevaPublicacion.imagenes.push(reader.result)

        }

        reader.readAsDataURL(file)

      }

    }
  }
});

app.mount('#app');
