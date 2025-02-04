import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, deleteUserById, updateUserById } from "../api/usersApi";

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 60000,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId) => deleteUserById(userId),
        onSuccess: (id) => {
            queryClient.setQueryData(["users"], (oldData) =>
                oldData ? oldData.filter((user) => user.id !== id) : []
            );
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, userData }) => updateUserById(userId, userData),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["users"], (oldData) =>
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

    return useMutation({
        mutationFn: (userData) => createUser(userData),
        onSuccess: (newUser) => {
            queryClient.setQueryData(["users"], (oldData) =>
                oldData ? [newUser, ...oldData] : [newUser]
            );
        },
    });
};
