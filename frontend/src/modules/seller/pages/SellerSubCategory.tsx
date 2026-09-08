import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllSubcategories, SubCategory, Category } from '../../../services/api/categoryService';
import ThemedDropdown from '../components/ThemedDropdown';
import { uploadImage } from "../../../services/api/uploadService";
import { validateImageFile, createImagePreview } from "../../../utils/imageUpload";
import { getSellerProfile } from '../../../services/api/auth/sellerAuthService';
import {
    getSellerOwnCategories as apiGetSellerOwnCategories,
    getSellerOwnSubcategories as apiGetSellerOwnSubcategories,
    createSellerOwnSubcategory as apiCreateSellerOwnSubcategory,
} from '../../../services/api/seller/sellerPurchaseService';

const DUMMY_SUBCATEGORIES: SubCategory[] = [
  {
    _id: "sub_201",
    id: "sub_201",
    categoryName: "Seeds & Plantation",
    subcategoryName: "Hybrid & High Yield Seeds",
    subcategoryImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=160&q=80",
    totalProduct: 48,
    parentId: "cat_101",
  },
  {
    _id: "sub_202",
    id: "sub_202",
    categoryName: "Seeds & Plantation",
    subcategoryName: "Vegetable & Flower Seeds",
    subcategoryImage: "https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=160&q=80",
    totalProduct: 35,
    parentId: "cat_101",
  },
  {
    _id: "sub_203",
    id: "sub_203",
    categoryName: "Seeds & Plantation",
    subcategoryName: "Field Crops (Wheat, Paddy, Mustard)",
    subcategoryImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=160&q=80",
    totalProduct: 62,
    parentId: "cat_101",
  },
  {
    _id: "sub_204",
    id: "sub_204",
    categoryName: "Fertilizers & Soil Nutrients",
    subcategoryName: "Nitrogen & Urea Fertilizers",
    subcategoryImage: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=160&q=80",
    totalProduct: 29,
    parentId: "cat_102",
  },
  {
    _id: "sub_205",
    id: "sub_205",
    categoryName: "Fertilizers & Soil Nutrients",
    subcategoryName: "NPK & Water Soluble Fertilizers",
    subcategoryImage: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=160&q=80",
    totalProduct: 54,
    parentId: "cat_102",
  },
  {
    _id: "sub_206",
    id: "sub_206",
    categoryName: "Fertilizers & Soil Nutrients",
    subcategoryName: "Organic Manure & Vermicompost",
    subcategoryImage: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=160&q=80",
    totalProduct: 38,
    parentId: "cat_102",
  },
  {
    _id: "sub_207",
    id: "sub_207",
    categoryName: "Crop Protection & Pesticides",
    subcategoryName: "Chemical & Biological Insecticides",
    subcategoryImage: "https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=160&q=80",
    totalProduct: 42,
    parentId: "cat_103",
  },
  {
    _id: "sub_208",
    id: "sub_208",
    categoryName: "Crop Protection & Pesticides",
    subcategoryName: "Fungicides & Bactericides",
    subcategoryImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=160&q=80",
    totalProduct: 31,
    parentId: "cat_103",
  },
  {
    _id: "sub_209",
    id: "sub_209",
    categoryName: "Crop Protection & Pesticides",
    subcategoryName: "Herbicides & Weedicides",
    subcategoryImage: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=160&q=80",
    totalProduct: 24,
    parentId: "cat_103",
  },
  {
    _id: "sub_210",
    id: "sub_210",
    categoryName: "Drip & Micro Irrigation",
    subcategoryName: "Drip Emitters & Lateral Pipes",
    subcategoryImage: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=160&q=80",
    totalProduct: 19,
    parentId: "cat_104",
  },
  {
    _id: "sub_211",
    id: "sub_211",
    categoryName: "Drip & Micro Irrigation",
    subcategoryName: "Sprinkler Sets & Rain Guns",
    subcategoryImage: "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=160&q=80",
    totalProduct: 16,
    parentId: "cat_104",
  },
  {
    _id: "sub_212",
    id: "sub_212",
    categoryName: "Farm Machinery & Sprayers",
    subcategoryName: "Battery & Manual Sprayers",
    subcategoryImage: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=160&q=80",
    totalProduct: 27,
    parentId: "cat_105",
  },
  {
    _id: "sub_213",
    id: "sub_213",
    categoryName: "Organic Bio-Inputs & Compost",
    subcategoryName: "Bio-Fertilizers & Trichoderma",
    subcategoryImage: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=160&q=80",
    totalProduct: 22,
    parentId: "cat_106",
  },
  {
    _id: "sub_214",
    id: "sub_214",
    categoryName: "Gardening & Nursery Tools",
    subcategoryName: "Pruning & Grafting Equipment",
    subcategoryImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=160&q=80",
    totalProduct: 36,
    parentId: "cat_107",
  },
  {
    _id: "sub_215",
    id: "sub_215",
    categoryName: "Animal Feed & Veterinary",
    subcategoryName: "Cattle & Poultry Feed Pellets",
    subcategoryImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=160&q=80",
    totalProduct: 45,
    parentId: "cat_108",
  },
];

export default function SellerSubCategory() {
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [ownSubcategories, setOwnSubcategories] = useState<SubCategory[]>([]);
    const [ownCategories, setOwnCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [canCreateSubcategories, setCanCreateSubcategories] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        parentId: '',
        name: '',
        image: '',
        order: 0,
        status: 'Active' as 'Active' | 'Inactive',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isDragging, setIsDragging] = useState(false);

    // Fetch subcategories from API with dummy fallback
    useEffect(() => {
        const fetchSubcategories = async () => {
            setLoading(true);
            setError('');
            try {
                const params: any = {
                    page: currentPage,
                    limit: rowsPerPage,
                    sortBy: sortColumn || 'subcategoryName',
                    sortOrder: sortDirection,
                };

                const response = await getAllSubcategories(params);
                if (response.success && Array.isArray(response.data) && response.data.length > 0) {
                    setSubcategories(response.data);
                } else {
                    setSubcategories(DUMMY_SUBCATEGORIES);
                }
            } catch (err: any) {
                console.warn('Using dummy subcategories data:', err);
                setSubcategories(DUMMY_SUBCATEGORIES);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [currentPage, rowsPerPage, sortColumn, sortDirection]);

    useEffect(() => {
        const loadSellerData = async () => {
            try {
                const [sellerRes, catRes, subRes] = await Promise.all([
                    getSellerProfile(),
                    apiGetSellerOwnCategories(),
                    apiGetSellerOwnSubcategories(),
                ]);

                if (sellerRes?.success && sellerRes?.data) {
                    setCanCreateSubcategories(sellerRes.data.canCreateCategories !== false);
                } else {
                    setCanCreateSubcategories(true);
                }

                if (catRes.success && Array.isArray(catRes.data)) {
                    setOwnCategories(catRes.data as any);
                    localStorage.setItem('seller_own_categories', JSON.stringify(catRes.data));
                }

                if (subRes.success && Array.isArray(subRes.data)) {
                    setOwnSubcategories(subRes.data as any);
                    localStorage.setItem('seller_own_subcategories', JSON.stringify(subRes.data));
                }
                return;
            } catch {
                // fallback to local cache
            }

            setCanCreateSubcategories(true);
            const savedCategories = localStorage.getItem('seller_own_categories');
            if (savedCategories) {
                try { setOwnCategories(JSON.parse(savedCategories)); } catch {}
            }

            const savedSubcategories = localStorage.getItem('seller_own_subcategories');
            if (savedSubcategories) {
                try { setOwnSubcategories(JSON.parse(savedSubcategories)); } catch {}
            }
        };
        void loadSellerData();
    }, []);

    useEffect(() => {
        if (!isAddModalOpen) {
            setFormData({
                parentId: '',
                name: '',
                image: '',
                order: 0,
                status: 'Active',
            });
            setImageFile(null);
            setImagePreview('');
            setFormErrors({});
            setIsDragging(false);
        }
    }, [isAddModalOpen]);

    const sellerSubcategoriesFromOwnCategories = useMemo(() => {
        const byId = new Map<string, any>();
        (ownCategories || []).forEach((c: any) => {
            if (c && c._id) byId.set(String(c._id), c);
        });

        const rows = (ownCategories || [])
            .filter((c: any) => {
                const parentId = c?.parentId;
                return !!parentId;
            })
            .map((child: any) => {
                const rawParent = child?.parentId;
                const parentId =
                    typeof rawParent === 'string'
                        ? rawParent
                        : rawParent && typeof rawParent === 'object'
                        ? rawParent._id
                        : '';
                const parent = parentId ? byId.get(String(parentId)) : null;

                return {
                    _id: child?._id,
                    id: child?._id,
                    categoryName: parent?.name || child?.categoryName || 'Category',
                    subcategoryName: child?.name || child?.subcategoryName || 'Subcategory',
                    subcategoryImage: child?.image || child?.subcategoryImage || '',
                    totalProduct: 0,
                    parentId: parentId || '',
                } as any;
            })
            .filter((r: any) => r && r._id);

        return rows;
    }, [ownCategories]);

    const mergedSubcategories = useMemo(() => {
        const sourceSubcategories = subcategories.length > 0 ? subcategories : DUMMY_SUBCATEGORIES;
        const all = [
            ...sourceSubcategories,
            ...ownSubcategories,
            ...sellerSubcategoriesFromOwnCategories,
        ];
        const map = new Map<string, any>();
        for (const row of all) {
            const id = row?._id ? String(row._id) : (row?.id ? String(row.id) : '');
            if (!id) continue;
            if (!map.has(id)) map.set(id, row);
        }
        return Array.from(map.values());
    }, [subcategories, ownSubcategories, sellerSubcategoriesFromOwnCategories]);

    const filteredSubcategories = useMemo(() => {
        if (!searchTerm.trim()) return mergedSubcategories;
        const q = searchTerm.toLowerCase().trim();
        return mergedSubcategories.filter((sub: any) =>
            String(sub?.subcategoryName || '').toLowerCase().includes(q) ||
            String(sub?.categoryName || '').toLowerCase().includes(q) ||
            String(sub?._id || sub?.id || '').toLowerCase().includes(q)
        );
    }, [mergedSubcategories, searchTerm]);

    // Summary Statistics
    const stats = useMemo(() => {
        const totalCount = mergedSubcategories.length;
        const totalProducts = mergedSubcategories.reduce((sum: number, c: any) => sum + (c.totalProduct || 0), 0);
        const uniqueParents = new Set(mergedSubcategories.map((c: any) => c.categoryName)).size;
        const customCount = ownSubcategories.length + sellerSubcategoriesFromOwnCategories.length;
        return { totalCount, totalProducts, uniqueParents, customCount };
    }, [mergedSubcategories, ownSubcategories, sellerSubcategoriesFromOwnCategories]);

    // Client-side sorting
    const sortedSubcategories = useMemo(() => {
        const list = [...filteredSubcategories];
        if (sortColumn && !sortColumn.includes('.')) {
            list.sort((a, b) => {
                let aVal: any = a[sortColumn as keyof typeof a];
                let bVal: any = b[sortColumn as keyof typeof b];
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                if (sortDirection === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        }
        return list;
    }, [filteredSubcategories, sortColumn, sortDirection]);

    // Pagination
    const displayTotalPages = Math.ceil(sortedSubcategories.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedSubcategories = sortedSubcategories.slice(startIndex, endIndex);

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await processFile(file);
    };

    const processFile = async (file: File) => {
        const validation = validateImageFile(file);
        if (!validation.valid) {
            setFormErrors((prev) => ({
                ...prev,
                image: validation.error || "Invalid image file",
            }));
            return;
        }

        setImageFile(file);
        setFormErrors((prev) => {
            const next = { ...prev };
            delete next.image;
            return next;
        });

        try {
            const preview = await createImagePreview(file);
            setImagePreview(preview);
        } catch {
            setFormErrors((prev) => ({
                ...prev,
                image: "Failed to create image preview",
            }));
        }
    };

    const handleSaveSubcategory = async () => {
        const errors: Record<string, string> = {};
        if (!formData.parentId) errors.parentId = "Parent category is required";
        if (!formData.name.trim()) errors.name = "Subcategory name is required";
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            setSubmitting(true);
            let imageUrl = formData.image;

            if (imageFile) {
                setUploading(true);
                const imageResult = await uploadImage(imageFile, "Ecommerce/subcategories");
                imageUrl = imageResult.secureUrl;
                setUploading(false);
            }

            const res = await apiCreateSellerOwnSubcategory({
                parentId: formData.parentId,
                subcategoryName: formData.name.trim(),
                subcategoryImage: imageUrl,
                order: formData.order,
                status: formData.status,
            });

            if (res.success && res.data) {
                const newSubcategory = res.data as SubCategory;
                const updated = [newSubcategory, ...ownSubcategories];
                setOwnSubcategories(updated);
                localStorage.setItem('seller_own_subcategories', JSON.stringify(updated));
                setIsAddModalOpen(false);
            } else {
                setFormErrors({ submit: res.message || "Failed to save subcategory" });
            }
        } catch (err: any) {
            setFormErrors({ submit: err?.message || "Failed to save subcategory" });
        } finally {
            setSubmitting(false);
            setUploading(false);
        }
    };

    const SortIcon = ({ column }: { column: string }) => (
        <span className={`ml-1 transition-colors ${sortColumn === column ? 'text-[var(--primary-dark)]' : 'text-neutral-300 group-hover:text-neutral-400'}`}>
            {sortColumn === column ? (sortDirection === 'asc' ? '↑' : '↓') : '⇅'}
        </span>
    );

    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.04
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="flex flex-col space-y-6 w-full pb-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">SubCategory Management</h1>
                    <p className="text-sm text-neutral-500 mt-1">View, filter, and manage catalog product subcategories</p>
                </div>
                <div className="flex items-center gap-2 text-sm bg-neutral-50 px-3.5 py-1.5 rounded-xl border border-neutral-200 mt-3 sm:mt-0">
                    <Link to="/seller" className="text-[var(--primary-dark)] hover:text-[var(--primary-darker)] font-medium cursor-pointer hover:underline">Home</Link>
                    <span className="text-neutral-400">/</span>
                    <span className="text-neutral-700 font-medium">SubCategory</span>
                </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Subcategories</div>
                        <div className="text-2xl font-bold text-neutral-900 mt-0.5">{stats.totalCount}</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Products Linked</div>
                        <div className="text-2xl font-bold text-neutral-900 mt-0.5">{stats.totalProducts}</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Parent Categories</div>
                        <div className="text-2xl font-bold text-neutral-900 mt-0.5">{stats.uniqueParents}</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Custom Created</div>
                        <div className="text-2xl font-bold text-neutral-900 mt-0.5">{stats.customCount}</div>
                    </div>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 w-full overflow-hidden">
                {/* Header Section */}
                <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-neutral-900">SubCategory List</h2>
                        <p className="text-xs text-neutral-500 mt-0.5">Showing all subcategories mapped to department categories</p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="w-full sm:w-28">
                             <ThemedDropdown
                                options={[10, 20, 50, 100]}
                                value={rowsPerPage}
                                onChange={(val) => {
                                    setRowsPerPage(Number(val));
                                    setCurrentPage(1);
                                }}
                                placeholder="Rows"
                            />
                        </div>

                        <button
                            onClick={() => {
                                const headers = ['ID', 'Category Name', 'Subcategory Name', 'Total Products'];
                                const csvContent = [
                                    headers.join(','),
                                    ...filteredSubcategories.map(sub => [
                                        `"${sub._id || (sub as any).id}"`,
                                        `"${sub.categoryName}"`,
                                        `"${sub.subcategoryName}"`,
                                        sub.totalProduct || 0
                                    ].join(','))
                                ].join('\n');
                                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                const link = document.createElement('a');
                                const url = URL.createObjectURL(blob);
                                link.setAttribute('href', url);
                                link.setAttribute('download', `subcategories_${new Date().toISOString().split('T')[0]}.csv`);
                                link.style.visibility = 'hidden';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            className="w-full sm:w-auto bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Export CSV
                        </button>

                        {canCreateSubcategories && (
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="w-full sm:w-auto bg-[var(--primary-dark)] hover:bg-[var(--primary-darker)] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                <span>Add Subcategory</span>
                            </button>
                        )}

                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all placeholder:text-neutral-400 shadow-2xs"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search subcategories..."
                            />
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Loading and Error States */}
                {loading && (
                    <div className="flex flex-col items-center justify-center p-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary-dark)] mb-4"></div>
                        <div className="text-neutral-500 font-medium">Loading subcategories...</div>
                    </div>
                )}
                {error && !loading && (
                    <div className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900">Error</h3>
                        <p className="text-neutral-500 mt-1">{error}</p>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-neutral-50/90 border-b border-neutral-200">
                                    <th
                                        className="p-4 px-6 font-bold text-neutral-600 uppercase text-xs tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors group w-24"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center">
                                            ID <SortIcon column="id" />
                                        </div>
                                    </th>
                                    <th
                                        className="p-4 px-6 font-bold text-neutral-600 uppercase text-xs tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors group"
                                        onClick={() => handleSort('categoryName')}
                                    >
                                        <div className="flex items-center">
                                            Parent Category <SortIcon column="categoryName" />
                                        </div>
                                    </th>
                                    <th
                                        className="p-4 px-6 font-bold text-neutral-600 uppercase text-xs tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors group"
                                        onClick={() => handleSort('subcategoryName')}
                                    >
                                        <div className="flex items-center">
                                            Subcategory Name <SortIcon column="subcategoryName" />
                                        </div>
                                    </th>
                                    <th
                                        className="p-4 px-6 font-bold text-neutral-600 uppercase text-xs tracking-wider text-center"
                                    >
                                        Image
                                    </th>
                                    <th
                                        className="p-4 px-6 font-bold text-neutral-600 uppercase text-xs tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors group text-center"
                                        onClick={() => handleSort('totalProduct')}
                                    >
                                        <div className="flex items-center justify-center">
                                            Total Products <SortIcon column="totalProduct" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 bg-white">
                                {displayedSubcategories.map((subcategory, index) => {
                                    const rawId = subcategory._id || (subcategory as any).id || '';
                                    const shortId = rawId.length > 8 ? '#' + rawId.slice(-6) : '#' + rawId;
                                    return (
                                    <motion.tr
                                        key={rawId || index}
                                        className="hover:bg-neutral-50/80 transition-colors group text-sm text-neutral-700"
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <td className="p-4 px-6 align-middle">
                                            <span className="font-mono text-xs font-semibold text-[var(--primary-darker)] bg-[var(--primary-alpha-10)] px-2.5 py-1 rounded-lg border border-[var(--primary-alpha-20)]">
                                                {shortId}
                                            </span>
                                        </td>
                                        <td className="p-4 px-6 align-middle font-medium text-neutral-800">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                                                {subcategory.categoryName}
                                            </span>
                                        </td>
                                        <td className="p-4 px-6 align-middle font-bold text-neutral-900">{subcategory.subcategoryName}</td>
                                        <td className="p-4 px-6 align-middle text-center">
                                            <div className="w-14 h-12 bg-neutral-50 border border-neutral-200 rounded-xl p-1 flex items-center justify-center mx-auto shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                                                <img
                                                    src={subcategory.subcategoryImage || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=160&q=80'}
                                                    alt={subcategory.subcategoryName}
                                                    className="max-w-full max-h-full object-cover rounded-lg"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=160&q=80';
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 px-6 align-middle text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                {subcategory.totalProduct || 0} Products
                                            </span>
                                        </td>
                                    </motion.tr>
                                    );
                                })}
                                {displayedSubcategories.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-14 text-center text-neutral-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-3">
                                                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-neutral-900">No subcategories found</h3>
                                                <p className="text-neutral-500 text-sm mt-1">Try adjusting your search query</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                 {/* Pagination Footer */}
                 {filteredSubcategories.length > 0 && (
                    <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                        <div>
                            Showing <span className="font-semibold text-neutral-900">{startIndex + 1}</span> to <span className="font-semibold text-neutral-900">{Math.min(endIndex, sortedSubcategories.length)}</span> of <span className="font-semibold text-neutral-900">{sortedSubcategories.length}</span> entries
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white disabled:opacity-50 hover:bg-neutral-50 transition-colors shadow-2xs"
                            >
                                Previous
                            </button>
                            <span className="text-xs font-semibold px-2 text-neutral-700">Page {currentPage} of {displayTotalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(displayTotalPages, prev + 1))}
                                disabled={currentPage >= displayTotalPages}
                                className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white disabled:opacity-50 hover:bg-neutral-50 transition-colors shadow-2xs"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="text-center py-4">
                <p className="text-sm text-neutral-500">
                Copyright © 2025. Developed By{' '}
                <Link to="/seller" className="text-[var(--primary-dark)] hover:text-[var(--primary-darker)] font-medium hover:underline">
                    Ecommerce
                </Link>
                </p>
            </footer>
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                            <h2 className="text-lg font-semibold text-neutral-900">Create Subcategory</h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-6 py-4">
                            {formErrors.submit && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                    {formErrors.submit}
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Parent Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.parentId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${formErrors.parentId ? "border-red-300" : "border-neutral-300"}`}
                                >
                                    <option value="">Select parent category</option>
                                    {ownCategories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.parentId && (
                                    <p className="mt-1 text-xs text-red-600">{formErrors.parentId}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Subcategory Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${formErrors.name ? "border-red-300" : "border-neutral-300"}`}
                                    placeholder="Enter subcategory name"
                                />
                                {formErrors.name && (
                                    <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Subcategory Image
                                </label>
                                <label
                                    className={`block border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                                        isDragging ? "border-[var(--primary-color)] bg-[var(--primary-color)]/10" : "border-neutral-300 hover:border-[var(--primary-color)]"
                                    }`}
                                    onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                                    onDrop={async (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsDragging(false);
                                        const file = e.dataTransfer.files?.[0];
                                        if (file) await processFile(file);
                                    }}
                                >
                                    {imagePreview ? (
                                        <div className="space-y-2">
                                            <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                                            <p className="text-xs text-neutral-600">{imageFile?.name || "Selected image"}</p>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setImagePreview('');
                                                    setImageFile(null);
                                                    setFormData(prev => ({ ...prev, image: '' }));
                                                }}
                                                className="text-xs text-red-600 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="py-4">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2 text-neutral-400">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            <p className="text-xs text-neutral-600">{isDragging ? "Drop image here" : "Choose File or Drag & Drop"}</p>
                                            <p className="text-xs text-neutral-500 mt-1">Max 5MB</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                                {formErrors.image && (
                                    <p className="mt-1 text-xs text-red-600">{formErrors.image}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveSubcategory}
                                disabled={submitting || uploading}
                                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                                    submitting || uploading ? "bg-neutral-400 cursor-not-allowed" : "bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]"
                                }`}
                            >
                                {submitting ? "Saving..." : uploading ? "Uploading..." : "Create Subcategory"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
