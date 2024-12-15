import React, { useEffect } from 'react';
import Logo from '../../images/logo.jpg';
import { navigate } from 'gatsby';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { PostLogin } from '../../libs/api';
import Layout from '../layout';

const Page = () => {
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: async (values) => {
            try {
                if (!values.password) {
                    throw new Error('Password is empty');
                }

                const { data } = await PostLogin(values.password);
                if (data.success) {
                    if (data.role !== 'admin') {
                        sessionStorage.setItem('user', JSON.stringify({
                            role: data.role,
                        }));

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.message,
                            timer: 1000,
                            timerProgressBar: true,
                        }).then(() => {
                            const routes = {
                                kelas_10: '/kelas-10/menu',
                                kelas_11: '/kelas-11/menu',
                            };
                            navigate(routes[data.role]);
                        });
                    } else {
                        return
                    }
                } else {
                    throw new Error(data?.error ?? 'An unexpected error occurred');
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            }
        },
    });

    return (
        <Layout>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="m-2 w-full max-w-sm p-8 space-y-8 bg-white shadow-lg rounded-lg">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="mx-auto"
                        width={150}
                        height={150}
                    />
                    <h2 className="text-2xl font-semibold text-center">Masukkan Password</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                onChange={handleChange}
                                value={values.password}
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-red-700 rounded-md hover:bg-indigo-700">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Page;