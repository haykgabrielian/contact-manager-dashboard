import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

interface ConfirmationProps {
    onCancel: () => void;
    onConfirm: (formData: { firstName: string; lastName: string; email: string }) => void;
    loading?: boolean;
    title: string;
    defaultValues?: { firstName: string; lastName: string; email: string };
}

const userSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
})

type User = z.infer<typeof userSchema>

const UserForm = ({ onCancel, onConfirm, loading, defaultValues, title }: ConfirmationProps) => {
    const form = useForm({
        defaultValues: {
            firstName: defaultValues?.firstName || '',
            lastName: defaultValues?.lastName || '',
            email: defaultValues?.email || '',
        } as User,
        onSubmit: async ({ value }) => {
            onConfirm(value);
        },
        validatorAdapter: zodValidator(),
        validators: {
            onChange: userSchema,
        },
    })

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
                        <form className="p-4 md:p-5"
                            onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                form.handleSubmit()
                            }}
                        >
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">First
                                        Name</label>
                                    <form.Field name="firstName">
                                        {(field) => (
                                            <>
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                    placeholder="First name"
                                                />
                                                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                                                    <p className="text-red-500 text-sm">{field.state.meta.errors.join(',')}</p>
                                                ) : null}
                                            </>
                                        )}
                                    </form.Field>
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Last
                                        Name</label>
                                    <form.Field name="lastName">
                                        {(field) => (
                                            <>
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                    placeholder="Last name"
                                                />
                                                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                                                    <p className="text-red-500 text-sm">{field.state.meta.errors.join(',')}</p>
                                                ) : null}
                                            </>
                                        )}
                                    </form.Field>
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <form.Field name="email">
                                        {(field) => (
                                            <>
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="email"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                    placeholder="Email address"
                                                />
                                                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                                                    <p className="text-red-500 text-sm">{field.state.meta.errors.join(',')}</p>
                                                ) : null}
                                            </>
                                        )}
                                    </form.Field>
                                </div>
                            </div>
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        {isSubmitting || loading ? 'Loading...' : 'Submit'}
                                    </button>
                                )}
                            </form.Subscribe>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;