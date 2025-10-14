
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Image, Upload, MoveUp, MoveDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CarouselImage {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  section: string;
  order_index: number;
  is_active: boolean | null;
}

const CarouselManagement = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("home");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    link_url: "",
    section: "home",
    order_index: 0,
    is_active: true,
  });

  // Mock data for demonstration
  const mockCarouselImages: CarouselImage[] = [
    {
      id: "1",
      title: "Summer Collection 2024",
      subtitle: "Up to 50% off on latest trends",
      image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      link_url: "/summer-collection",
      section: "home",
      order_index: 1,
      is_active: true
    },
    {
      id: "2",
      title: "Men's Fashion Week",
      subtitle: "Exclusive designer wear",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      link_url: "/mens-fashion",
      section: "men",
      order_index: 1,
      is_active: true
    },
    {
      id: "3",
      title: "Women's Style Guide",
      subtitle: "Trendy outfits for every occasion",
      image_url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
      link_url: "/womens-style",
      section: "women",
      order_index: 1,
      is_active: true
    }
  ];

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const fetchCarouselImages = async () => {
    try {
      // In a real implementation, this would fetch from Supabase
      setCarouselImages(mockCarouselImages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        image_url: formData.image_url,
        link_url: formData.link_url || null,
        section: formData.section,
        order_index: formData.order_index,
        is_active: formData.is_active,
      };

      if (editingImage) {
        // Update existing image
        setCarouselImages(prev => prev.map(img => 
          img.id === editingImage.id ? { ...img, ...imageData } : img
        ));
      } else {
        // Add new image
        const newImage: CarouselImage = {
          id: Date.now().toString(),
          ...imageData,
        };
        setCarouselImages(prev => [...prev, newImage]);
      }

      toast({
        title: "Success",
        description: `Carousel image ${editingImage ? "updated" : "created"} successfully`,
      });

      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: CarouselImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      subtitle: image.subtitle || "",
      image_url: image.image_url,
      link_url: image.link_url || "",
      section: image.section,
      order_index: image.order_index,
      is_active: image.is_active || false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this carousel image?")) return;

    try {
      setCarouselImages(prev => prev.filter(img => img.id !== id));

      toast({
        title: "Success",
        description: "Carousel image deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const moveImage = (id: string, direction: 'up' | 'down') => {
    const currentImages = carouselImages.filter(img => img.section === selectedSection);
    const imageIndex = currentImages.findIndex(img => img.id === id);
    
    if (
      (direction === 'up' && imageIndex === 0) ||
      (direction === 'down' && imageIndex === currentImages.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? imageIndex - 1 : imageIndex + 1;
    const updatedImages = [...currentImages];
    [updatedImages[imageIndex], updatedImages[newIndex]] = [updatedImages[newIndex], updatedImages[imageIndex]];

    // Update order_index for both images
    updatedImages[imageIndex].order_index = imageIndex + 1;
    updatedImages[newIndex].order_index = newIndex + 1;

    setCarouselImages(prev => prev.map(img => {
      const updatedImg = updatedImages.find(ui => ui.id === img.id);
      return updatedImg || img;
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      image_url: "",
      link_url: "",
      section: "home",
      order_index: 0,
      is_active: true,
    });
    setEditingImage(null);
    setShowForm(false);
  };

  const filteredImages = carouselImages
    .filter(img => img.section === selectedSection)
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Carousel Management</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#FF6B9D] to-[#4A90E2]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Carousel Image
        </Button>
      </div>

      {/* Section Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="section-filter">Section:</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Page</SelectItem>
                <SelectItem value="men">Men Section</SelectItem>
                <SelectItem value="women">Women Section</SelectItem>
                <SelectItem value="kids">Kids Section</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingImage ? "Edit Carousel Image" : "Add New Carousel Image"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link_url">Link URL</Label>
                  <Input
                    id="link_url"
                    type="url"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="https://example.com/link"
                  />
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) => setFormData({ ...formData, section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Page</SelectItem>
                      <SelectItem value="men">Men Section</SelectItem>
                      <SelectItem value="women">Women Section</SelectItem>
                      <SelectItem value="kids">Kids Section</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : (editingImage ? "Update Image" : "Add Image")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Carousel Images - {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</CardTitle>
          <CardDescription>Manage carousel images for the selected section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{image.title}</h3>
                  {image.subtitle && (
                    <p className="text-sm text-gray-600">{image.subtitle}</p>
                  )}
                  {image.link_url && (
                    <p className="text-xs text-blue-600">{image.link_url}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    image.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {image.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveImage(image.id, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveImage(image.id, 'down')}
                    disabled={index === filteredImages.length - 1}
                  >
                    <MoveDown className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(image)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(image.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselManagement;
