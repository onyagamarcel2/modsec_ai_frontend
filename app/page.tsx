"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  AlertTriangle,
  Activity,
  TrendingUp,
  Settings,
  BarChart3,
  FileText,
  Brain,
  Database,
  HelpCircle,
  Moon,
  Sun,
  Bell,
  Search,
  Play,
  Pause,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Globe,
  Cpu,
  HardDrive,
  MemoryStick,
  Target,
  GitBranch,
  Save,
  RotateCcw,
  Calendar,
  PieChart,
  LineChart,
  MapPin,
  TestTube,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react"

// Données simulées
const kpiData = {
  totalAnomalies: 1247,
  falsePositiveRate: 12.3,
  rulesGenerated: 89,
  systemStatus: "running",
}

const recentAlerts = [
  { id: 1, type: "SQL Injection", severity: "high", time: "2 min ago", ip: "192.168.1.100" },
  { id: 2, type: "XSS Attempt", severity: "medium", time: "5 min ago", ip: "10.0.0.45" },
  { id: 3, type: "Directory Traversal", severity: "high", time: "8 min ago", ip: "172.16.0.23" },
  { id: 4, type: "Command Injection", severity: "critical", time: "12 min ago", ip: "203.0.113.5" },
]

const anomalyTrend = [
  { time: "00:00", count: 23 },
  { time: "04:00", count: 18 },
  { time: "08:00", count: 45 },
  { time: "12:00", count: 67 },
  { time: "16:00", count: 89 },
  { time: "20:00", count: 34 },
]

const anomaliesData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:25",
    type: "SQL Injection",
    severity: "critical",
    ip: "192.168.1.100",
    score: 0.95,
    status: "pending",
    request: "GET /admin?id=1' OR '1'='1",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:28:12",
    type: "XSS",
    severity: "high",
    ip: "10.0.0.45",
    score: 0.87,
    status: "validated",
    request: "POST /comment <script>alert('xss')</script>",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:25:33",
    type: "Directory Traversal",
    severity: "medium",
    ip: "172.16.0.23",
    score: 0.72,
    status: "false_positive",
    request: "GET /files/../../../etc/passwd",
  },
]

const rulesData = [
  {
    id: 1,
    name: "SQL Injection Protection",
    description: "Détecte les tentatives d'injection SQL",
    status: "active",
    creator: "Admin",
    created: "2024-01-10",
    category: "Injection",
  },
  {
    id: 2,
    name: "XSS Prevention",
    description: "Bloque les scripts malveillants",
    status: "active",
    creator: "Security Team",
    created: "2024-01-08",
    category: "XSS",
  },
  {
    id: 3,
    name: "Path Traversal Block",
    description: "Empêche l'accès aux fichiers système",
    status: "test",
    creator: "Admin",
    created: "2024-01-12",
    category: "Traversal",
  },
]

const modelsData = [
  {
    id: 1,
    name: "Isolation Forest v2.1",
    type: "Anomaly Detection",
    accuracy: 94.2,
    created: "2024-01-10",
    status: "active",
    size: "12.5 MB",
  },
  {
    id: 2,
    name: "LOF Detector v1.8",
    type: "Outlier Detection",
    accuracy: 89.7,
    created: "2024-01-08",
    status: "inactive",
    size: "8.3 MB",
  },
  {
    id: 3,
    name: "OCSVM Model v3.0",
    type: "Classification",
    accuracy: 91.5,
    created: "2024-01-12",
    status: "training",
    size: "15.2 MB",
  },
]

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")
  const [isDark, setIsDark] = useState(true)
  const [isMonitoring, setIsMonitoring] = useState(true)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500"
      case "high": return "bg-orange-500"
      case "medium": return "bg-yellow-500"
      case "low": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive"
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600"
      case "inactive": return "text-gray-500"
      case "test": return "text-yellow-600"
      case "training": return "text-blue-600"
      default: return "text-gray-500"
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#3BA5E4]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Anomalies Détectées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#3BA5E4]">{kpiData.totalAnomalies.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#F4B400]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux Faux Positifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F4B400]">{kpiData.falsePositiveRate}%</div>
            <p className="text-xs text-muted-foreground">-2.1% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Règles Générées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData.rulesGenerated}</div>
            <p className="text-xs text-muted-foreground">+5 cette semaine</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Statut Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">En Ligne</span>
            </div>
            <p className="text-xs text-muted-foreground">Uptime: 99.9%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#3BA5E4]" />
              <span>Tendance des Anomalies (24h)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anomalyTrend.map((point, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground w-12">{point.time}</span>
                  <div className="flex-1">
                    <Progress value={(point.count / 100) * 100} className="h-2" />
                  </div>
                  <span className="text-sm font-medium w-8">{point.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#F4B400]" />
              <span>Alertes Récentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                    <div>
                      <p className="font-medium text-sm">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.ip}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getSeverityBadgeVariant(alert.severity)} className="mb-1">
                      {alert.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#3BA5E4]" />
            <span>Performance Système</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mémoire</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Stockage</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMonitoring = () => (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-[#3BA5E4]" />
              <span>Monitoring en Temps Réel</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsMonitoring(!isMonitoring)}>
                {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isMonitoring ? "Pause" : "Démarrer"}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3BA5E4]">1,247</div>
              <p className="text-sm text-muted-foreground">Requêtes/min</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F4B400]">23</div>
              <p className="text-sm text-muted-foreground">Anomalies/min</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <p className="text-sm text-muted-foreground">Disponibilité</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12ms</div>
              <p className="text-sm text-muted-foreground">Latence moy.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Flux de Logs en Direct</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
            <div className="space-y-1">
              <div>[2024-01-15 14:30:25] INFO: Request processed - GET /api/users - 200 OK</div>
              <div className="text-red-400">[2024-01-15 14:30:26] ALERT: Anomaly detected - SQL Injection attempt from 192.168.1.100</div>
              <div>[2024-01-15 14:30:27] INFO: Request processed - POST /login - 200 OK</div>
              <div className="text-yellow-400">[2024-01-15 14:30:28] WARN: High request rate from 10.0.0.45</div>
              <div>[2024-01-15 14:30:29] INFO: Request processed - GET /dashboard - 200 OK</div>
              <div className="text-red-400">[2024-01-15 14:30:30] ALERT: XSS attempt detected from 172.16.0.23</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trafic en Temps Réel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end space-x-2">
              {[45, 67, 23, 89, 34, 56, 78, 45, 67, 89].map((height, index) => (
                <div key={index} className="bg-[#3BA5E4] flex-1 rounded-t" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détections par Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">SQL Injection</span>
                <div className="flex items-center space-x-2">
                  <Progress value={65} className="w-24 h-2" />
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">XSS</span>
                <div className="flex items-center space-x-2">
                  <Progress value={25} className="w-24 h-2" />
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Directory Traversal</span>
                <div className="flex items-center space-x-2">
                  <Progress value={10} className="w-24 h-2" />
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAnomalies = () => (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#F4B400]" />
              <span>Gestion des Anomalies</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sévérités</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="validated">Validé</SelectItem>
                <SelectItem value="false_positive">Faux positif</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Rechercher par IP..." className="w-48" />
          </div>
        </CardContent>
      </Card>

      {/* Anomalies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>IP Source</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomaliesData.map((anomaly) => (
                <TableRow key={anomaly.id}>
                  <TableCell className="font-mono text-sm">{anomaly.timestamp}</TableCell>
                  <TableCell>{anomaly.type}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityBadgeVariant(anomaly.severity)}>
                      {anomaly.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{anomaly.ip}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={anomaly.score * 100} className="w-16 h-2" />
                      <span className="text-sm">{anomaly.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={anomaly.status === "validated" ? "default" : anomaly.status === "false_positive" ? "secondary" : "outline"}>
                      {anomaly.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Anomaly Details */}
      <Card>
        <CardHeader>
          <CardTitle>Détails de l'Anomalie Sélectionnée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Requête HTTP</Label>
                <Textarea value="GET /admin?id=1' OR '1'='1" readOnly className="mt-1 font-mono" />
              </div>
              <div>
                <Label className="text-sm font-medium">Headers</Label>
                <Textarea value="User-Agent: Mozilla/5.0..." readOnly className="mt-1 font-mono" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Règles Déclenchées</Label>
                <div className="mt-1 space-y-2">
                  <Badge variant="outline">SQL_INJECTION_001</Badge>
                  <Badge variant="outline">UNION_SELECT_DETECT</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Actions</Label>
                <div className="mt-1 space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider
                  </Button>
                  <Button size="sm" variant="outline">
                    <XCircle className="w-4 h-4 mr-2" />
                    Faux Positif
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRules = () => (
    <div className="space-y-6">
      {/* Rules Management Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#3BA5E4]" />
              <span>Gestion des Règles ModSecurity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Règle
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Input placeholder="Rechercher une règle..." className="w-64" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="test">Test</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="injection">Injection</SelectItem>
                <SelectItem value="xss">XSS</SelectItem>
                <SelectItem value="traversal">Traversal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Règles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Créateur</TableHead>
                <TableHead>Date Création</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rulesData.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-mono">{rule.id}</TableCell>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell>
                    <Badge variant={rule.status === "active" ? "default" : rule.status === "test" ? "secondary" : "outline"}>
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{rule.category}</TableCell>
                  <TableCell>{rule.creator}</TableCell>
                  <TableCell>{rule.created}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TestTube className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rule Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Éditeur de Règles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule-name">Nom de la Règle</Label>
                <Input id="rule-name" placeholder="Nom de la règle..." />
              </div>
              <div>
                <Label htmlFor="rule-desc">Description</Label>
                <Textarea id="rule-desc" placeholder="Description de la règle..." />
              </div>
              <div>
                <Label htmlFor="rule-category">Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="injection">Injection</SelectItem>
                    <SelectItem value="xss">XSS</SelectItem>
                    <SelectItem value="traversal">Traversal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule-content">Contenu de la Règle</Label>
                <Textarea 
                  id="rule-content" 
                  className="font-mono h-32" 
                  placeholder="SecRule ARGS &quot;@detectSQLi&quot; \&#10;    &quot;id:1001,&#10;     phase:2,&#10;     block,&#10;     msg:'SQL Injection Attack Detected',&#10;     logdata:'Matched Data: %{MATCHED_VAR} found within %{MATCHED_VAR_NAME}',&#10;     tag:'application-multi',&#10;     tag:'language-multi',&#10;     tag:'platform-multi',&#10;     tag:'attack-sqli'&quot;"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
                <Button variant="outline">
                  <TestTube className="w-4 h-4 mr-2" />
                  Tester
                </Button>
                <Button variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPhases = () => (
    <div className="space-y-6">
      {/* Phase Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[#3BA5E4]" />
            <span>Configuration Mode Deux Phases</span>
          </CardTitle>
          <CardDescription>
            Configurez les paramètres de détection pour les phases initiale et d'apprentissage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phase1" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phase1">Phase Initiale</TabsTrigger>
              <TabsTrigger value="phase2">Phase d'Apprentissage</TabsTrigger>
            </TabsList>
            <TabsContent value="phase1" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="threshold1">Seuil de Détection</Label>
                    <Input id="threshold1" type="number" defaultValue="0.8" step="0.1" min="0" max="1" />
                  </div>
                  <div>
                    <Label htmlFor="sensitivity1">Sensibilité</Label>
                    <Input id="sensitivity1" type="number" defaultValue="0.9" step="0.1" min="0" max="1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-rules1" />
                    <Label htmlFor="auto-rules1">Génération automatique de règles</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="algorithm1">Algorithme</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un algorithme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="isolation-forest">Isolation Forest</SelectItem>
                        <SelectItem value="lof">Local Outlier Factor</SelectItem>
                        <SelectItem value="ocsvm">One-Class SVM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="window1">Fenêtre d'Analyse (minutes)</Label>
                    <Input id="window1" type="number" defaultValue="60" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="phase2" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="threshold2">Seuil de Détection</Label>
                    <Input id="threshold2" type="number" defaultValue="0.7" step="0.1" min="0" max="1" />
                  </div>
                  <div>
                    <Label htmlFor="sensitivity2">Sensibilité</Label>
                    <Input id="sensitivity2" type="number" defaultValue="0.8" step="0.1" min="0" max="1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-retrain" defaultChecked />
                    <Label htmlFor="auto-retrain">Réentraînement automatique</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retrain-freq">Fréquence de Réentraînement</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la fréquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Quotidien</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="training-size">Taille du Dataset d'Entraînement</Label>
                    <Input id="training-size" type="number" defaultValue="10000" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparaison des Performances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3BA5E4]">94.2%</div>
              <p className="text-sm text-muted-foreground">Précision Phase 1</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F4B400]">97.8%</div>
              <p className="text-sm text-muted-foreground">Précision Phase 2</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+3.6%</div>
              <p className="text-sm text-muted-foreground">Amélioration</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Faux Positifs</span>
                <span>Phase 1: 12.3% → Phase 2: 8.7%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Faux Négatifs</span>
                <span>Phase 1: 5.8% → Phase 2: 2.2%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#3BA5E4]" />
            <span>Générateur de Rapports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="report-type">Type de Rapport</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security">Rapport de Sécurité</SelectItem>
                    <SelectItem value="performance">Rapport de Performance</SelectItem>
                    <SelectItem value="anomalies">Rapport d'Anomalies</SelectItem>
                    <SelectItem value="custom">Rapport Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="period">Période</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last24h">Dernières 24h</SelectItem>
                    <SelectItem value="last7d">7 derniers jours</SelectItem>
                    <SelectItem value="last30d">30 derniers jours</SelectItem>
                    <SelectItem value="custom">Période personnalisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="format">Format d'Export</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-charts" defaultChecked />
                <Label htmlFor="include-charts">Inclure les graphiques</Label>
              </div>
            </div>
            <div className="space-y-4">
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Générer le Rapport
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Planifier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-[#3BA5E4]" />
              <span>Répartition des Menaces</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">SQL Injection</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-red-500 rounded"></div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">XSS</span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-2 bg-orange-500 rounded"></div>
                  <span className="text-sm font-medium">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Directory Traversal</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-2 bg-yellow-500 rounded"></div>
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Autres</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-2 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#F4B400]" />
              <span>Origine Géographique</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">🇺🇸 États-Unis</span>
                <span className="text-sm font-medium">234 attaques</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🇨🇳 Chine</span>
                <span className="text-sm font-medium">189 attaques</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🇷🇺 Russie</span>
                <span className="text-sm font-medium">156 attaques</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🇧🇷 Brésil</span>
                <span className="text-sm font-medium">98 attaques</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="w-5 h-5 text-[#3BA5E4]" />
            <span>Analyse des Tendances</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end space-x-2">
            {[23, 45, 67, 34, 89, 56, 78, 45, 67, 89, 34, 56, 78, 45].map((height, index) => (
              <div key={index} className="bg-gradient-to-t from-[#3BA5E4] to-[#F4B400] flex-1 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Jan</span>
            <span>Fév</span>
            <span>Mar</span>
            <span>Avr</span>
            <span>Mai</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aoû</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Déc</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBenchmark = () => (
    <div className="space-y-6">
      {/* Algorithm Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-[#3BA5E4]" />
            <span>Comparaison des Algorithmes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-[#3BA5E4]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Isolation Forest</CardTitle>
                <Badge variant="default">Recommandé</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Précision</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rappel</span>
                    <span className="font-medium">91.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">F1-Score</span>
                    <span className="font-medium">93.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Temps</span>
                    <span className="font-medium">12ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">LOF</CardTitle>
                <Badge variant="secondary">Alternative</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Précision</span>
                    <span className="font-medium">89.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rappel</span>
                    <span className="font-medium">87.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">F1-Score</span>
                    <span className="font-medium">88.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Temps</span>
                    <span className="font-medium">18ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">One-Class SVM</CardTitle>
                <Badge variant="outline">Expérimental</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Précision</span>
                    <span className="font-medium">91.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rappel</span>
                    <span className="font-medium">88.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">F1-Score</span>
                    <span className="font-medium">90.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Temps</span>
                    <span className="font-medium">25ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="w-5 h-5 text-[#F4B400]" />
            <span>Tests A/B en Cours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Test: Isolation Forest vs LOF</h4>
                <Badge variant="outline">En cours</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Groupe A (Isolation Forest)</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Détections</span>
                      <span>1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Faux Positifs</span>
                      <span>89 (7.1%)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Groupe B (LOF)</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Détections</span>
                      <span>1,198</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Faux Positifs</span>
                      <span>134 (11.2%)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Progression: 65% (3 jours restants)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-[#3BA5E4]" />
            <span>Métriques de Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Précision par Algorithme</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Isolation Forest</span>
                    <span>94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>One-Class SVM</span>
                    <span>91.5%</span>
                  </div>
                  <Progress value={91.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>LOF</span>
                    <span>89.7%</span>
                  </div>
                  <Progress value={89.7} className="h-2" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Temps de Traitement</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Isolation Forest</span>
                    <span>12ms</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>LOF</span>
                    <span>18ms</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>One-Class SVM</span>
                    <span>25ms</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderModels = () => (
    <div className="space-y-6">
      {/* Models Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-[#3BA5E4]" />
              <span>Gestion des Modèles</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Modèle
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Précision</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Date Création</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelsData.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={model.accuracy} className="w-16 h-2" />
                      <span className="text-sm">{model.accuracy}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{model.size}</TableCell>
                  <TableCell>{model.created}</TableCell>
                  <TableCell>
                    <Badge variant={model.status === "active" ? "default" : model.status === "training" ? "secondary" : "outline"}>
                      {model.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <GitBranch className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Model Training */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-[#F4B400]" />
            <span>Entraînement de Modèle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="model-name">Nom du Modèle</Label>
                <Input id="model-name" placeholder="Nom du nouveau modèle..." />
              </div>
              <div>
                <Label htmlFor="algorithm">Algorithme</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un algorithme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isolation-forest">Isolation Forest</SelectItem>
                    <SelectItem value="lof">Local Outlier Factor</SelectItem>
                    <SelectItem value="ocsvm">One-Class SVM</SelectItem>
                    <SelectItem value="autoencoder">Autoencoder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dataset-size">Taille du Dataset</Label>
                <Input id="dataset-size" type="number" defaultValue="10000" />
              </div>
              <div>
                <Label htmlFor="validation-split">Validation Split (%)</Label>
                <Input id="validation-split" type="number" defaultValue="20" min="10" max="50" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="epochs">Nombre d'Époques</Label>
                <Input id="epochs" type="number" defaultValue="100" />
              </div>
              <div>
                <Label htmlFor="learning-rate">Taux d'Apprentissage</Label>
                <Input id="learning-rate" type="number" defaultValue="0.001" step="0.001" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="early-stopping" defaultChecked />
                <Label htmlFor="early-stopping">Arrêt précoce</Label>
              </div>
              <Button className="w-full">
                <Brain className="w-4 h-4 mr-2" />
                Démarrer l'Entraînement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Versioning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-[#3BA5E4]" />
            <span>Versionnement des Modèles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Isolation Forest v2.1</h4>
                <Badge variant="default">Production</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Précision:</span>
                  <span className="ml-2 font-medium">94.2%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Déployé le:</span>
                  <span className="ml-2 font-medium">2024-01-10</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Performances:</span>
                  <span className="ml-2 font-medium">12ms avg</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button variant="outline" size="sm">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Créer une Branche
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Isolation Forest v2.0</h4>
                <Badge variant="secondary">Archive</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Précision:</span>
                  <span className="ml-2 font-medium">91.8%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Déployé le:</span>
                  <span className="ml-2 font-medium">2024-01-05</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Performances:</span>
                  <span className="ml-2 font-medium">15ms avg</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdmin = () => (
    <div className="space-y-6">
      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#3BA5E4]" />
            <span>Gestion des Utilisateurs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Input placeholder="Rechercher un utilisateur..." className="w-64" />
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Utilisateur
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Dernière Connexion</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Admin Principal</TableCell>
                <TableCell>admin@likupdigital.com</TableCell>
                <TableCell><Badge variant="destructive">Super Admin</Badge></TableCell>
                <TableCell>Il y a 5 min</TableCell>
                <TableCell><Badge variant="default">Actif</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Analyste Sécurité</TableCell>
                <TableCell>security@likupdigital.com</TableCell>
                <TableCell><Badge variant="default">Analyste</Badge></TableCell>
                <TableCell>Il y a 2h</TableCell>
                <TableCell><Badge variant="default">Actif</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#F4B400]" />
            <span>Configuration Système</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Intégrations</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="system-name">Nom du Système</Label>
                    <Input id="system-name" defaultValue="ModSec AI Dashboard" />
                  </div>
                  <div>
                    <Label htmlFor="log-level">Niveau de Log</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retention">Rétention des Logs (jours)</Label>
                    <Input id="retention" type="number" defaultValue="30" />
                  </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retention">Rétention des Logs (jours)</Label>
                    <Input id="retention" type="number" defaultValue="30" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-backup" defaultChecked />
                    <Label htmlFor="auto-backup">Sauvegarde automatique</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="session-timeout">Timeout de Session (min)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="2fa" defaultChecked />
                    <Label htmlFor="2fa">Authentification à deux facteurs</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password-policy">Politique de Mot de Passe</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la politique" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basique</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="strong">Forte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="audit-log" defaultChecked />
                    <Label htmlFor="audit-log">Journal d'audit</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alertes Critiques</Label>
                    <p className="text-sm text-muted-foreground">Notifications pour les anomalies critiques</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rapports Quotidiens</Label>
                    <p className="text-sm text-muted-foreground">Envoi automatique des rapports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Système</Label>
                    <p className="text-sm text-muted-foreground">Notifications de maintenance</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="integrations" className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SIEM Integration</h4>
                      <p className="text-sm text-muted-foreground">Connexion avec votre SIEM</p>
                    </div>
                    <Button variant="outline" size="sm">Configurer</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Webhook Notifications</h4>
                      <p className="text-sm text-muted-foreground">Notifications via webhooks</p>
                    </div>
                    <Button variant="outline" size="sm">Configurer</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#3BA5E4]" />
            <span>État du Système</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Cpu className="w-8 h-8 mx-auto mb-2 text-[#3BA5E4]" />
              <div className="text-2xl font-bold">45%</div>
              <p className="text-sm text-muted-foreground">CPU</p>
            </div>
            <div className="text-center">
              <MemoryStick className="w-8 h-8 mx-auto mb-2 text-[#F4B400]" />
              <div className="text-2xl font-bold">67%</div>
              <p className="text-sm text-muted-foreground">RAM</p>
            </div>
            <div className="text-center">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">23%</div>
              <p className="text-sm text-muted-foreground">Stockage</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderHelp = () => (
    <div className="space-y-6">
      {/* Help Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-[#3BA5E4]" />
            <span>Centre d'Aide et Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-[#3BA5E4]" />
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>Guide complet d'utilisation</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-[#F4B400]" />
                <CardTitle className="text-lg">FAQ</CardTitle>
                <CardDescription>Questions fréquemment posées</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-2 text-green-600" />
                <CardTitle className="text-lg">Support</CardTitle>
                <CardDescription>Contactez notre équipe</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Guide de Démarrage Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#3BA5E4] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-medium">Configuration Initiale</h4>
                <p className="text-sm text-muted-foreground">Configurez les paramètres de base du système de détection</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#F4B400] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-medium">Importation des Règles</h4>
                <p className="text-sm text-muted-foreground">Importez vos règles ModSecurity existantes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-medium">Entraînement du Modèle</h4>
                <p className="text-sm text-muted-foreground">Lancez l'entraînement initial du modèle de détection</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 className="font-medium">Monitoring</h4>
                <p className="text-sm text-muted-foreground">Surveillez les détections et validez les anomalies</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Contacter le Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#3BA5E4]" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@likupdigital.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#F4B400]" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Horaires</p>
                  <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="support-subject">Sujet</Label>
                <Input id="support-subject" placeholder="Décrivez votre problème..." />
              </div>
              <div>
                <Label htmlFor="support-message">Message</Label>
                <Textarea id="support-message" placeholder="Détails du problème..." className="h-24" />
              </div>
              <Button className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Envoyer le Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm font-medium">ModSec AI v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Build</span>
                <span className="text-sm font-medium">#2024.01.15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Licence</span>
                <span className="text-sm font-medium">Enterprise</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dernière MAJ</span>
                <span className="text-sm font-medium">2024-01-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Support</span>
                <span className="text-sm font-medium">Actif jusqu'au 2025-01-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Version</span>
                <span className="text-sm font-medium">v2.1</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className={`min-h-screen bg-background ${isDark ? "dark" : ""}`}>
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#3BA5E4] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-[#F4B400]">LIKUP</span>
                  <span className="text-xl font-bold text-[#3BA5E4] ml-1">DIGITAL</span>
                </div>
              </div>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold">ModSec AI Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card/30 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {[
              { id: "dashboard", label: "Tableau de Bord", icon: BarChart3 },
              { id: "monitoring", label: "Monitoring", icon: Activity },
              { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
              { id: "rules", label: "Règles", icon: Shield },
              { id: "phases", label: "Mode Deux Phases", icon: TrendingUp },
              { id: "reports", label: "Rapports", icon: FileText },
              { id: "benchmark", label: "Benchmarking", icon: Brain },
              { id: "models", label: "Modèles", icon: Database },
              { id: "admin", label: "Administration", icon: Settings },
              { id: "help", label: "Aide", icon: HelpCircle },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeView === item.id ? "bg-[#3BA5E4] hover:bg-[#3BA5E4]/90 text-white" : "hover:bg-accent"
                }`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeView === "dashboard" && renderDashboard()}
          {activeView === "monitoring" && renderMonitoring()}
          {activeView === "anomalies" && renderAnomalies()}
          {activeView === "rules" && renderRules()}
          {activeView === "phases" && renderPhases()}
          {activeView === "reports" && renderReports()}
          {activeView === "benchmark" && renderBenchmark()}
          {activeView === "models" && renderModels()}
          {activeView === "admin" && renderAdmin()}
          {activeView === "help" && renderHelp()}
        </main>
      </div>
    </div>
  )
}
