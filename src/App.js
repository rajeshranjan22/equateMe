import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Admin/Signup';
import CommunityDropdown from './Components/CommunityDropdown';
import RegistrationForm from './Components/RegistrationForm';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/community" element={<CommunityDropdown />} />
            <Route path="/register/:communityId" element={<RegistrationForm />} />
        </Routes>
    );
};

export default App;
