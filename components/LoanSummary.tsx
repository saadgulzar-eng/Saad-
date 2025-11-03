
import React from 'react';
import { StaffInfo, DeviceInfo } from '../types';

interface LoanSummaryProps {
  staffInfo: StaffInfo;
  deviceInfo: DeviceInfo;
  signatureDataUrl: string;
  agreementText: string;
}

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

const LoanSummary: React.FC<LoanSummaryProps> = ({ staffInfo, deviceInfo, signatureDataUrl, agreementText }) => {
    const handlePrint = () => {
        window.print();
    };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md" id="printable-area">
      <div className="flex justify-between items-start mb-8">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">IT Equipment Loan Agreement</h2>
            <p className="text-sm text-slate-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <button
            onClick={handlePrint}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Print / Save PDF
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">Staff Details</h3>
          <dl className="space-y-3">
            <InfoRow label="Full Name" value={staffInfo.name} />
            <InfoRow label="Employee ID" value={staffInfo.employeeId} />
            <InfoRow label="Department" value={staffInfo.department} />
          </dl>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">Equipment Details</h3>
          <dl className="space-y-3">
            <InfoRow label="Device Type" value={deviceInfo.type} />
            <InfoRow label="Model" value={deviceInfo.model} />
            <InfoRow label="Serial Number" value={deviceInfo.serialNumber} />
          </dl>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">Terms and Conditions</h3>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{agreementText}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-3">Signature</h3>
        <div className="bg-slate-50 p-4 border rounded-md w-full md:w-1/2">
          {signatureDataUrl ? (
            <img src={signatureDataUrl} alt="Staff Signature" className="h-24" />
          ) : (
            <p className="text-slate-400">No signature provided.</p>
          )}
        </div>
        <div className="w-full md:w-1/2 border-t border-gray-900 mt-2 pt-1 text-sm text-gray-600">
            {staffInfo.name || "Signature of Recipient"}
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
