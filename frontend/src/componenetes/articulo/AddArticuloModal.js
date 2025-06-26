import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddArticuloModal = ({ showModal, handleClose, formData, handleChange, handleAdd }) => {
    const [lineas, setLineas] = useState([]);  // Almacenará las opciones para el select
    const [loading, setLoading] = useState(true);  // Estado para mostrar que se está cargando la información

    useEffect(() => {
        // Hacer una petición para obtener las opciones del select
        axios.get('http://localhost:5000/lineas')
            .then(response => {
                setLineas(response.data);  // Guardar las opciones de las líneas
                setLoading(false);  // Dejar de mostrar el loading una vez cargados los datos
            })
            .catch(err => {
                console.error('Error al cargar las líneas:', err);
                setLoading(false);  // También dejar de mostrar el loading si ocurre un error
            });
    }, []);  // Este efecto se ejecutará solo una vez cuando se monte el componente

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Artículo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>ID Artículo</Form.Label>
                        <Form.Control name="idArticulo" value={formData.idArticulo} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control name="descripcion" value={formData.descripcion} onChange={handleChange} />
                    </Form.Group>
                    {/* Campo ID Línea como Select */}
                    <Form.Group className="mb-2">
                        <Form.Label>ID Línea</Form.Label>
                        <Form.Control
                            as="select"
                            name="idLinea"
                            value={formData.idLinea}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="">Seleccione una línea</option>
                            {lineas.map(linea => (
                                <option key={linea.idlinea} value={linea.idlinea}>{linea.descripcion}</option>
                            ))}
                        </Form.Control>
                        {loading && <div>Cargando líneas...</div>}  {/* Mensaje de carga */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Unidad</Form.Label>
                        <Form.Control name="unidad" value={formData.unidad} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control name="stock" type="number" value={formData.stock} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Precio Costo</Form.Label>
                        <Form.Control name="precioCosto" type="number" value={formData.precioCosto} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Precio Venta</Form.Label>
                        <Form.Control name="precioVenta" type="number" value={formData.precioVenta} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Descuento</Form.Label>
                        <Form.Control name="descuento" type="number" value={formData.descuento} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="success" onClick={handleAdd}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddArticuloModal;