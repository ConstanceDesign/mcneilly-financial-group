import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-50 py-18">
      <h1 className="text-4xl font-bold text-[#333] mb-10">Website Disclaimer</h1>
      
      <div className="grid grid-cols-1 gap-10 text-lg leading-relaxed text-[#333]">
      <div className="space-y-6">
      <p>
        The information provided on this website is for general informational purposes only and is not intended as financial, legal, or investment advice. While we strive to keep the information up-to-date and accurate, McNeilly Financial Group makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information, products, services, or related graphics contained on the website.
      </p>

      <p>
        Any reliance you place on such information is strictly at your own risk. We recommend consulting a qualified professional before making any financial decisions.
      </p>

      <p>
        McNeilly Financial Group shall not be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
      </p>

      <p>
        Through this website, you may be able to link to other websites that are not under the control of McNeilly Financial Group. We have no control over the nature, content, and availability of those sites and do not endorse the views expressed within them.
      </p>
    </div>
    </div>
    </div>
  );
};

export default Disclaimer;