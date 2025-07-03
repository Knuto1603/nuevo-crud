import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import AddEmpleadoModal from "./AddEmpleadoModal";

const Empleado = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        idEmpleado: '',
        paterno: '',
        materno: '',
        nombres: '',
        direccion: '',
        telefono: '',
        clave: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);  // Estado para saber si es modo edición

    const handleShow = (item = null) => {
        if (item) {
            setIsEditMode(true);
            setFormData({
                idEmpleado: item.idempleado,
                paterno: item.paterno,
                materno: item.materno,
                nombres: item.nombres,
                direccion: item.direccion,
                telefono: item.telefono,
                clave: item.clave
            });
        } else {
            setIsEditMode(false);
            setFormData({
                idEmpleado: '',
                paterno: '',
                materno: '',
                nombres: '',
                direccion: '',
                telefono: '',
                clave: ''
            });
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    useEffect(() => {
        axios.get('http://localhost:5000/empleados')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            if (isEditMode) {
                // Actualizar empleado
                const response = await axios.put(`http://localhost:5000/empleados/${formData.idEmpleado}`, formData);
                setData(data.map(item => (item.idempleado === formData.idEmpleado ? response.data : item)));
            } else {
                // Agregar nuevo empleado
                const response = await axios.post('http://localhost:5000/empleados', formData);
                setData([...data, response.data]);
            }
            handleClose();  // Cerrar el modal al agregar o actualizar
        } catch (error) {
            console.error("Error al agregar o actualizar empleado:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/empleados/${id}`);
            setData(data.filter(item => item.idempleado !== id));
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <Container className='flex-column justify-content-center align-items-center'>
            <div className="d-flex justify-content-between align-items-center gap-4">
                <h3>Empleados</h3>
                <Button variant="success" onClick={() => handleShow()}>Agregar</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID Empleado</th>
                        <th>Paterno</th>
                        <th>Materno</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.idempleado}>
                            <td>{item.idempleado}</td>
                            <td>{item.paterno}</td>
                            <td>{item.materno}</td>
                            <td>{item.nombres}</td>
                            <td>{item.direccion}</td>
                            <td>{item.telefono}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShow(item)}>Editar</Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.idempleado)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar o editar empleado */}
            <AddEmpleadoModal
                showModal={showModal}
                handleClose={handleClose}
                formData={formData}
                handleChange={handleChange}
                handleAdd={handleAdd}
                isEditMode={isEditMode}  // Pasar el estado de edición
            />
        </Container>
    );
};

export default Empleado;