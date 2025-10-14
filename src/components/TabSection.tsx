
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface TabSectionProps {
  tabs: Array<{
    name: string;
    value: string;
    products: Array<{
      id: string;
      name: string;
      price: number;
      originalPrice?: number;
      rating: number;
      reviews: number;
      image: string;
      brand: string;
      isNew?: boolean;
      isTrending?: boolean;
    }>;
  }>;
}

const TabSection = ({ tabs }: TabSectionProps) => {
  const navigate = useNavigate();

  const handleTabClick = (tabValue: string) => {
    if (tabValue === "men") {
      navigate("/men");
    } else if (tabValue === "women") {
      navigate("/women");
    } else if (tabValue === "kids") {
      navigate("/kids");
    } else if (tabValue === "beauty") {
      navigate("/beauty");
    } else if (tabValue === "footwear") {
      navigate("/footwear");
    } else if (tabValue === "accessories") {
      navigate("/accessories");
    }
  };

  return (
    <section className="px-4 py-3 bg-white">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-auto grid-cols-6 h-9 bg-gray-100 rounded-lg p-0.5">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                onClick={() => handleTabClick(tab.value)}
                className="px-3 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-brand-red data-[state=active]:shadow-sm rounded-md transition-all"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="outline" size="sm" className="text-xs border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-lg px-3 py-1.5 ml-2">
            View All
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-0">
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabSection;
