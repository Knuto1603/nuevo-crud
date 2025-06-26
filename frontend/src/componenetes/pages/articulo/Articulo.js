import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import AddArticuloModal from "./AddArticuloModal";

const Articulo = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        idArticulo: '',
        descripcion: '',
        idLinea: '',
        unidad: '',
        stock: '',
        precioCosto: '',
        precioVenta: '',
        descuento: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);  // Estado para saber si es modo edición

    const handleShow = (item = null) => {
        if (item) {
            setIsEditMode(true);
            setFormData({
                idArticulo: item.idarticulo,
                descripcion: item.descripcion,
                idLinea: item.idlinea,
                unidad: item.unidad,
                stock: item.stock,
                precioCosto: item.preciocosto,
                precioVenta: item.precioventa,
                descuento: item.descuento
            });
        } else {
            setIsEditMode(false);
            setFormData({
                idArticulo: '',
                descripcion: '',
                idLinea: '',
                unidad: '',
                stock: '',
                precioCosto: '',
                precioVenta: '',
                descuento: ''
            });
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    useEffect(() => {
        axios.get('http://localhost:5000/articulos')
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
                // Actualizar artículo
                const response = await axios.put(`http://localhost:5000/articulos/${formData.idArticulo}`, formData);
                setData(data.map(item => (item.idarticulo === formData.idArticulo ? response.data : item)));
            } else {
                // Agregar nuevo artículo
                const response = await axios.post('http://localhost:5000/articulos', formData);
                setData([...data, response.data]);
            }
            handleClose();  // Cerrar el modal al agregar o actualizar
        } catch (error) {
            console.error("Error al agregar o actualizar artículo:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/articulos/${id}`);
            setData(data.filter(item => item.idarticulo !== id));
        } catch (error) {
            console.error("Error al eliminar el artículo:", error);
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <Container className='flex-column justify-content-center align-items-center'>
            <div className="d-flex justify-content-between align-items-center gap-4">
                <h3>Artículos</h3>
                <Button variant="success" onClick={() => handleShow()}>Agregar</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>idArticulo</th>
                        <th>Descripción</th>
                        <th>idLinea</th>
                        <th>Unidad</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.idarticulo}>
                            <td>{item.idarticulo}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.idlinea}</td>
                            <td>{item.unidad}</td>
                            <td>{item.stock}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShow(item)}>Editar</Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.idarticulo)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar o editar artículo */}
            <AddArticuloModal
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

export default Articulo;