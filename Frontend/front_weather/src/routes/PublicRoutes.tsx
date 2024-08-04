import { Navigate, Route, Routes } from 'react-router-dom';
import Public from '../Modules/Public/Public';

export const PublicRoutes = () => {
    return (
        <Routes>
             <Route path="/" element={<Public />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};