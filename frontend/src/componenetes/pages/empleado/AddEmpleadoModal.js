import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEmpleadoModal = ({ showModal, handleClose, formData, handleChange, handleAdd, isEditMode }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Editar Empleado' : 'Agregar Empleado'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>ID Empleado</Form.Label>
                        <Form.Control 
                            name="idEmpleado" 
                            type="number"
                            value={formData.idEmpleado} 
                            onChange={handleChange} 
                            disabled={isEditMode}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control 
                            name="paterno" 
                            value={formData.paterno} 
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control 
                            name="materno" 
                            value={formData.materno} 
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control 
                            name="nombres" 
                            value={formData.nombres} 
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control 
                            name="direccion" 
                            value={formData.direccion} 
                            onChange={handleChange}
                            maxLength={35}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control 
                            name="telefono" 
                            value={formData.telefono} 
                            onChange={handleChange}
                            maxLength={8}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Clave</Form.Label>
                        <Form.Control 
                            name="clave" 
                            type="password"
                            value={formData.clave} 
                            onChange={handleChange}
                            maxLength={15}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="success" onClick={handleAdd}>
                    {isEditMode ? 'Actualizar' : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEmpleadoModal;