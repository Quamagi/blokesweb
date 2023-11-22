// tu-archivo-de-datos.js

const app = Vue.createApp({
    data() {
      return {
        publicaciones: [], // Array para almacenar productos
        modalActivo: false, // Agrega un flag para controlar la apertura/cierre del modal
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
        agregarPublicacion() {
            // Asigna un ID único a la nueva publicación (puedes usar un método como Math.random() o generar uno propio)
            this.nuevaPublicacion.id = Math.floor(Math.random() * 1000);
      
            // Agrega la nueva publicación al array de publicaciones
            this.publicaciones.push(this.nuevaPublicacion);
      
            // Cierra el modal después de agregar la publicación
            this.cerrarModal();
      
            // Restablece el objeto nuevaPublicacion para futuras adiciones
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
              // Restablece los demás campos según la estructura de tu publicación
            };
      
            // Llama a la función para escribir los productos (escribirProductos()) si es necesario
            // this.escribirProductos();
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
      }
    }
  });
  
  app.mount('#app');
  