
import React from 'react';
import { StaffInfo } from '../types';

interface StaffFormProps {
  staffInfo: StaffInfo;
  setStaffInfo: (info: StaffInfo) => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ staffInfo, setStaffInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaffInfo({ ...staffInfo, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Staff Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={staffInfo.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={staffInfo.employeeId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 12345"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={staffInfo.department}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Marketing"
          />
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
