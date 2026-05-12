import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosAdmin from "@/utils/axiosAdmin";
import SummaryApi from "@/common/SummerAPI";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ShieldCheck,
  Users,
  Plus,
  Trash2,
  Lock,
  Mail,
  LogOut,
  Save,
  Loader2,
  Crown,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const Settings = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");

  // Auth/Info from localStorage
  const adminInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("rw_admin_info") || "{}");
    } catch {
      return {};
    }
  })();
  const isAdmin = adminInfo.role === "admin";

  // --- Queries ---

  // 1. Current Profile
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await AxiosAdmin.get(SummaryApi.getProfile.url);
      return response.data.restaurant;
    },
  });

  // 2. Staff List (Admin Only)
  const { data: staff = [] } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const response = await AxiosAdmin.get(SummaryApi.getStaff.url);
      return response.data;
    },
    enabled: isAdmin,
  });

  // 3. Website & Bill Settings
  const { data: settings, isLoading: loadingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await AxiosAdmin.get(SummaryApi.getSettings.url);
      return response.data;
    },
  });

  // --- Mutations ---

  // Update Profile
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      let payload = { ...data };
      if (payload.logo instanceof File) {
        payload.logo = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(payload.logo);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      const response = await AxiosAdmin.put(SummaryApi.updateProfile.url, payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries(["profile"]);
      // Update local storage too
      const updated = { ...adminInfo, ...data };
      localStorage.setItem("rw_admin_info", JSON.stringify(updated));
    },
  });

  // Change Password
  const changePasswordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await AxiosAdmin.put(SummaryApi.changePassword.url, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to change password");
    },
  });

  // Register Staff
  const registerStaffMutation = useMutation({
    mutationFn: async (data) => {
      const response = await AxiosAdmin.post(SummaryApi.registerStaff.url, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("New staff added!");
      queryClient.invalidateQueries(["staff"]);
      setAddStaffOpen(false);
    },
  });

  // Update Settings (Website & Bill)
  const updateSettingsMutation = useMutation({
    mutationFn: async (data) => {
      let payload = { ...data };
      if (payload.logo instanceof File) {
        payload.logo = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(payload.logo);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      const response = await AxiosAdmin.put(SummaryApi.updateSettings.url, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Settings updated!");
      queryClient.invalidateQueries(["settings"]);
    },
  });

  // --- Form States ---
  const [passData, setPassData] = useState({ currentPassword: "", newPassword: "" });
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [settingsData, setSettingsData] = useState({
    restaurantName: "",
    location: "",
    description: "",
    logo: "",
    phone: "",
    gstNo: "",
    fssaiNo: "",
    cgst: 2.5,
    sgst: 2.5,
    imbToken: "",
    imbStatusUrl: "",
    isSelfOrderEnabled: true,
  });
  const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "", role: "cashier" });
  const [addStaffOpen, setAddStaffOpen] = useState(false);

  const daysRemaining = useMemo(() => {
    if (!profile?.subscription?.expiresAt) return null;
    const expiry = new Date(profile.subscription.expiresAt);
    const today = new Date();
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [profile?.subscription?.expiresAt]);

  // Initialize profile form when data loads
  useEffect(() => {
    if (profile) setProfileData({
      name: profile.name || "",
      email: profile.email || "",
    });
  }, [profile]);

  // Initialize settings form when data loads
  useEffect(() => {
    if (settings) setSettingsData({
      restaurantName: settings.restaurantName || "",
      location: settings.location || "",
      description: settings.description || "",
      logo: settings.logo || "",
      phone: settings.phone || "",
      gstNo: settings.gstNo || "",
      fssaiNo: settings.fssaiNo || "",
      cgst: settings.cgst ?? 2.5,
      sgst: settings.sgst ?? 2.5,
      imbToken: settings.imbToken || "",
      imbStatusUrl: settings.imbStatusUrl || "",
      isSelfOrderEnabled: settings.isSelfOrderEnabled ?? true,
    });
  }, [settings]);

  const handleLogout = () => {
    localStorage.removeItem("resto_auth_token");
    localStorage.removeItem("rw_admin_info");
    window.location.reload();
  };

  if (loadingProfile || loadingSettings) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-card shadow-soft mb-6 p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="profile" className="gap-2 px-4 py-2">
            <User className="h-4 w-4" /> My Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 px-4 py-2">
            <ShieldCheck className="h-4 w-4" /> Security
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="team" className="gap-2 px-4 py-2">
              <Users className="h-4 w-4" /> Team Management
            </TabsTrigger>

          )}
          <TabsTrigger value="website" className="gap-2 px-4 py-2">
            <User className="h-4 w-4" /> Website Settings
          </TabsTrigger>
          <TabsTrigger value="bill" className="gap-2 px-4 py-2">
            <User className="h-4 w-4" /> Bill Settings
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" /> Payment (IMB)
          </TabsTrigger>
          <TabsTrigger value="premium" className="gap-2 px-4 py-2">
            <Crown className="h-4 w-4" /> Premium Settings
          </TabsTrigger>
        </TabsList>

        {/* --- Profile Tab --- */}
        <TabsContent value="profile">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center text-white text-2xl font-bold shadow-glow">
                {profile?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{profile?.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{profile?.role}</p>
              </div>
            </div>

            <div className="grid gap-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email Address</Label>
                <Input
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => updateProfileMutation.mutate(profileData)}
                  disabled={updateProfileMutation.isPending}
                  className="bg-primary text-primary-foreground"
                >
                  {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- Security Tab --- */}
        <TabsContent value="security">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-accent" /> Change Password
            </h3>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  value={passData.currentPassword}
                  onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={passData.newPassword}
                  onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                />
                <p className="text-[11px] text-muted-foreground">Min. 6 characters</p>
              </div>
              <Button
                onClick={() => changePasswordMutation.mutate(passData)}
                disabled={changePasswordMutation.isPending || passData.newPassword.length < 6}
                className="bg-accent text-accent-foreground shadow-glow w-fit"
              >
                Update Password
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* --- Team Management Tab --- */}
        {isAdmin && (
          <TabsContent value="team">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-primary">Team Members</h3>
                  <p className="text-xs text-muted-foreground">Manage your restaurant staff and their roles</p>
                </div>

                <Dialog open={addStaffOpen} onOpenChange={setAddStaffOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-accent text-accent-foreground font-bold shadow-glow">
                      <Plus className="h-4 w-4 mr-2" /> Add Staff
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Register New Employee</DialogTitle>
                      <DialogDescription>Create a new account for your staff member.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 py-4">
                      <div className="space-y-1.5">
                        <Label>Full Name</Label>
                        <Input
                          placeholder="John Doe"
                          value={newStaff.name}
                          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={newStaff.email}
                          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Temporary Password</Label>
                        <Input
                          type="password"
                          value={newStaff.password}
                          onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Role</Label>
                        <select
                          className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newStaff.role}
                          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                        >
                          <option value="cashier">Cashier</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => registerStaffMutation.mutate(newStaff)}
                        disabled={registerStaffMutation.isPending || !newStaff.name || !newStaff.email}
                        className="w-full bg-accent text-accent-foreground"
                      >
                        {registerStaffMutation.isPending ? "Adding..." : "Confirm & Add"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {staff.map((s) => (
                  <div key={s._id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary-soft text-secondary flex items-center justify-center font-bold">
                        {s.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{s.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {s.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                        {s.role}
                      </span>
                      {s.email !== adminInfo.email && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

        )}
        {/* --- Profile Tab --- */}
        <TabsContent value="website">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="grid gap-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Restaurant Name</Label>
                <Input
                  value={settingsData.restaurantName}
                  onChange={(e) => setSettingsData({ ...settingsData, restaurantName: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Restaurant Location</Label>
                <Input
                  value={settingsData.location}
                  onChange={(e) => setSettingsData({ ...settingsData, location: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Restaurant Description</Label>
                <Textarea
                  value={settingsData.description}
                  onChange={(e) => setSettingsData({ ...settingsData, description: e.target.value })}
                  rows={5}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Restaurant Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSettingsData({ ...settingsData, logo: e.target.files[0] });
                    }
                  }}
                />
                {settingsData.logo && (
                  <img
                    src={settingsData.logo instanceof File ? URL.createObjectURL(settingsData.logo) : settingsData.logo}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Mobile / Phone No.</Label>
                <Input
                  placeholder="e.g. +91 98765 43210"
                  value={settingsData.phone}
                  onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => updateSettingsMutation.mutate(settingsData)}
                  disabled={updateSettingsMutation.isPending}
                  className="bg-primary text-primary-foreground"
                >
                  {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="bill">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
              <Save className="h-5 w-5 text-accent" /> Bill & Tax Settings
            </h3>
            <p className="text-xs text-muted-foreground mb-5">These details will appear on every generated receipt/bill.</p>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-1.5">
                <Label>GST Number (GSTIN)</Label>
                <Input
                  placeholder="e.g. 22AAAAA0000A1Z5"
                  value={settingsData.gstNo}
                  onChange={(e) => setSettingsData({ ...settingsData, gstNo: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>FSSAI License No.</Label>
                <Input
                  placeholder="e.g. 10012345000123"
                  value={settingsData.fssaiNo}
                  onChange={(e) => setSettingsData({ ...settingsData, fssaiNo: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>CGST (%)</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min="0" max="50" step="0.5"
                      placeholder="e.g. 2.5"
                      value={settingsData.cgst}
                      onChange={(e) => setSettingsData({ ...settingsData, cgst: parseFloat(e.target.value) || 0 })}
                    />
                    <span className="text-sm font-bold text-muted-foreground">%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>SGST (%)</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min="0" max="50" step="0.5"
                      placeholder="e.g. 2.5"
                      value={settingsData.sgst}
                      onChange={(e) => setSettingsData({ ...settingsData, sgst: parseFloat(e.target.value) || 0 })}
                    />
                    <span className="text-sm font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground -mt-1">CGST + SGST = Total GST charged on bills. Default is 2.5% + 2.5% = 5%.</p>
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => updateSettingsMutation.mutate(settingsData)}
                  disabled={updateSettingsMutation.isPending}
                  className="bg-primary text-primary-foreground"
                >
                  {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Bill Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="payment">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" /> IMB Gateway Settings
            </h3>
            <p className="text-xs text-muted-foreground mb-5">Configure your custom IMB payment gateway to receive payments directly.</p>
            
            <div className="grid gap-6 max-w-md">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
                <div>
                  <p className="font-bold text-primary">Enable Self-Ordering</p>
                  <p className="text-xs text-muted-foreground">Allow customers to order via QR code.</p>
                </div>
                <Switch 
                  checked={settingsData.isSelfOrderEnabled} 
                  onCheckedChange={(checked) => setSettingsData({ ...settingsData, isSelfOrderEnabled: checked })}
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-border">
                <div className="space-y-1.5">
                  <Label>IMB User Token (Client Secret)</Label>
                  <Input
                    type="password"
                    placeholder="Enter your IMB token"
                    value={settingsData.imbToken}
                    onChange={(e) => setSettingsData({ ...settingsData, imbToken: e.target.value })}
                  />
                  <p className="text-[10px] text-muted-foreground italic">Required for self-ordering payments to work.</p>
                </div>

                <div className="space-y-1.5">
                  <Label>IMB Status URL (Optional)</Label>
                  <Input
                    placeholder="e.g. https://imb.org.in/api/order-status"
                    value={settingsData.imbStatusUrl}
                    onChange={(e) => setSettingsData({ ...settingsData, imbStatusUrl: e.target.value })}
                  />
                  <p className="text-[10px] text-muted-foreground">Leave blank to use system default.</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => updateSettingsMutation.mutate(settingsData)}
                    disabled={updateSettingsMutation.isPending}
                    className="bg-primary text-primary-foreground"
                  >
                    {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Payment Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="premium">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Crown className="h-5 w-5 text-accent" /> Premium Subscription
                </h3>
                <p className="text-xs text-muted-foreground">Manage and view your restaurant's premium plan status.</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => queryClient.invalidateQueries(["profile"])}
                  className="h-8 w-8 p-0"
                >
                  <Loader2 className={`h-4 w-4 ${loadingProfile ? 'animate-spin' : ''}`} />
                </Button>
                {profile?.subscription?.status?.toUpperCase() === "ACTIVE" || profile?.subscription?.status?.toUpperCase() === "TRIAL" ? (
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                    profile?.subscription?.status?.toUpperCase() === "TRIAL" 
                      ? "bg-blue-500/10 text-blue-500 border-blue-500/20" 
                      : "bg-green-500/10 text-green-500 border-green-500/20"
                  }`}>
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {profile?.subscription?.status?.toUpperCase() === "TRIAL" ? "Free Trial" : "Active"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Inactive</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Plan Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                <h4 className="text-2xl font-black text-primary uppercase tracking-tight">
                  {profile?.subscription?.plan || "No Plan"}
                </h4>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-accent">
                  <CheckCircle2 className="h-3 w-3" />
                  Includes all premium features
                </div>
              </div>

              {/* Expiry Card */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-soft flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expires On</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary/60" />
                    <span className="text-xl font-bold text-primary">
                      {profile?.subscription?.expiresAt 
                        ? new Date(profile.subscription.expiresAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })
                        : "N/A"
                      }
                    </span>
                  </div>
                </div>
                
                {daysRemaining !== null && (
                  <div className="mt-4">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase">Remaining Time</span>
                      <span className={`text-xs font-bold ${daysRemaining < 7 ? 'text-destructive' : 'text-accent'}`}>
                        {daysRemaining} Days left
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${daysRemaining < 7 ? 'bg-destructive shadow-glow-destructive' : 'bg-accent shadow-glow'}`}
                        style={{ width: `${Math.min(100, Math.max(0, (daysRemaining / 30) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-dashed border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Crown className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Need more time or a bigger plan?</p>
                  <p className="text-xs text-muted-foreground">Upgrade or renew your subscription anytime.</p>
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground shadow-soft">
                Renew Plan
              </Button>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Settings;
