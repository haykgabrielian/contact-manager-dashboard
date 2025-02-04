import React, { useState } from 'react';

interface ConfirmationProps {
    onCancel: () => void;
    onConfirm: (formData: { firstName: string; lastName: string; email: string }) => void;
    loading?: boolean;
    title: string;
    defaultValues?: { firstName: string; lastName: string; email: string };
}

const UserForm = ({ onCancel, onConfirm, loading, defaultValues, title }: ConfirmationProps) => {
    const [formData, setFormData] = useState(defaultValues || {
        firstName: '',
        lastName: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors = { firstName: '', lastName: '', email: '' };

        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required';
            valid = false;
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last Name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onConfirm(formData); // Send form data to the parent
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div id="crud-modal"
                 className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                 aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-lg">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-300">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button type="button" onClick={onCancel}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="firstName"
                                           className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input type="text" name="firstName" id="firstName"
                                           value={formData.firstName}
                                           onChange={handleChange}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                           placeholder="First name"/>
                                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="lastName"
                                           className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input type="text" name="lastName" id="lastName"
                                           value={formData.lastName}
                                           onChange={handleChange}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                           placeholder="Last name"/>
                                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" name="email" id="email"
                                           value={formData.email}
                                           onChange={handleChange}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                           placeholder="email address"/>
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                            </div>
                            <button onClick={handleSubmit}
                                    disabled={loading}
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                {!!loading ? 'Loading...' :  title}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
