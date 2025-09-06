import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit, Bell, MapPin, Euro, Smartphone, Car } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Alert {
  id: number;
  category: "smartphone" | "vehicle";
  model: string;
  maxPrice: number;
  location: string;
  platforms: string[];
  isActive: boolean;
  createdAt: Date;
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    category: "smartphone",
    model: "iPhone 14 Pro",
    maxPrice: 900,
    location: "Paris",
    platforms: ["LeBonCoin", "Vinted"],
    isActive: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: 2,
    category: "vehicle", 
    model: "Citroën C3",
    maxPrice: 15000,
    location: "Lyon",
    platforms: ["LeBonCoin", "Facebook"],
    isActive: true,
    createdAt: new Date("2024-01-10")
  },
  {
    id: 3,
    category: "smartphone",
    model: "Samsung Galaxy S24",
    maxPrice: 800,
    location: "Marseille",
    platforms: ["Vinted"],
    isActive: false,
    createdAt: new Date("2024-01-05")
  }
];

export const AlertManager = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    category: "smartphone" as "smartphone" | "vehicle",
    model: "",
    maxPrice: "",
    location: "",
    platforms: [] as string[]
  });

  const platforms = ["LeBonCoin", "Vinted", "Facebook"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.model || !formData.maxPrice || !formData.location || formData.platforms.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const newAlert: Alert = {
      id: editingAlert ? editingAlert.id : Date.now(),
      category: formData.category,
      model: formData.model,
      maxPrice: parseInt(formData.maxPrice),
      location: formData.location,
      platforms: formData.platforms,
      isActive: true,
      createdAt: editingAlert ? editingAlert.createdAt : new Date()
    };

    if (editingAlert) {
      setAlerts(alerts.map(alert => alert.id === editingAlert.id ? newAlert : alert));
      toast({
        title: "Alerte modifiée",
        description: "Votre alerte a été mise à jour avec succès"
      });
    } else {
      setAlerts([...alerts, newAlert]);
      toast({
        title: "Alerte créée",
        description: "Votre nouvelle alerte a été ajoutée"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      category: "smartphone",
      model: "",
      maxPrice: "",
      location: "",
      platforms: []
    });
    setShowForm(false);
    setEditingAlert(null);
  };

  const handleEdit = (alert: Alert) => {
    setFormData({
      category: alert.category,
      model: alert.model,
      maxPrice: alert.maxPrice.toString(),
      location: alert.location,
      platforms: alert.platforms
    });
    setEditingAlert(alert);
    setShowForm(true);
  };

  const handleDelete = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    toast({
      title: "Alerte supprimée",
      description: "L'alerte a été supprimée avec succès"
    });
  };

  const toggleAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        platforms: [...prev.platforms, platform]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        platforms: prev.platforms.filter(p => p !== platform)
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gestion des Alertes</h2>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle Alerte</span>
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAlert ? "Modifier l'alerte" : "Créer une nouvelle alerte"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value: "smartphone" | "vehicle") => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphone">📱 Smartphone</SelectItem>
                      <SelectItem value="vehicle">🚗 Véhicule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modèle recherché</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="ex: iPhone 14 Pro, Citroën C3..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Prix maximum (€)</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                    placeholder="ex: 900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="ex: Paris, Lyon, France..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Plateformes à surveiller</Label>
                <div className="flex space-x-4">
                  {platforms.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform}
                        checked={formData.platforms.includes(platform)}
                        onCheckedChange={(checked) => handlePlatformChange(platform, !!checked)}
                      />
                      <Label htmlFor={platform} className="text-sm">{platform}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingAlert ? "Mettre à jour" : "Créer l'alerte"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Alerts List */}
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`transition-all ${alert.isActive ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/50'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {alert.category === "smartphone" ? (
                      <Smartphone className="h-5 w-5 text-primary" />
                    ) : (
                      <Car className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{alert.model}</h3>
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Euro className="h-3 w-3" />
                        <span>Max {alert.maxPrice}€</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {alert.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAlert(alert.id)}
                    className="flex items-center space-x-1"
                  >
                    <Bell className={`h-4 w-4 ${alert.isActive ? 'text-success' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(alert)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(alert.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};