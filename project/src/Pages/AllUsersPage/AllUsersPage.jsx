import '../AllUsersPage/AllUsersPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/userSlice';
import { fetchQuestions } from '../../slices/questionSlice';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import AddUserModal from '../../Components/AddUserModal/AddUserModal';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AllUsersPage() {
    const dispatch = useDispatch();
    const { users, loading: loadingUsers, error: errorUsers } = useSelector(state => state.users);
    const { questions, loading: loadingQuestions, error: errorQuestions } = useSelector(state => state.questions);
    
    const [pageUsers, setPageUsers] = useState(1);
    const [pageQuestions, setPageQuestions] = useState(1);
    const limit = 10; // Количество элементов на странице
    const [isModalOpen, setModalOpen] = useState(false); 

    useEffect(() => {
        dispatch(fetchUsers({ page: pageUsers, limit }));
    }, [dispatch, pageUsers, limit]);

    useEffect(() => {
        dispatch(fetchQuestions({ page: pageQuestions, limit }));
    }, [dispatch, pageQuestions, limit]);

    const handleNextPageUsers = () => {
        setPageUsers(prevPage => prevPage + 1);
    };

    const handlePrevPageUsers = () => {
        setPageUsers(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleAddUser = () => {
        setModalOpen(true); // Открыть модальное окно
    };

    const closeModal = () => {
        setModalOpen(false); // Закрыть модальное окно
    };


    const generateUserReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('User Report', 20, 20);
        doc.autoTable({
            head: [['ID', 'Name', 'Surname', 'Phone', 'Birthdate', 'Role', 'Blocked']],
            body: users.map(user => [
                user._id, user.name, user.surname, user.phone, user.birthdate, user.role, user.isBlocked ? 'Yes' : 'No'
            ]),
            startY: 30,
            styles: { fontSize: 12 }
        });
        doc.save('user_report.pdf');
    };

   

    return (
        <>
            <HeaderLog />
            <div className='feature'>
                <p className='title'>USERS INFORMATION</p>
                {loadingUsers && <p>Loading users...</p>}
                {errorUsers && <p className="error">{errorUsers}</p>}
                {users.length > 0 ? (
                    <TableContainer component={Paper} sx={{ width: '90%' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">NAME</TableCell>
                                    <TableCell align="center">SURNAME</TableCell>
                                    <TableCell align="center">PHONE</TableCell>
                                    <TableCell align="center">BIRTHDATE</TableCell>
                                    <TableCell align="center">ROLE</TableCell>
                                    <TableCell align="center">isBlocked</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell component="th" scope="row">{user._id}</TableCell>
                                        <TableCell align="center">{user.name}</TableCell>
                                        <TableCell align="center">{user.surname}</TableCell>
                                        <TableCell align="center">{user.phone}</TableCell>
                                        <TableCell align="center">{user.birthdate}</TableCell>
                                        <TableCell align="center">{user.role}</TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>No users found.</p>
                )}
                <div className='buttons'>
                    <button onClick={handlePrevPageUsers} disabled={pageUsers === 1}>Previous</button>
                    <button onClick={handleNextPageUsers}>Next</button>
                    <button onClick={handleAddUser} className='addButton'>ADD USER</button>
                    <button onClick={generateUserReport}>Generate User Report</button>
                </div>
            </div>
            <Footer />
            <AddUserModal isOpen={isModalOpen} onClose={closeModal} /> 
        </>
    );
}