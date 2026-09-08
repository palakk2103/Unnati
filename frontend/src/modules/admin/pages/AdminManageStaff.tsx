import React, { useEffect, useMemo, useState } from 'react';
import {
  Users,
  Plus,
  Search,
  LogOut,
  Edit2,
  Trash2,
  Shield,
  Phone,
  X,
  Percent,
  UserCheck,
  CreditCard
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import AddStaffModal from '../components/AddStaffModal';
import StaffRolePermissionsPanel from '../components/StaffRolePermissionsPanel';
import { detectModuleFromPath } from '../../../utils/moduleAuth';
import { getStoredStaffList, setStoredStaffList, normalizeStaffMember, StaffModule } from '../../../utils/staffSession';
import { createStaff as apiCreateStaff, deleteStaff as apiDeleteStaff, getStaff as apiGetStaff, updateStaff as apiUpdateStaff } from '../../../services/api/admin/adminStaffService';
import { createRole as apiCreateRole, getRoles as apiGetRoles } from '../../../services/api/admin/adminRoleService';

export type RoleType = string;

export interface Staff {
  id: string;
  name: string;
  phone: string;
  role: RoleType;
  commission: number;
  permissions?: string[];
  avatar?: string;
}

const DUMMY_STAFF_MEMBERS: Staff[] = [
  {
    id: "stf_101",
    name: "Rameshwar Patel",
    phone: "9826144520",
    role: "STOREMANAGER",
    commission: 3.5,
    permissions: [
      "pos",
      "orders",
      "customers",
      "ui:admin_dashboard",
      "ui:admin_pos_orders",
      "ui:admin_pos_customers",
      "ui:admin_pos_quotations",
      "ui:admin_pos_report",
      "ui:admin_orders_all",
      "ui:admin_orders_pending",
      "ui:admin_product_list",
      "ui:admin_product_stock",
    ],
  },
  {
    id: "stf_102",
    name: "Sunil Sharma",
    phone: "9876511234",
    role: "BILLINGAGENT",
    commission: 2.0,
    permissions: [
      "pos",
      "orders",
      "customers",
      "ui:admin_pos_orders",
      "ui:admin_pos_customers",
      "ui:admin_pos_quotations",
      "ui:admin_pos_report",
    ],
  },
  {
    id: "stf_103",
    name: "Deepak Verma",
    phone: "9425088712",
    role: "STOCKHANDLER",
    commission: 1.5,
    permissions: [
      "pos",
      "ui:admin_product_list",
      "ui:admin_product_stock",
      "ui:admin_purchase_report",
    ],
  },
  {
    id: "stf_104",
    name: "Pooja Deshmukh",
    phone: "9893045678",
    role: "STAFF",
    commission: 2.5,
    permissions: [
      "pos",
      "orders",
      "customers",
      "ui:admin_pos_orders",
      "ui:admin_orders_all",
      "ui:admin_orders_delivered",
    ],
  },
  {
    id: "stf_105",
    name: "Amit Choudhary",
    phone: "9752133490",
    role: "BILLINGAGENT",
    commission: 2.0,
    permissions: [
      "pos",
      "orders",
      "customers",
      "ui:admin_pos_orders",
      "ui:admin_pos_customers",
    ],
  },
  {
    id: "stf_106",
    name: "Rajesh Solanki",
    phone: "9300166543",
    role: "STAFF",
    commission: 1.8,
    permissions: [
      "pos",
      "orders",
      "ui:admin_pos_orders",
      "ui:admin_orders_out_for_delivery",
      "ui:admin_orders_delivered",
    ],
  },
];

const AdminManageStaff: React.FC = () => {
  const moduleType = (detectModuleFromPath() === 'seller' ? 'seller' : 'admin') as StaffModule;
  const [staffList, setStaffList] = useState<Staff[]>(() => {
    const stored = getStoredStaffList(moduleType);
    if (stored.length > 0) {
      return stored as Staff[];
    }
    return DUMMY_STAFF_MEMBERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [roles, setRoles] = useState<string[]>(['STAFF', 'STOREMANAGER', 'BILLINGAGENT', 'STOCKHANDLER']);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [isPermissionsPanelOpen, setIsPermissionsPanelOpen] = useState(false);
  const [selectedStaffForPermissions, setSelectedStaffForPermissions] = useState<Staff | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch from backend with fallback
    const fetchStaffAndRoles = async () => {
      try {
        const [staffResponse, rolesResponse] = await Promise.all([
          apiGetStaff(),
          apiGetRoles({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'asc' }),
        ]);

        if (staffResponse.success && Array.isArray(staffResponse.data) && staffResponse.data.length > 0) {
          const mapped: Staff[] = staffResponse.data.map((item: any) => ({
            id: item._id || item.id,
            name: item.name,
            phone: item.phone,
            role: item.role,
            commission: item.commission ?? 0,
            permissions: item.permissions,
          }));
          setStaffList(mapped);
          setStoredStaffList(
            moduleType,
            mapped.map((staff) => normalizeStaffMember(staff))
          );
        } else {
          // If no staff found in backend, use existing stored or dummy
          const stored = getStoredStaffList(moduleType);
          if (stored.length === 0) {
            setStaffList(DUMMY_STAFF_MEMBERS);
            setStoredStaffList(
              moduleType,
              DUMMY_STAFF_MEMBERS.map((staff) => normalizeStaffMember(staff))
            );
          }
        }

        if (rolesResponse.success && Array.isArray(rolesResponse.data)) {
          const apiRoleNames = rolesResponse.data
            .map((r: any) => (r.name || '').toString().toUpperCase().replace(/\s+/g, ''))
            .filter((name: string) => !!name);
          const defaultRoles = ['STAFF', 'STOREMANAGER', 'BILLINGAGENT', 'STOCKHANDLER'];
          const merged = Array.from(new Set([...defaultRoles, ...apiRoleNames]));
          setRoles(merged);
        }
      } catch {
        // Fall back to stored or dummy dataset
        const stored = getStoredStaffList(moduleType);
        if (stored.length === 0) {
          setStaffList(DUMMY_STAFF_MEMBERS);
          setStoredStaffList(
            moduleType,
            DUMMY_STAFF_MEMBERS.map((staff) => normalizeStaffMember(staff))
          );
        }
      }
    };

    fetchStaffAndRoles();
  }, [moduleType]);

  useEffect(() => {
    setStoredStaffList(
      moduleType,
      staffList.map((staff) => normalizeStaffMember(staff))
    );
  }, [moduleType, staffList]);

  // KPI Metrics
  const stats = useMemo(() => {
    const totalCount = staffList.length;
    const managers = staffList.filter(s => s.role.toUpperCase().includes('MANAGER')).length;
    const billingAgents = staffList.filter(s => s.role.toUpperCase().includes('AGENT') || s.role.toUpperCase().includes('BILLING')).length;
    const avgCommission = totalCount > 0
      ? staffList.reduce((acc, s) => acc + (s.commission || 0), 0) / totalCount
      : 0;
    return { totalCount, managers, billingAgents, avgCommission };
  }, [staffList]);

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const formattedRole = newRoleName.trim().toUpperCase().replace(/\s+/g, '');

    if (roles.includes(formattedRole)) {
      toast.error('Role already exists');
      return;
    }

    try {
      const response = await apiCreateRole({ name: formattedRole });
      if (response.success && response.data) {
        setRoles(prev => [...prev, formattedRole]);
        setNewRoleName('');
        setIsAddRoleModalOpen(false);
        toast.success('New role added successfully');
      } else {
        setRoles(prev => [...prev, formattedRole]);
        setNewRoleName('');
        setIsAddRoleModalOpen(false);
        toast.success('Role added locally');
      }
    } catch {
      setRoles(prev => [...prev, formattedRole]);
      setNewRoleName('');
      setIsAddRoleModalOpen(false);
      toast.success('Role added locally');
    }
  };

  const filteredStaff = staffList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.phone.includes(searchQuery) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStaff = async (newStaff: Omit<Staff, 'id'>) => {
    try {
      const response = await apiCreateStaff({
        name: newStaff.name,
        phone: newStaff.phone,
        role: newStaff.role,
        commission: newStaff.commission,
        permissions: newStaff.permissions,
      });
      if (response.success && response.data) {
        const created = response.data as any;
        const staffWithId: Staff = {
          id: created._id || created.id,
          name: created.name,
          phone: created.phone,
          role: created.role,
          commission: created.commission ?? 0,
          permissions: created.permissions,
        };
        setStaffList([...staffList, staffWithId]);
        setIsAddModalOpen(false);
        toast.success('Staff added successfully');
      } else {
        const localStaff: Staff = {
          ...newStaff,
          id: `stf_${Date.now()}`,
        };
        setStaffList([...staffList, localStaff]);
        setIsAddModalOpen(false);
        toast.success('Staff member added');
      }
    } catch {
      const localStaff: Staff = {
        ...newStaff,
        id: `stf_${Date.now()}`,
      };
      setStaffList([...staffList, localStaff]);
      setIsAddModalOpen(false);
      toast.success('Staff member added');
    }
  };

  const handleUpdateStaff = async (updatedStaff: Staff) => {
    try {
      if (!updatedStaff.id.startsWith('stf_')) {
        await apiUpdateStaff(updatedStaff.id, {
          name: updatedStaff.name,
          phone: updatedStaff.phone,
          role: updatedStaff.role,
          commission: updatedStaff.commission,
          permissions: updatedStaff.permissions,
        });
      }
      setStaffList(staffList.map(s => s.id === updatedStaff.id ? updatedStaff : s));
      setEditingStaff(null);
      setIsAddModalOpen(false);
      toast.success('Staff updated successfully');
    } catch {
      setStaffList(staffList.map(s => s.id === updatedStaff.id ? updatedStaff : s));
      setEditingStaff(null);
      setIsAddModalOpen(false);
      toast.success('Staff updated locally');
    }
  };

  const handleDeleteStaff = (id: string) => {
    setStaffToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteStaff = async () => {
    if (!staffToDelete) return;
    try {
      if (!staffToDelete.startsWith('stf_')) {
        await apiDeleteStaff(staffToDelete);
      }
      setStaffList(staffList.filter(s => s.id !== staffToDelete));
      toast.success('Staff deleted successfully');
    } catch {
      setStaffList(staffList.filter(s => s.id !== staffToDelete));
      toast.success('Staff deleted locally');
    } finally {
      setIsDeleteConfirmOpen(false);
      setStaffToDelete(null);
    }
  };

  const handleLogoutAll = () => {
    if (moduleType === 'seller') {
      localStorage.removeItem('seller_staff_session');
      localStorage.removeItem('seller_staff_base_token');
    } else {
      localStorage.removeItem('admin_staff_session');
      localStorage.removeItem('admin_staff_base_token');
    }
    toast.success('Successfully logged out all staff sessions');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const openGlobalPermissions = () => {
    setSelectedStaffForPermissions(null);
    setIsPermissionsPanelOpen(true);
  };

  const openStaffPermissions = (staff: Staff) => {
    setSelectedStaffForPermissions(staff);
    setIsPermissionsPanelOpen(true);
  };

  const getRoleBadgeColor = (role: string) => {
    const r = role.toUpperCase();
    if (r.includes('MANAGER')) return 'bg-purple-50 text-purple-700 border border-purple-200';
    if (r.includes('BILLING') || r.includes('AGENT')) return 'bg-blue-50 text-blue-700 border border-blue-200';
    if (r.includes('HANDLER') || r.includes('STOCK')) return 'bg-amber-50 text-amber-700 border border-amber-200';
    if (r.includes('STAFF')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    return 'bg-[var(--primary-alpha-10)] text-[var(--primary-dark)] border border-[var(--primary-alpha-20)]';
  };

  return (
    <div className="p-4 sm:p-6 bg-neutral-50 min-h-screen space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2.5">
                <Users className="text-[var(--primary-color)]" />
                Manage Staff
              </h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                {moduleType === 'seller' ? 'Seller Team' : 'Store Staff'}
              </span>
            </div>
            <p className="text-neutral-500 text-sm">Add, configure roles, and manage fine-grained POS access permissions</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={openGlobalPermissions}
              className="p-2.5 border border-neutral-300 rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 transition-all shadow-2xs"
              title="Role Permissions Overview"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={handleLogoutAll}
              className="flex items-center gap-2 px-4 py-2.5 border border-neutral-300 rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 transition-all shadow-2xs text-sm font-semibold"
            >
              <LogOut size={16} />
              Logout All
            </button>
            <button
              onClick={() => setIsAddRoleModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-[var(--primary-color)] text-[var(--primary-darker)] rounded-xl hover:bg-[var(--primary-alpha-10)] transition-all shadow-2xs font-semibold text-sm"
            >
              <Shield size={16} />
              Add Role
            </button>
            <button
              onClick={() => {
                setEditingStaff(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-dark)] hover:bg-[var(--primary-darker)] text-white rounded-xl font-semibold transition-all shadow-sm active:scale-95 text-sm"
            >
              <Plus size={18} />
              Add Staff
            </button>
          </div>
        </div>

        {/* KPI Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
              <Users size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Staff Members</div>
              <div className="text-2xl font-bold text-neutral-900 mt-0.5">{stats.totalCount}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
              <UserCheck size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Store Managers</div>
              <div className="text-2xl font-bold text-blue-600 mt-0.5">{stats.managers}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <CreditCard size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Billing Agents</div>
              <div className="text-2xl font-bold text-emerald-600 mt-0.5">{stats.billingAgents}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100">
              <Percent size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Avg Commission</div>
              <div className="text-2xl font-bold text-neutral-900 mt-0.5">{stats.avgCommission.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search staff by name, phone number, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all text-sm shadow-2xs"
            />
          </div>
        </div>

        {/* Staff List Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditingStaff(staff);
                    setIsAddModalOpen(true);
                  }}
                  className="p-2 bg-neutral-100 hover:bg-[var(--primary-alpha-10)] text-neutral-700 hover:text-[var(--primary-dark)] rounded-xl transition-colors"
                  title="Edit Staff"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDeleteStaff(staff.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors"
                  title="Delete Staff"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary-alpha-10)] text-[var(--primary-darker)] flex items-center justify-center font-bold text-xl border border-[var(--primary-alpha-20)] shrink-0">
                  {staff.avatar ? (
                    <img src={staff.avatar} alt={staff.name} className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    staff.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-neutral-900 text-lg leading-snug truncate">{staff.name}</h3>
                  <div className="flex items-center gap-1.5 text-neutral-500 mt-1 text-xs">
                    <Phone size={13} />
                    <span className="font-medium">{staff.phone}</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${getRoleBadgeColor(staff.role)}`}>
                      {staff.role.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-neutral-600">
                    Commission: <span className="text-neutral-900 font-bold">{staff.commission}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => openStaffPermissions(staff)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary-dark)] hover:text-[var(--primary-darker)] transition-colors hover:underline"
                >
                  <Shield size={15} />
                  Manage Permissions
                </button>
                <button
                  onClick={() => {
                    setEditingStaff(staff);
                    setIsAddModalOpen(true);
                  }}
                  className="text-xs text-neutral-400 hover:text-neutral-700 font-medium"
                >
                  Edit details
                </button>
              </div>
            </div>
          ))}

          {/* Add New Staff Card Button */}
          <button
            onClick={() => {
              setEditingStaff(null);
              setIsAddModalOpen(true);
            }}
            className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-neutral-400 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-alpha-10)]/30 transition-all group min-h-[190px]"
          >
            <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center group-hover:border-[var(--primary-color)] transition-colors">
              <Plus size={24} />
            </div>
            <span className="font-semibold text-sm">Add New Staff Member</span>
          </button>
        </div>

        {/* Empty Search State */}
        {filteredStaff.length === 0 && searchQuery && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
            <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-400">
              <Users size={32} />
            </div>
            <h2 className="text-lg font-bold text-neutral-800">No staff found</h2>
            <p className="text-neutral-500 text-sm mt-1">Try adjusting your search query</p>
          </div>
        )}
      </div>

      {/* Add / Edit Staff Modal */}
      {isAddModalOpen && (
        <AddStaffModal
          isOpen={isAddModalOpen}
          roles={roles}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingStaff(null);
          }}
          onSave={editingStaff ? handleUpdateStaff : handleAddStaff}
          staff={editingStaff || undefined}
        />
      )}

      {/* Delete confirmation modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-neutral-200">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-red-50 to-transparent">
              <h2 className="text-lg font-bold text-neutral-900">Delete Staff Member</h2>
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setStaffToDelete(null);
                }}
                className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-600">
                Are you sure you want to remove this staff member? They will lose POS and store access immediately.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteConfirmOpen(false);
                    setStaffToDelete(null);
                  }}
                  className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteStaff}
                  className="flex-1 px-4 py-2.5 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-all shadow-sm active:scale-95 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Panel */}
      {isPermissionsPanelOpen && (
        <StaffRolePermissionsPanel
          isOpen={isPermissionsPanelOpen}
          roles={roles}
          onClose={() => setIsPermissionsPanelOpen(false)}
          staff={selectedStaffForPermissions}
        />
      )}

      {/* Add Role Modal */}
      {isAddRoleModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-neutral-200">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-[var(--primary-color)]/10 to-transparent">
              <h2 className="text-xl font-bold text-neutral-900">Add New Role</h2>
              <button
                onClick={() => setIsAddRoleModalOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddRole} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-neutral-700 ml-1">Role Name</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ex. SUPERVISOR, CASHIER"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all uppercase text-sm font-bold"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddRoleModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[var(--primary-dark)] hover:bg-[var(--primary-darker)] text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageStaff;
