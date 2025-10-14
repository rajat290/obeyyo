
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  if (!isOpen) return null;

  const sizeChart = [
    { size: "XS", chest: "32-34", waist: "26-28", length: "25" },
    { size: "S", chest: "34-36", waist: "28-30", length: "26" },
    { size: "M", chest: "36-38", waist: "30-32", length: "27" },
    { size: "L", chest: "38-40", waist: "32-34", length: "28" },
    { size: "XL", chest: "40-42", waist: "34-36", length: "29" },
    { size: "XXL", chest: "42-44", waist: "36-38", length: "30" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Size Guide</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-2">How to Measure</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
              <li><strong>Waist:</strong> Measure around your natural waistline</li>
              <li><strong>Length:</strong> Measure from shoulder to hem</li>
            </ul>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium text-gray-800">Size</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-800">Chest (inches)</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-800">Waist (inches)</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-800">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size} className="border-b last:border-b-0">
                    <td className="py-2 px-2 font-medium">{row.size}</td>
                    <td className="py-2 px-2 text-gray-600">{row.chest}</td>
                    <td className="py-2 px-2 text-gray-600">{row.waist}</td>
                    <td className="py-2 px-2 text-gray-600">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All measurements are in inches. For the best fit, we recommend measuring yourself and comparing with our size chart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
