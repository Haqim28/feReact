//import useState & useEffect here
import {
    Container,
    Row, Col, Form,
    Button
} from 'react-bootstrap'


import { useState } from 'react';
import { UserContext } from './context/userContext';
import { useContext } from 'react';

import { useNavigate } from "react-router-dom"

function Login() {

    const [dataUser, dispatch] = useContext(UserContext);
    console.log('context', dataUser);

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (form.email === "user@mail.com") {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: form
            });

            return navigate("/profile")

        } else if (form.email === "admin@mail.com") {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: form
            });

            return navigate("/profile-partner")
        } else {
            alert("Masukan email yang benar!!")
        }
    }

    return (
        <Container>
            <Row
                className="d-flex align-items-center justify-content-center vh-100">
                <Col md="6">
                    <Form onSubmit={handleOnSubmit}>
                        <div className="text-center h3">Login</div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={handleOnChange}
                                value={form.email}
                                name="email" size="sm" type="email"
                                placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={handleOnChange}
                                value={form.password}
                                name="password" size="sm" type="password"
                                placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" size="sm">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;