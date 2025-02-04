import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from '@tanstack/react-router';

import { useUsersQuery, useCreateUser } from '../hooks/useUsersQuery.js';
import { UserProvider } from "../context/UserContext";

import { User } from '../types/userTypes';
import UserSearch from './UserSearch';
import NoImage from '../assets/images/no-image.jpg';
import UserForm from "./modals/UserForm";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

    const { data: users, isLoading, error } = useUsersQuery();

    const createUser = useCreateUser();

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const handleCreate = async (formData: { firstName: string; lastName: string; email: string }) => {
        try {
            await createUser.mutateAsync(formData);
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            handleCreateModalClose()
        }
    };

    const handleCreateModalOpen = () => {
        setIsCreateModalOpen(true); // Open the delete confirmation modal
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false); // Close the delete confirmation modal
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleUserSelect = (userId: number) => {
        setSelectedUserId(userId);
        navigate({ to: `/${userId}` });
    };

    const filteredUsers = users?.filter((user: User) =>
        user.firstName.toLowerCase().startsWith(debouncedSearchQuery.toLowerCase())||
        user.lastName.toLowerCase().startsWith(debouncedSearchQuery.toLowerCase())
    );

    return (
        <div className="flex p-4">
            <div className="w-1/3 p-4 bg-gray-100">
                <div className="max-w-2xl mx-auto mt-[10px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-black">Users List</h3>
                    </div>
                </div>
                <UserSearch
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleCreate={handleCreateModalOpen}
                />
                {isLoading ? <p>Loading users...</p> :
                    <ul className="space-y-2 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-200"
                        style={{height: "600px"}}>
                        {filteredUsers?.length > 0 ? (
                            filteredUsers.map((user: User) => (
                                <li key={user.id} onClick={() => handleUserSelect(user.id)}
                                    className={`py-3 sm:py-4  pr-[4px] pl-[4px] cursor-pointer ${user.id === selectedUserId ? 'bg-blue-200' : 'bg-transparent'}`}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full"
                                                 src={user.image ? user.image : NoImage}
                                                 alt="Neil image"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                                {`${user.firstName} ${user.lastName}`}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (<li>No users found</li>)}
                    </ul>
                }
            </div>
            {
                isCreateModalOpen && <UserForm title='Create' onCancel={() => handleCreateModalClose()} onConfirm={handleCreate}/>
            }
            <div className="w-2/3 p-4">
                <UserProvider userId={selectedUserId}>
                    <Outlet/>
                </UserProvider>
            </div>
        </div>
    );
};

export default Home;
