import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import "./Articulo.css";
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

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
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
    };

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
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
                console.log(formData);

    };


    const handleAdd = async () => {
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:5000/articulos', formData);
            setData([...data, response.data]);
            handleClose(); // Cerrar el modal al agregar
        } catch (error) {
            console.error("Error al agregar artículo:", error);
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
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Artículos</h3>
                <Button variant="success" onClick={handleShow}>Agregar</Button>
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
                            <Button variant="warning" size="sm" className="me-2">Editar</Button>
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
            {/* Modal para agregar nuevo artículo */}
            <AddArticuloModal
                showModal={showModal}
                handleClose={handleClose}
                formData={formData}
                handleChange={handleChange}
                handleAdd={handleAdd}
            />
        </Container>
    );
};

export default Articulo;