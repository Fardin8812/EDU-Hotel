import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PaymentForm({ formData, onChange }: PaymentFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={onChange}
              required
              maxLength={16}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[maroon] focus:ring-[maroon] pl-10"
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={onChange}
              placeholder="MM/YY"
              required
              maxLength={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[maroon] focus:ring-[maroon]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={onChange}
              required
              maxLength={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[maroon] focus:ring-[maroon]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}