import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';
import { deleteUser } from "../api/userApi";
import { useNavigate } from 'react-router-dom';
import Logout from '../api/userLoginApi';

export default function DeleteView() {
    console.log("DeleteView");
    const [openModal, setOpenModal] = useState(true);  // 컴포넌트 마운트 시 모달 표시
    const [deleteStatus, setDeleteStatus] = useState(null);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate('/');  // 모달을 닫으면 홈으로 이동
    };

    const handleDeleteUser = async () => {
        try {
            const result = await deleteUser();
            setDeleteStatus(result);
            if (result) {
                setTimeout(() => {
                    Logout();
                    navigate('/');
                }, 3000);  // 3초 후 로그아웃 및 홈으로 이동
            }
        } catch (error) {
            console.error("Error during user deletion:", error);
            setDeleteStatus(false);
        }
    };

    useEffect(() => {
        if (deleteStatus === false) {
            // 삭제 실패 시 3초 후 로그아웃
            const timer = setTimeout(() => {
                Logout();
                navigate('/login');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [deleteStatus, navigate]);

    return (
        <>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{"회원 탈퇴 확인"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>아니오</Button>
                    <Button onClick={handleDeleteUser} autoFocus>
                        예, 탈퇴하겠습니다
                    </Button>
                </DialogActions>
            </Dialog>

            {deleteStatus !== null && (
                <Alert severity={deleteStatus ? "success" : "error"}>
                    {deleteStatus ? "탈퇴 처리되었습니다. 잠시 후 로그인 페이지로 이동합니다." : "탈퇴 처리에 실패했습니다. 잠시 후 로그아웃됩니다."}
                </Alert>
            )}
        </>
    );
}