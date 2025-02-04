// list of all users
export const fetchUsers = async () => {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    if (!data.users) throw new Error("Users data not found");
    return data.users;
};

// Delete User by Id
export const deleteUserById = async (id) => {
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return id;
};

// Update User by Id
export const updateUserById = async (Id, userData) => {
    const response = await fetch(`https://dummyjson.com/users/${Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    return response.json();
};

// Create User
export const createUser = async (userData) => {
    const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
};