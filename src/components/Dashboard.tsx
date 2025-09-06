import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Bell, Smartphone, Car, MapPin } from "lucide-react";

const stats = [
  {
    title: "Alertes Actives",
    value: "8",
    change: "+2 cette semaine",
    icon: Bell,
    color: "text-primary"
  },
  {
    title: "Annonces Trouvées",
    value: "142",
    change: "+23 aujourd'hui",
    icon: TrendingUp,
    color: "text-success"
  },
  {
    title: "Smartphones",
    value: "5",
    change: "iPhone, Samsung...",
    icon: Smartphone,
    color: "text-warning"
  },
  {
    title: "Véhicules",
    value: "3",
    change: "Citroën, Peugeot...",
    icon: Car,
    color: "text-accent"
  },
];

const recentAlerts = [
  {
    id: 1,
    title: "iPhone 14 Pro - 899€",
    platform: "LeBonCoin",
    location: "Paris 75001",
    time: "Il y a 5min",
    price: "899€",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    title: "Citroën C3 - 12,500€",
    platform: "Facebook",
    location: "Lyon 69000", 
    time: "Il y a 12min",
    price: "12,500€",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 - 750€",
    platform: "Vinted",
    location: "Marseille 13000",
    time: "Il y a 18min", 
    price: "750€",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop"
  },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Alertes Récentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-4 p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
                <img 
                  src={alert.image} 
                  alt={alert.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {alert.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {alert.platform}
                    </Badge>
                    <MapPin className="h-3 w-3" />
                    <span>{alert.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-success">{alert.price}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};