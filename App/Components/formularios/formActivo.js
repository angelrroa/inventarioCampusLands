import { Activo, Persona, ColeccionesSimples } from "../../../js/classes.js";


export class formActivo extends HTMLElement {
    constructor () {
        super();
        this.render();
    }
    async render() {

        const marcas = new ColeccionesSimples( {}, 'marcas' );
        const listaMarcas = await marcas.get();
        const selectMarcas = selectOptions( listaMarcas );

        const categorias = new ColeccionesSimples( {}, 'categorias' );
        const listaCategorias = await categorias.get();
        const selectCategorias = selectOptions( listaCategorias );

        const tiposActivos = new ColeccionesSimples( {}, 'tipos_activos' );
        const listaTiposActivos = await tiposActivos.get();
        const selectTiposActivos = selectOptions( listaTiposActivos );

        const estados = new ColeccionesSimples( {}, 'estados' );
        const listaEstados = await estados.get();
        const selectEstados = selectOptions( listaEstados );

        const personas = new Persona( {} );
        const listaPersonas = await personas.get();
        let personaIdentificacion;
        const selectPersonas = listaPersonas.map( persona => {
            personaIdentificacion = persona.identificacion;
            return `<option value="${persona.nombre}">${persona.nombre} || ${persona.identificacion}</option>`;
        } );

        function selectOptions( lista ) {
            return lista.map( item => {
                return `<option value="${item.nombre}">${item.nombre}</option>`;
            } ).join( '' );
        }


        this.innerHTML = `
        
            <h1 class="mb-4">Crear Activo</h1>
            <form id="formularioActivo">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="codigoTransaccion" class="form-label">Código de Transacción</label>
                        <input type="text" class="form-control" id="codigoTransaccion" placeholder="Ingrese el Código de Transacción" required>
                    </div>
                    <div class="col-md-6">
                        <label for="numeroFormulario" class="form-label">Número de Formulario</label>
                        <input type="text" class="form-control" id="numeroFormulario" placeholder="Ingrese el Número de Formulario" required>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="marca" class="form-label">Marca</label>
                        <select class="form-select" id="marca">
                        <option selected disabled value="">Seleccione una opción</option>
                            ${selectMarcas}
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="categoria" class="form-label">Categoría</label>
                        <select class="form-select" id="categoria">
                        <option selected disabled value="">Seleccione una opción</option>
                            ${selectCategorias}
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="tipo" class="form-label">Tipo</label>
                        <select class="form-select" id="tipo">
                        <option selected disabled value="">Seleccione una opción</option>
                            ${selectTiposActivos}
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="valorUnitario" class="form-label">Valor Unitario</label>
                        <input type="text" class="form-control" id="valorUnitario" placeholder="Ingrese el Valor Unitario" required>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="proveedor" class="form-label">Proveedor</label>
                        <select class="form-select" id="proveedor">
                        <option selected disabled value="">Seleccione una opción</option>
                            ${selectPersonas}
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="numeroSerial" class="form-label">Número de Serial</label>
                        <input type="text" class="form-control" id="numeroSerial" placeholder="Ingrese el Número de Serial" required>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="empresaResponsable" class="form-label">Empresa Responsable</label>
                        <input type="text" class="form-control" id="empresaResponsable" placeholder="Ingrese la Empresa Responsable" required>
                    </div>
                    <div class="col-md-6">
                        <label for="estado" class="form-label">Estado</label>
                        <select class="form-select" id="estado">
                        <option selected disabled value="">Seleccione una opción</option>
                            ${selectEstados}
                        </select>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                        <label for="descripcion" class="form-label">Descripción Activo</label>
                        <input type="text" class="form-control" id="descripcion" placeholder="Mouse - Bodg50-9051-900-0017 GMR ESC" required>
                </div>
                <button type="submit" class="btn btn-primary">Crear Activo</button>
            </form>
      `;


        const codigoTransaccion = this.querySelector( '#codigoTransaccion' );
        const numeroFormulario = this.querySelector( '#numeroFormulario' );
        const marcaSelect = this.querySelector( '#marca' );
        const categoriaSelect = this.querySelector( '#categoria' );
        const tipoActivoSelect = this.querySelector( '#tipo' );
        const valorUnitario = this.querySelector( '#valorUnitario' );
        const proveedorSelect = this.querySelector( '#proveedor' );
        const serial = this.querySelector( '#numeroSerial' );
        const empresaResponsable = this.querySelector( '#empresaResponsable' );
        const estadoSelect = this.querySelector( '#estado' );
        const descripcion = this.querySelector( '#descripcion' );
        const formularioActivo = this.querySelector( '#formularioActivo' );

        formularioActivo.addEventListener( 'submit', async ( event ) => {
            event.preventDefault();

            const codigoTransaccionValue = codigoTransaccion.value;
            const marcaValue = marcaSelect.value;
            const numeroFormularioValue = numeroFormulario.value;
            const categoriaSelectValue = categoriaSelect.value;
            const tipoActivoSelectValue = tipoActivoSelect.value;
            const valorUnitarioValue = valorUnitario.value;
            const proveedorSelectValue = proveedorSelect.value;
            const serialValue = serial.value;
            const empresaResponsableValue = empresaResponsable.value;
            const estadoSelectValue = estadoSelect.value;
            const descripcionValue = descripcion.value;

            const activo = {
                "transaccion": codigoTransaccionValue,
                "formulario": numeroFormularioValue,
                "idMarca": marcaValue,
                "idCategoria": categoriaSelectValue,
                "idTipo": tipoActivoSelectValue,
                "valorUnitario": valorUnitarioValue,
                "idProveedor": personaIdentificacion,
                "proveedor": proveedorSelectValue,
                "serial": serialValue,
                "empresa": empresaResponsableValue,
                "idEstado": estadoSelectValue,
                "descripcion": descripcionValue
            };

            const nuevoActivo = new Activo( activo );
            await nuevoActivo.post( activo );

            formularioActivo.reset();
        } );


    }
}
customElements.define( "form-activo", formActivo );