import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';
import Search from '../../components/Search';
function TimeAttendanceManagement() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + API_ROUTES.TimeAttendanceManagement, {
                    headers: API_HEADERS
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Time Attendance Management ?')) {
            try {
                const response = await axios.delete(API_BASE_URL + `TimeAttendanceManagement/${id}`, {
                    headers: API_HEADERS
                });
                console.log(response.data);
                toast.success('Successfully deleted Time Attendance Management');
                const updatedData = data.filter((i) => i.id !== id);
                setData(updatedData);
            } catch (err) {
                console.error('Error deleting Time Attendance Management:', err);
                toast.error('Error when deleting Time Attendance Management !!!');
            }
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Time Attendance Management</h2></Col>
                <Col>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus' style={{ width: '35px' }} />
                    <NavLink to={'/admin/TimeAttendanceManagement/Create'}>Create</NavLink>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Check in</th>
                            <th>Check out</th>
                            <th>Working day</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .filter((employee) =>
                                searchTerm.toLowerCase() === '' ||
                                (employee.employeeCode && employee.employeeCode.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()))
                            )
                            .map(i => {
                                //  const workingDay = new Date(i.workingDay);
                                //  const formatworkingDay = workingDay.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                                return (
                                    <tr key={i.id}>
                                        <td>{i.employeeCode}</td>
                                        <td>{i.checkIn}</td>
                                        <td>{i.checkOut}</td>
                                        <td>{formatDateForInput(i.workingDay)}</td>
                                        <td>{formatDateForInput(i.createdAt)}</td>
                                        <td>{formatDateForInput(i.updatedAt)}</td>
                                        <td>
                                            <NavLink to={`/admin/TimeAttendanceManagement/Update/${i.id}`} >
                                                <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px', marginRight: '10px' }} />
                                            </NavLink>
                                            <NavLink onClick={() => handleDelete(i.id)}>
                                                <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                            </NavLink>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default TimeAttendanceManagement