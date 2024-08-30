import React, { useState, useEffect } from 'react';
import { call } from '../api/userApi';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Container = styled.div`
  padding: 0.5rem 1rem; // 상단과 좌우 패딩을 줄임
  max-width: 100%; // 최대 너비를 100%로 설정하여 화면을 더 효율적으로 사용
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  border-bottom: 2px solid #000;
  margin-bottom: 0.5rem; // 하단 마진을 줄임
  padding-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0; // 모든 마진 제거
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem; // 하단 마진을 줄임
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem; // 상단 마진을 줄임
`;

const AdminButton = styled(Button)`
  background-color: #4A90E2;
  color: #fff;

  &:hover {
    background-color: #357AE8;
  }
`;

const RemoveAdminButton = styled(Button)`
  background-color: #E24A4A;
  color: #fff;

  &:hover {
    background-color: #C43C3C;
  }
`;

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#000',
            '&.Mui-selected': {
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#fff',
              },
            },
          },
        },
      },
    },
  },
});


const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await call('/users/allusers', 'GET');
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (email) => {
    try {
      await call('/users/setRole', 'POST', { email });
      fetchUsers();
    } catch (error) {
      console.error('Failed to toggle admin role:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderAdminButton = (user) => {
    if (user.roleSet && user.roleSet.includes('BOSS')) {
      return null; // BOSS 역할을 가진 사용자에게는 버튼을 표시하지 않음
    }

    if (user.roleSet && user.roleSet.includes('ADMIN')) {
      return (
        <RemoveAdminButton onClick={() => toggleAdminRole(user.email)}>
          관리자 해제
        </RemoveAdminButton>
      );
    } else {
      return (
        <AdminButton onClick={() => toggleAdminRole(user.email)}>
          관리자 등록
        </AdminButton>
      );
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleContainer>
          <Title>사용자 목록</Title>
        </TitleContainer>
        <SearchContainer>
          <Input
            type="text"
            placeholder="이메일 혹은 이름으로 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchContainer>
        <Table>
          <thead>
            <tr>
              <Th>회원 아이디</Th>
              <Th>이름</Th>
              <Th>전화번호</Th>
              <Th>권한 부여</Th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.email}>
                <Td>{user.email}</Td>
                <Td>{user.realName}</Td>
                <Td>{user.phone}</Td>
                <Td>
                  {renderAdminButton(user)}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <Pagination 
            count={Math.ceil(filteredUsers.length / usersPerPage)} 
            page={currentPage} 
            onChange={handlePageChange}
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </PaginationContainer>
      </Container>
    </ThemeProvider>
  );
};

export default UserListView;