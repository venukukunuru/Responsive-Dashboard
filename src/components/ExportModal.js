import React from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

const ExportModal = ({ data }) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Payout Report', 10, 10);
    doc.text(JSON.stringify(data), 10, 20);
    doc.save('payout-report.pdf');
  };

  return (
    <div className="flex space-x-4">
      <button onClick={exportPDF} className="bg-red-500 text-white p-2 rounded">
        Export as PDF
      </button>
      <CSVLink data={data} className="bg-green-500 text-white p-2 rounded">
        Export as CSV
      </CSVLink>
    </div>
  );
};

export default ExportModal;
