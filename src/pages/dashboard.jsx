import React from 'react';

const Dashboard = () => {
  // Mock user data - would typically come from props or state
  const userData = {
    name: "John Smith",
    progress: 2,
    totalSteps: 4,
    hrContact: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    tasks: {
      personalInfo: 75,
      bankDetails: 30,
      itSetup: 50
    },
    documents: {
      offerLetter: "Signed",
      idCard: "Pending",
      addressProof: "Missing"
    },
    daysRemaining: 3
  };

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'signed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'missing': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const steps = [
    { name: "Welcome", completed: true },
    { name: "Offer Letter", completed: true },
    { name: "Verification", completed: false, active: true },
    // { name: "Tasks", completed: false },
    { name: "Complete", completed: false }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {userData.name}!</h1>
              <p className="text-gray-500 mt-1">We're excited to have you on board.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Step {userData.progress} of {userData.totalSteps} Completed</p>
              <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-2 bg-blue-500 rounded-full" 
                  style={{width: `${(userData.progress / userData.totalSteps) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center ${step.active ? 'text-blue-600 font-medium' : step.completed ? 'text-green-500' : 'text-gray-400'}`}
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  step.active ? 'border-blue-600 text-blue-600' : 
                  step.completed ? 'border-green-500 bg-green-500 text-white' : 
                  'border-gray-300 text-gray-300'
                }`}>
                  {step.completed ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="mt-2 text-sm">{step.name}</span>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute left-0 w-full h-0.5 bg-gray-200 -z-10" style={{top: '2.25rem'}}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Identity Verification Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Identity Verification</h3>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Complete your identity verification to proceed with onboarding</p>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out">
              Start Now
            </button>
          </div>

          {/* Deadline Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Deadline</h3>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">Complete all verification steps before:</p>
            <div className="flex items-center mt-2">
              <div className="px-3 py-1 bg-red-100 text-red-700 rounded-md font-medium">
                {userData.daysRemaining} Days Remaining
              </div>
            </div>
          </div>

          {/* HR Contact Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Your HR Contact</h3>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img 
                src={userData.hrContact.avatar} 
                alt="HR Contact" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-800">{userData.hrContact.name}</p>
                <p className="text-sm text-gray-500">HR Manager</p>
              </div>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send Message
            </a>
          </div>
        </div>

        {/* Two Column Layout for Tasks and Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Status Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Status</h3>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Personal Information</span>
                <span className="text-sm font-medium text-gray-700">{userData.tasks.personalInfo}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${userData.tasks.personalInfo}%`}}></div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Bank Details</span>
                <span className="text-sm font-medium text-gray-700">{userData.tasks.bankDetails}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${userData.tasks.bankDetails}%`}}></div>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">IT Setup</span>
                <span className="text-sm font-medium text-gray-700">{userData.tasks.itSetup}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${userData.tasks.itSetup}%`}}></div>
              </div>
            </div>
          </div>

          {/* Documents Status Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-700">Offer Letter</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userData.documents.offerLetter)} bg-opacity-20 text-green-800`}>
                  {userData.documents.offerLetter}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-700">ID Card</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userData.documents.idCard)} bg-opacity-20 text-yellow-800`}>
                  {userData.documents.idCard}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-700">Address Proof</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userData.documents.addressProof)} bg-opacity-20 text-red-800`}>
                  {userData.documents.addressProof}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
