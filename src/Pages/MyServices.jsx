
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

const MyServices = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    // Get authenticated user email
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserEmail(user?.email || '');
        });
        return () => unsubscribe();
    }, []);

    // Fetch services created by the logged-in user
    const fetchServices = async () => {
        if (!userEmail) return;
        setLoading(true);
        try {
            const response = await fetch(`https://service-review-server-swart.vercel.app/my-services?email=${userEmail}&search=${search}`);
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
        setLoading(false);
    };

    // Handle service deletion
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this service!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://service-review-server-swart.vercel.app/delete-service/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (data.success) {
                    Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
                    fetchServices();
                } else {
                    Swal.fire('Error!', 'Failed to delete service.', 'error');
                }
            } catch (error) {
                console.error('Error deleting service:', error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    // Handle service update
    const handleUpdate = async () => {
        if (!selectedService || !updatedData) return;
        try {
            const response = await fetch(`https://service-review-server-swart.vercel.app/update-service/${selectedService._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (data.success) {
                Swal.fire('Updated!', 'Your service has been updated.', 'success');
                setSelectedService(null);
                fetchServices();
            } else {
                Swal.fire('Error!', 'Failed to update service.', 'error');
            }
        } catch (error) {
            console.error('Error updating service:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    useEffect(() => {
        fetchServices();
    }, [userEmail, search]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    className="input input-bordered w-full max-w-md mx-auto"
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Services Table */}
            {loading ? (
                <p className="text-center text-lg">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td>{service.courseTitle}</td>
                                    <td>{service.category}</td>
                                    <td>${service.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={() => setSelectedService(service)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDelete(service._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Update Service Modal */}
            {selectedService && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-2xl font-bold mb-4">Update Service</h2>
                        <div className="form-control mb-4">
                            <label className="label">Title</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                defaultValue={selectedService.courseTitle}
                                onChange={(e) =>
                                    setUpdatedData({ ...updatedData, courseTitle: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">Category</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                defaultValue={selectedService.category}
                                onChange={(e) =>
                                    setUpdatedData({ ...updatedData, category: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">Price</label>
                            <input
                                type="number"
                                className="input input-bordered"
                                defaultValue={selectedService.price}
                                onChange={(e) =>
                                    setUpdatedData({ ...updatedData, price: e.target.value })
                                }
                            />
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-success" onClick={handleUpdate}>
                                Save Changes
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => setSelectedService(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyServices;
