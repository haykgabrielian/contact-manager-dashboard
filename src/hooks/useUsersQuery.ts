import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, deleteUserById, updateUserById } from "../api/usersApi";
import { User } from '../types/userTypes';

export const useUsersQuery = () => {
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 60000,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, number>({
        mutationFn: (userId: number) => deleteUserById(userId),
        onSuccess: (id: number) => {
            queryClient.setQueryData<User[]>(["users"], (oldData) =>
                oldData ? oldData.filter((user: User) => user.id !== id) : []
            );
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, { userId: number; userData: Partial<User> }>({
        mutationFn: ({ userId, userData }) => updateUserById(userId, userData),
        onSuccess: (updatedUser: User) => {
            queryClient.setQueryData<User[]>(["users"], (oldData) =>
                oldData
                    ? oldData.map((user) =>
                        user.id === updatedUser.id ? updatedUser : user
                    )
                    : []
            );
        },
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, Partial<User>>({
        mutationFn: (userData: any) => createUser(userData),
        onSuccess: (newUser: User) => {
            queryClient.setQueryData<User[]>(["users"], (oldData) =>
                oldData ? [newUser, ...oldData] : [newUser]
            );
        },
    });
};