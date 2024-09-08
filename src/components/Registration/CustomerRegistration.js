import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getAllStates } from '../../services/gaurdianLifeAssuranceServices';
import './CustomerRegistration.css';
import { register } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { showToastError, showToastSuccess } from '../../utils/toast/Toast';
import { required, email, alphanumeric, alphabetsOnly, positiveNumeric, isStrongPassword, minLength } from '../../utils/validators/Validators'; // Validators

const CustomerRegistration = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [apartment, setApartment] = useState('');
    const [pincode, setPincode] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState();
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [errors, setErrors] = useState({}); // New state for tracking field-specific errors

    useEffect(() => {
        const getAllStatesData = async () => {
            const statesData = await getAllStates();
            setStates(statesData.content);
        };
        getAllStatesData();
    }, []);

    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value);
        setSelectedState(selectedStateId);
        const selectedStateObj = states.find((state) => state.id === selectedStateId);
        if (selectedStateObj) {
            setCities(selectedStateObj.cities);
        } else {
            setCities([]);
        }
    };

    const renderStates = () => {
        return states.map((state, index) => (
            <option key={index} value={state.id}>{state.name}</option>
        ));
    };

    const renderCities = () => {
        return cities.map((city, index) => (
            <option key={index} value={city.id}>{city.city}</option>
        ));
    };

    const validateFields = () => {
        const newErrors = {};

        newErrors.firstName = alphabetsOnly(firstName) || required(firstName) ? 'First Name is invalid.' : '';
        newErrors.lastName = alphabetsOnly(lastName) || required(lastName) ? 'Last Name is invalid.' : '';
        newErrors.dateOfBirth = required(dateOfBirth) ? 'Date of Birth is required.' : '';
        newErrors.phoneNumber = positiveNumeric(phoneNumber) || minLength(phoneNumber, 10) || required(phoneNumber) ? 'Phone Number is invalid.' : '';
        newErrors.username = alphanumeric(username) || required(username) ? 'Username is invalid.' : '';
        newErrors.emailAddress = email(emailAddress) || required(emailAddress) ? 'Email is invalid.' : '';
        newErrors.password = isStrongPassword(password) || required(password) ? 'Password is invalid.' : '';
        newErrors.houseNo = required(houseNo) ? 'House Number is required.' : '';
        
        newErrors.pincode = positiveNumeric(pincode) || minLength(pincode, 6) || required(pincode) ? 'Pincode is invalid.' : '';

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            showToastError('Please fix the validation errors before submitting.');
            return;
        }

        const payload = {
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber,
            username,
            email: emailAddress,
            password,
            houseNo,
            apartment,
            pincode,
            stateId: parseInt(selectedState),
            cityId: parseInt(selectedCity),
        };

        try {
            await register(payload);
            showToastSuccess('Registration successful!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            showToastError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <Container className="registration-container">
            <div className="registration-card">
                <h2 className="text-center registration-header">Customer Registration</h2>
                <Form className="registration-form" onSubmit={handleRegister}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formFirstName">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formLastName">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formDob">
                                <Form.Control
                                    type="date"
                                    className="registration-input"
                                    value={dateOfBirth}
                                    onChange={(e) => setDob(e.target.value)}
                                    isInvalid={!!errors.dateOfBirth}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dateOfBirth}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formPhone">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    type="email"
                                    className="registration-input"
                                    placeholder="Enter Email"
                                    value={emailAddress}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={!!errors.emailAddress}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.emailAddress}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formPassword">
                                <Form.Control
                                    type="password"
                                    className="registration-input"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="formHouseNo">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter House No"
                                    value={houseNo}
                                    onChange={(e) => setHouseNo(e.target.value)}
                                    isInvalid={!!errors.houseNo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.houseNo}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formApartment">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter Apartment"
                                    value={apartment}
                                    onChange={(e) => setApartment(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formPincode">
                                <Form.Control
                                    type="text"
                                    className="registration-input"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    isInvalid={!!errors.pincode}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.pincode}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formState">
                                <Form.Control
                                    as="select"
                                    className="registration-input"
                                    value={selectedState}
                                    onChange={handleStateChange}
                                >
                                    <option value="">Select State</option>
                                    {renderStates()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCity">
                                <Form.Control
                                    as="select"
                                    className="registration-input"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(parseInt(e.target.value))}
                                    disabled={!selectedState}
                                >
                                    <option value="">Select City</option>
                                    {renderCities()}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="center">
                        <Button variant="primary" type="submit" className="registration-button">
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default CustomerRegistration;
