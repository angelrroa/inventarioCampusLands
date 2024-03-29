import { fetchData } from "../Api/fetch-api.js";
import { getData, postData, updateData, deleteData } from "../Api/firebaseConfig.js";


// const INVENTORY_URL = '/data/invetoryCampusLands.json';
// const inventoryData = await fetchData( INVENTORY_URL );

// Clase base para POST y GET de los datos en firebase
export class CRUDColeccionesFirebase {
    constructor ( coleccion ) {
        this.coleccion = coleccion;
    }

    // Método para crear datos en Firebase, mediante postData
    async post( data ) {
        try {
            await postData( this.coleccion, data );
            console.log( 'Datos enviados a Firebase correctamente.' );
        } catch ( error ) {
            console.error( "Error al enviar datos a Firebase:", error );
            throw error;
        }
    }

    // Método para obtener datos de Firebase, mediante getData
    async get() {
        try {
            const data = await getData( this.coleccion );
            console.log( 'Datos obtenidos de Firebase correctamente.' );
            return data;
        } catch ( error ) {
            console.error( "Error al obtener datos de Firebase:", error );
            throw error;
        }
    }

    // Método para actualizar datos en Firebase, mediante updateData
    async update( docId, newData ) {
        try {
            await updateData( this.coleccion, docId, newData );
            console.log( 'Datos actualizados en Firebase correctamente.' );
        } catch ( error ) {
            console.error( "Error al actualizar datos en Firebase:", error );
            throw error;
        }
    }

    // Método para eliminar datos en Firebase, mediante deleteData
    async delete( docId ) {
        try {
            await deleteData( this.coleccion, docId );
            console.log( 'Dato eliminado de Firebase correctamente.' );
        } catch ( error ) {
            console.error( "Error al eliminar dato en Firebase:", error );
            throw error;
        }
    }
}


export class Activo extends CRUDColeccionesFirebase {
    constructor ( data ) {
        super( 'activos' );
        this.transaccion = data.codigoTransaccion;
        this.formulario = data.formulario;
        this.idMarca = data.idMarca;
        this.idCategoria = data.idCategoria;
        this.idTipo = data.idTipo;
        this.valorUnitario = data.valorUnitario;
        this.idProveedor = data.idProveedor;
        this.proveedor = data.proveedor;
        this.serial = data.serial;
        this.empresa = data.empresa;
        this.idEstado = data.idEstado;
        this.descripcion = data.descripcion;
    }
}


export class ManejoInventario extends CRUDColeccionesFirebase {
    constructor ( coleccion ) {
        super( coleccion );
    }
    async mostrarInventario() {
        try {
            const items = await this.get();
            items.forEach( item => {

                for ( const [ key, value ] of Object.entries( item ) ) {

                }
            } );
        } catch ( error ) {
            console.error( 'Error al obtener el inventario para mostrar:', error );
        }
    }
}


export class Persona extends CRUDColeccionesFirebase {
    constructor ( data ) {
        super( 'personas' );
        this.identificacion = data.identificacion;
        this.nombre = data.nombre;
        this.email = data.email;
        this.idTipo = data.idTipo;
    }
}


export class Asignacion extends CRUDColeccionesFirebase {
    constructor ( data ) {
        super( 'asignaciones' );
        this.fecha = data.fecha;
        this.idPersona = data.idPersona;
    }
}


// Clase para manejar las colecciones que solo tienen la llave nombre
// Categorias, Marcas, Estados, Tipo Persona, Tipos de activos
export class ColeccionesSimples extends CRUDColeccionesFirebase {
    constructor ( data, coleccion ) {
        super( coleccion );
        this.nombre = data.nombre;
    }
}
