import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';

import '../../css/HoSo.css';

function CreateEmployee() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        employeeCode: '',
        employeeName: '',
        gender: '',
        phoneNumber: '',
        dateOfBirth: '',
        citizenIdentificationCard: '',
        cardIssueDate: '',
        role: '',
        workShifts: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data.password !== data.confirmPassword) {
                toast.error('Mật khẩu không trùng khớp.');
                return;
            }
            // Kiểm tra trùng lặp Employee Code
            const existingEmployee = await axios.get(API_BASE_URL + API_ROUTES.EMPLOYEE, {
                params: { employeeCode: data.employeeCode },
                headers: API_HEADERS
            });

            if (existingEmployee.data.length > 0) {
                toast.error('Employee Code đã tồn tại.');
                return;
            }
            const newEmployeeData = {
                employeeCode: data.employeeCode,
                employeeName: data.employeeName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                citizenIdentificationCard: data.citizenIdentificationCard,
                cardIssueDate: data.cardIssueDate,
                phoneNumber: data.phoneNumber,
                role: data.role,
                workShifts: data.workShifts,
                password: data.confirmPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const response = await axios.post(API_BASE_URL + API_ROUTES.EMPLOYEE, newEmployeeData, {
                headers: API_HEADERS
            });

            console.log('Response:', response.data);
            toast.success('Successfully added employees');
            navigate('../Employee')
        } catch (err) {
            console.error('Error updating employee information:', err);
            toast.error('Error when adding staff !!!');
        }
    };


    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel ?')) {
            navigate('../Employee');
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Create Employee</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label>Employee Code(*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeCode"
                            value={data.employeeCode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="employeeName">
                        <Form.Label>Employee Name (*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeName"
                            value={data.employeeName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId='dateOfBirth'>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formatDateForInput(data?.dateOfBirth)}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="citizenIdentificationCard">
                        <Form.Label>Citizen Identification </Form.Label>
                        <Form.Control
                            type="text"
                            name="citizenIdentificationCard"
                            value={data?.citizenIdentificationCard}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cardIssueDate">
                        <Form.Label>Card Issue Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="cardIssueDate"
                            value={formatDateForInput(data?.cardIssueDate)}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={data?.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        value={data?.role}
                        onChange={handleChange}
                        required
                    />
                </Form.Group> */}
                <Form.Group as={Col} controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        type="text"
                        name="role"
                        value={data?.role}
                        onChange={handleChange}
                    >
                        <option value="Manage" selected>Manage</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin" >Admin</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="workShifts">
                    <Form.Label>Work Shifts</Form.Label>
                    <Form.Control
                        type="text"
                        name="workShifts"
                        value={data?.workShifts}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password (*)</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="confirmPassword">
                        <Form.Label>Confirm Password (*)</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Col>
                    <Col>
                        <Button className='bg-danger' variant="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CreateEmployee;
