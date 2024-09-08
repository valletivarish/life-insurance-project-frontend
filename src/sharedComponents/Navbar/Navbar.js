import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; 
import './Navbar.css';
import { getAllPlans } from '../../services/gaurdianLifeAssuranceServices';

const Navbar = ({ role, setRole }) => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getAllPlans();
                setPlans(response);
                console.log(plans);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        fetchPlans();
    }, []);

    const insurancePlans = () => {
        return plans.map((plan) => (
            <Link to={`/plans/${plan.planId}`} key={plan.id}>{plan.planName}</Link>
        ));
    };

    const handleLogout = () => {
        localStorage.clear(); 
        setRole(null); 
        navigate('/');
    };

    const defaultLinks = () => (
        <>
            <li className="active"><Link to="/">Home</Link></li>
            <li><a href="#about-us">About Us</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Customer Registration</Link></li>
            <li className="dropdown">
                <span>Insurance Plans</span>
                <div className="dropdown-content">
                    {insurancePlans()}
                </div>
            </li>
            <li><Link to="/contact">Contact</Link></li>
        </>
    );

    const renderLinks = () => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li className="dropdown">
                            <Link to="/agents">Agents</Link>
                            <div className="dropdown-content">
                                <Link to="/agents/manage">Manage Agents</Link>
                                <Link to="/agents/approve">Approve Agents</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <span>Insurance Plans</span>
                            <div className="dropdown-content">
                                <Link to="/plans/manage">Manage Plans</Link>
                                <Link to="/plans/approve">Approve Plans</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to="/settings">Settings</Link>
                            <div className="dropdown-content">
                                <Link to="/settings/account">Account Settings</Link>
                                <Link to="/settings/notifications">Notifications</Link>
                            </div>
                        </li>
                        <li><Link to="/account">Account</Link></li>
                        <li><span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span></li>
                    </>
                );
            case 'employee':
                return (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li className="dropdown">
                            <Link to="/agents">Agents</Link>
                            <div className="dropdown-content">
                                <Link to="/agents/view">View Agents</Link>
                                <Link to="/agents/approve">Approve Agents</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <span>Insurance Plans</span>
                            <div className="dropdown-content">
                                <Link to="/insurance/policies">Policies</Link>
                                <Link to="/insurance/claims">Claims</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to="/accounts">Accounts</Link>
                            <div className="dropdown-content">
                                <Link to="/accounts/manage">Manage Accounts</Link>
                            </div>
                        </li>
                        <li><span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span></li>
                    </>
                );
            case 'agent':
                return (
                    <>
                        <li><Link to="/account">Agent Account</Link></li>
                        <li className="dropdown">
                            <span>Insurance Plans</span>
                            <div className="dropdown-content">
                                <Link to="/accounts/manage">Manage Accounts</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to="/marketing">Marketing Insurance</Link>
                            <div className="dropdown-content">
                                <Link to="/marketing/strategy">Strategy</Link>
                                <Link to="/marketing/campaigns">Campaigns</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to="/commissions">Commissions</Link>
                            <div className="dropdown-content">
                                <Link to="/commissions/view">View Commissions</Link>
                            </div>
                        </li>
                        <li><span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span></li>
                    </>
                );
            case 'customer':
                return (
                    <>
                        <li className="dropdown">
                            <Link to="/account">Customer Profile</Link>
                            <div className="dropdown-content">
                                <Link to="/account/view">View Profile</Link>
                                <Link to="/account/edit">Edit Profile</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <span>Insurance Plans</span>
                            <div className="dropdown-content">
                                <Link to="/plans/view">View Plans</Link>
                                <Link to="/plans/apply">Apply for Plan</Link>
                            </div>
                        </li>
                        <li><Link to="/insurance-accounts">Insurance Accounts</Link></li>
                        <li className="dropdown">
                            <Link to="/queries">Queries</Link>
                            <div className="dropdown-content">
                                <Link to="/queries/view">View Queries</Link>
                                <Link to="/queries/submit">Submit Query</Link>
                            </div>
                        </li>
                        <li><span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span></li>
                    </>
                );
            default:
                return defaultLinks();
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-top">
                <div className="navbar-logo">
                    <h2>Guardian Life Assurance</h2>
                </div>
                <ul className="navbar-social-icons">
                    <li><a href="#"><FaFacebook /></a></li>
                    <li><a href="#"><FaTwitter /></a></li>
                    <li><a href="#"><FaLinkedin /></a></li>
                </ul>
            </div>

            <nav className="navbar-bottom ">
                <ul className="navbar-menu">
                    {renderLinks()}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
