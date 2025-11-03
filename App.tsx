
import React, { useState, useCallback } from 'react';
import { StaffInfo, DeviceInfo } from './types';
import StaffForm from './components/StaffForm';
import DeviceForm from './components/DeviceForm';
import SignaturePad from './components/SignaturePad';
import LoanSummary from './components/LoanSummary';
import { generateLoanAgreement } from './services/geminiService';

const App: React.FC = () => {
  const initialStaffInfo = { name: '', employeeId: '', department: '' };
  const initialDeviceInfo = { type: '', serialNumber: '', model: '' };

  const [staffInfo, setStaffInfo] = useState<StaffInfo>(initialStaffInfo);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(initialDeviceInfo);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string>('');
  const [agreementText, setAgreementText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinalized, setIsFinalized] = useState<boolean>(false);

  const isFormValid = 
    staffInfo.name &&
    staffInfo.employeeId &&
    staffInfo.department &&
    deviceInfo.type &&
    deviceInfo.model &&
    deviceInfo.serialNumber &&
    signatureDataUrl;

  const handleGenerateAgreement = useCallback(async () => {
    if (!isFormValid) {
        setError('Please fill out all fields and provide a signature before generating the agreement.');
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const text = await generateLoanAgreement(staffInfo, deviceInfo);
      setAgreementText(text);
      setIsFinalized(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [staffInfo, deviceInfo, isFormValid]);

  const handleReset = () => {
    setStaffInfo(initialStaffInfo);
    setDeviceInfo(initialDeviceInfo);
    setSignatureDataUrl('');
    setAgreementText('');
    setError(null);
    setIsFinalized(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-slate-900">IT Equipment Loan System</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isFinalized ? (
            <div className="space-y-6">
                 <LoanSummary 
                    staffInfo={staffInfo}
                    deviceInfo={deviceInfo}
                    signatureDataUrl={signatureDataUrl}
                    agreementText={agreementText}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleReset}
                        className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create New Loan Form
                    </button>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <StaffForm staffInfo={staffInfo} setStaffInfo={setStaffInfo} />
                    <DeviceForm deviceInfo={deviceInfo} setDeviceInfo={setDeviceInfo} />
                </div>
                <div className="space-y-8">
                    <SignaturePad onSignatureChange={setSignatureDataUrl} />
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 text-slate-700">Finalize Agreement</h2>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <p className="text-sm text-gray-600 mb-4">
                            Once all details are entered and the signature is provided, you can generate the final loan agreement.
                        </p>
                        <button
                            onClick={handleGenerateAgreement}
                            disabled={!isFormValid || isLoading}
                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                                </>
                            ) : (
                                'Generate & Finalize Loan'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
