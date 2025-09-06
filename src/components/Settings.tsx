import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Database, Bell, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Settings = () => {
  const [settings, setSettings] = useState({
    telegramEnabled: true,
    discordEnabled: false,
    telegramBotToken: "",
    telegramChatId: "",
    discordWebhook: "",
    scrapeInterval: 2,
    notifications: true,
    emailAlerts: false
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos paramètres ont été mis à jour avec succès"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Paramètres</h2>
        <p className="text-muted-foreground">Configurez votre service d'alertes</p>
      </div>

      {/* Supabase Integration Notice */}
      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <Database className="h-5 w-5" />
            <span>Intégration Backend Requise</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Pour activer les fonctionnalités de scraping automatique, notifications et stockage des données, 
            vous devez connecter votre projet à Supabase via l'intégration native de Lovable.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">🔍 Scraping automatique</Badge>
            <Badge variant="outline">📱 Notifications Telegram/Discord</Badge>
            <Badge variant="outline">💾 Base de données</Badge>
            <Badge variant="outline">🔐 Gestion des API keys</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Telegram */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <Label htmlFor="telegram">Telegram</Label>
              </div>
              <Switch
                id="telegram"
                checked={settings.telegramEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, telegramEnabled: checked }))}
              />
            </div>
            
            {settings.telegramEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <div className="space-y-2">
                  <Label htmlFor="telegramToken">Bot Token</Label>
                  <Input
                    id="telegramToken"
                    value={settings.telegramBotToken}
                    onChange={(e) => setSettings(prev => ({ ...prev, telegramBotToken: e.target.value }))}
                    placeholder="Sera configuré avec Supabase"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegramChat">Chat ID</Label>
                  <Input
                    id="telegramChat"
                    value={settings.telegramChatId}
                    onChange={(e) => setSettings(prev => ({ ...prev, telegramChatId: e.target.value }))}
                    placeholder="Sera configuré avec Supabase"
                    disabled
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Discord */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-indigo-500" />
                <Label htmlFor="discord">Discord</Label>
              </div>
              <Switch
                id="discord"
                checked={settings.discordEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, discordEnabled: checked }))}
              />
            </div>
            
            {settings.discordEnabled && (
              <div className="ml-6">
                <div className="space-y-2">
                  <Label htmlFor="discordWebhook">Webhook URL</Label>
                  <Input
                    id="discordWebhook"
                    value={settings.discordWebhook}
                    onChange={(e) => setSettings(prev => ({ ...prev, discordWebhook: e.target.value }))}
                    placeholder="Sera configuré avec Supabase"
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scraping Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-accent" />
            <span>Configuration du Scraping</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interval">Intervalle de scan (minutes)</Label>
              <Input
                id="interval"
                type="number"
                value={settings.scrapeInterval}
                onChange={(e) => setSettings(prev => ({ ...prev, scrapeInterval: parseInt(e.target.value) }))}
                min="1"
                max="60"
              />
              <p className="text-xs text-muted-foreground">Recommandé: 2-5 minutes</p>
            </div>
            
            <div className="space-y-2">
              <Label>Plateformes surveillées</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">LeBonCoin</Badge>
                <Badge variant="outline">Vinted</Badge>
                <Badge variant="outline">Facebook Marketplace</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <span>Sauvegarder les paramètres</span>
        </Button>
      </div>
    </div>
  );
};