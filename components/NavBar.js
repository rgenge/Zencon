import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            <button onClick={toggleMenu} className="hamburger-button">
                ☰
            </button>
            <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/list">Record List</a></li>
                <li><a href="/register-client">Register Client</a></li>
                <li><a href="/money-form">Money Form</a></li>
                <li><a href="/edit-money">Pay Installment</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
