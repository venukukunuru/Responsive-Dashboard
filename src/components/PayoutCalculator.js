import React, { useState } from "react";

const PayoutCalculator = ({ articles }) => {
  const [payoutRate, setPayoutRate] = useState(0);
  const totalPayout = articles.length * payoutRate;

  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-4">Payout Calculator</h2>
      <input
        type="number"
        value={payoutRate}
        onChange={(e) => setPayoutRate(e.target.value)}
        placeholder="Enter payout per article"
        className="border p-2 mb-4"
      />
      <div>Total Payout: ${totalPayout}</div>
    </div>
  );
};

export default PayoutCalculator;
