
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  className?: string;
}

const SectionHeader = ({ title, viewAllLink = "#", className = "" }: SectionHeaderProps) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#4A90E2] bg-clip-text text-transparent">
        {title}
      </h2>
      <Link to={viewAllLink}>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FF6B9D] hover:text-white rounded-lg text-xs px-3 py-1.5"
        >
          View All
        </Button>
      </Link>
    </div>
  );
};

export default SectionHeader;
