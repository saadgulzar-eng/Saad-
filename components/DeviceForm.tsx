
import React from 'react';
import { DeviceInfo } from '../types';

interface DeviceFormProps {
  deviceInfo: DeviceInfo;
  setDeviceInfo: (info: DeviceInfo) => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ deviceInfo, setDeviceInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeviceInfo({ ...deviceInfo, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">IT Equipment Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Device Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={deviceInfo.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Laptop, Monitor"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={deviceInfo.model}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Dell XPS 15"
          />
        </div>
        <div>
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={deviceInfo.serialNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., SN-XYZ-123"
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceForm;
