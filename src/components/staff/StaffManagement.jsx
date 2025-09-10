"use client";

import { useState, useEffect } from "react";

export default function StaffManagement() {
    
    const [staff, setStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: 'BARBER',
        pin: ''
    });

    // this will run when the component/drawer first loads
    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await fetch('/api/users')
            const data = await response.json();
            setStaff(data)
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching staff:', error)
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if(response.ok) {
                console.log('Staff member added successfully!');
                //clear form and refresh list
                setFormData({ firstName: '', lastName: '', role: 'BARBER', pin: ''});
                setShowForm(false);
                fetchStaff();
            }
        } catch (error) {
            console.error('Error adding staff:', error);
        }
    };

    return(
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Staff Management</h2>

            <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : '+ Add New'}
            </button>

            {showForm && (
                <div className="border p-4 rounded-lg mb-4 bg-gray-50">
                    <h3 className="font-semibold mb-3">Add New Staff Member</h3>
                    <form className="space-y-4"
                    onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input 
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full p-2 border rounded"
                            required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full p-2 border rounded"
                            required>
                            </input>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <select 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                            >
                                <option value="BARBER">Barber</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">PIN (4 Digits)</label>
                            <input type="number"
                            value={formData.pin}
                            onChange={(e) => setFormData({...formData, pin: e.target.value})}
                            className="w-full p-2 mb-3 border rounded"
                            maxLength="4"
                            placeholder="1234"
                            min="0"
                            max="9999"
                            required
                            />

                            <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"                        
                            >
                                Add Staff Member
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isLoading ? (
                <p>Loading staff...</p>
            ) : (
                <div>
                    <p>Found {staff.length} staff members</p>
                    {staff.map((user) => (
                        <div key={user.id} className="border p-4 rounded-lg mb-2 flex justify-between items-center">
                            <div>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <p className="text-sm text-gray-600">
                                    {user.role} • PIN: {user.pin}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                                    Edit
                                </button>
                                <button className="px-3 px-1 bg-red-500 text-white rounded text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}