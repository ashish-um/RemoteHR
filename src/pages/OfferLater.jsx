import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const OfferLetter = () => {
  const [signatureName, setSignatureName] = useState('');
  const [signatureDate, setSignatureDate] = useState('');
  const [isOfferSigned, setIsOfferSigned] = useState(false);
  
  const signatureRef = useRef(null);
  const offerLetterRef = useRef(null);
  
  const clearSignature = () => {
    signatureRef.current?.clear();
  };
  
  const handleSignOffer = () => {
    if (signatureName && signatureDate && signatureRef.current?.isEmpty() === false) {
      setIsOfferSigned(true);
      alert('Offer accepted! Thank you for your acceptance.');
    } else {
      alert('Please complete all signature fields before signing.');
    }
  };
  
  const downloadPDF = async () => {
    if (!offerLetterRef.current) return;
    
    try {
      const canvas = await html2canvas(offerLetterRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('offer-letter.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="bg-gray-50  min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[90vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden" ref={offerLetterRef}>
        {/* Header */}
        <div className="bg-blue-700 p-6">
          <h1 className="text-3xl font-bold text-white">Offer of Employment</h1>
          <p className="text-blue-100 mt-2">We are delighted to welcome you to our team!</p>
        </div>
        
        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Job Details Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Job Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Position Information</h3>
                <div className="mt-3 space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Title:</span> Senior Software Engineer
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Department:</span> Engineering
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Reporting to:</span> Engineering Manager
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Start Date & Location</h3>
                <div className="mt-3 space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Start Date:</span> September 1, 2023
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Work Location:</span> San Francisco, CA
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Work Arrangement:</span> Hybrid (3 days in office)
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Compensation & Benefits Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Compensation & Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Compensation</h3>
                <div className="mt-3 space-y-3">
                  <p className="text-gray-600">
                    <span className="font-medium">Base Salary:</span> $150,000 per year
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Performance Bonus:</span> Up to 15% of base salary, based on individual and company performance
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Stock Options:</span> 10,000 shares vesting over 4 years with a 1-year cliff
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Benefits</h3>
                <div className="mt-3 space-y-3">
                  <p className="text-gray-600">
                    <span className="font-medium">Health Insurance:</span> Comprehensive medical, dental, and vision coverage
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">PTO Policy:</span> 20 days of paid time off per year plus company holidays
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">401(k):</span> 4% company match with immediate vesting
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Additional Benefits</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                <li>Professional development budget of $2,000 annually</li>
                <li>Flexible work hours</li>
                <li>Home office stipend of $1,000</li>
                <li>Wellness program including gym membership reimbursement</li>
              </ul>
            </div>
          </section>
          
          {/* Disclaimer Section */}
          <section className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Important Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This offer is contingent upon the successful completion of a background check, reference verification, 
              and proof of your eligibility to work in the United States. This document does not constitute an employment 
              contract, and your employment with the company will be at-will, meaning either you or the company may 
              terminate the employment relationship at any time with or without cause or notice.
            </p>
          </section>
          
          {/* Signature Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Accept Your Offer
            </h2>
            <p className="text-gray-600 mb-6">
              To accept this offer, please sign and date below. We look forward to having you join our team!
            </p>
            
            <div className="space-y-6">
              {/* Signature Box */}
              <div>
                <label htmlFor="signature" className="block text-md font-medium text-gray-700 mb-2">
                  Signature
                </label>
                <div className="border-2 border-gray-300 rounded-md p-2 h-40 bg-white">
                  <SignatureCanvas
                    ref={signatureRef}
                    penColor="black"
                    canvasProps={{
                      className: 'w-full h-full'
                    }}
                  />
                </div>
                <button
                  onClick={clearSignature}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear Signature
                </button>
              </div>
              
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-md font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your full legal name"
                />
              </div>
              
              {/* Date Selector */}
              <div>
                <label htmlFor="date" className="block text-md font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={signatureDate}
                  max={today}
                  onChange={(e) => setSignatureDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSignOffer}
                  disabled={isOfferSigned}
                  className={`px-6 py-3 rounded-md text-white font-medium flex-1 ${
                    isOfferSigned
                      ? 'bg-green-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                  }`}
                >
                  {isOfferSigned ? 'Offer Accepted ✓' : 'Sign & Accept Offer'}
                </button>
                <button
                  onClick={downloadPDF}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium focus:ring-4 focus:ring-gray-100 flex-1"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="mt-12 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>If you have any questions regarding this offer letter, please contact HR at hr@company.com</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;
