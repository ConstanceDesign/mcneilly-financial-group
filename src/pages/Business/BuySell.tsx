import BusinessLayout from '../../components/BusinessLayout';

const BusinessBuySell: React.FC = () => {
  return (
    <BusinessLayout pageTitle="Buy-Sell Agreement Funding">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Funding Buy-Sell Agreements</h1>
          <p className="mb-4">
            A Buy-Sell agreement funded with life insurance ensures that business ownership transitions smoothly if a partner passes away. It prevents financial strain and protects both your business and your heirs.
          </p>
          <p className="mb-4">
            Having life insurance and a written legal agreement in place is essential to maintaining stability for your business and family.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Ensures liquidity for business succession</li>
            <li>Prevents disputes among heirs and partners</li>
            <li>Preserves business operations without interruption</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img 
            src="/images/buy-sell-agreement.jpg" 
            alt="Business owners discussing succession plan" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessBuySell;