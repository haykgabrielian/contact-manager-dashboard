import React, { useState } from 'react';
import { useUserContext } from "../context/UserContext";
import { useUsersQuery, useDeleteUser, useUpdateUser, useCreateUser } from '../hooks/useUsersQuery.js';
import NoImage from '../assets/images/no-image.jpg';
import { User } from '../types/userTypes';
import Confirmation from './modals/Confirmation';
import UserForm from "./modals/UserForm";

const UserDetails = () => {
    const userId = useUserContext();
    const { data: users, isLoading, error } = useUsersQuery();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [pendingRequest, setPendingRequest] = useState<number | null>(null);

    const deleteUser = useDeleteUser();
    const updateUser = useUpdateUser();

    const handleDeleteModalOpen = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    const handleEditModalOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleDelete = async () => {
        setPendingRequest(userId);
        try {
            await deleteUser.mutateAsync(userId);
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setPendingRequest(null);
            handleDeleteModalClose()
        }
    };

    const handleUpdate = async (formData: { firstName: string; lastName: string; email: string }) => {
        setPendingRequest(userId);
        try {
            await updateUser.mutateAsync({ userId, userData: formData });
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setPendingRequest(null);
            handleEditModalClose()
        }
    };

    if (isLoading) return <p>Loading user details...</p>;
    if (error) return <p>Error loading user details: {error.message}</p>;

    const user = users?.find((user: User) => user.id === userId);

    if (!user) return <p>User not found.</p>;

    const userDefaultValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    return (
        <div
            className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 text-center mb-8 md:mb-0">
                    <img src={user.image ? user.image : NoImage} alt="Profile Picture"
                         className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105 ring ring-gray-300"/>
                </div>
                <div className="md:w-2/3 md:pl-8">
                    <h1 className="text-2xl font-bold text-indigo-800 mb-2">{`${user.firstName} ${user.lastName}`}</h1>
                    <p className="text-gray-600 mb-6">{user.username}</p>

                    <h2 className="text-xl font-semibold text-indigo-800 mb-4">Position</h2>
                    <p className="text-gray-600 mb-6">{user.company.title}</p>

                    <h2 className="text-xl font-semibold text-indigo-800 mb-4">Contact Information</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800 "
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                            {user.email}
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                            {user.phone}
                        </li>
                    </ul>
                    <div className='flex'>
                        <button
                            onClick={() => handleEditModalOpen()}
                            className="mt-4 mr-4 inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Edit
                        </button>
                        <button
                            onClick={() => handleDeleteModalOpen()}
                            className="mt-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {
                isDeleteModalOpen && <Confirmation loading={pendingRequest === user.id} onCancel={() => handleDeleteModalClose()} onConfirm={() => handleDelete()}/>
            }
            {
                isEditModalOpen && <UserForm title='Update' loading={pendingRequest === user.id} onCancel={() => handleEditModalClose()} onConfirm={handleUpdate} defaultValues={userDefaultValues}/>
            }
        </div>
    );
};

export default UserDetails;