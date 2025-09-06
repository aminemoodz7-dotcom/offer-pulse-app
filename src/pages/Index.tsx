import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { AlertManager } from "@/components/AlertManager";
import { Settings } from "@/components/Settings";
import heroImage from "@/assets/hero-alerts.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "alerts":
        return <AlertManager />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Hero Section (only on dashboard) */}
      {activeTab === "dashboard" && (
        <div className="relative h-48 bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden">
          <img 
            src={heroImage} 
            alt="AlerteAchat Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-foreground">
              <h1 className="text-3xl font-bold mb-2">AlerteAchat MVP</h1>
              <p className="text-lg text-muted-foreground">
                Service d'alertes pour smartphones et véhicules
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
