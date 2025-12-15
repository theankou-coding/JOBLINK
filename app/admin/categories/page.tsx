"use client";

import { useState, useEffect } from "react";
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Search,
  TrendingUp,
  Users,
  Briefcase,
  Tag,
  ArrowUpDown,
  MoreVertical,
  Download,
  AlertCircle,
} from "lucide-react";

interface JobCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  jobCount: number;
  activeJobs: number;
  isActive: boolean;
  icon: string;
  color: string;
  subcategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  jobCount: number;
}

export default function JobCategoriesPage() {
  const [isLoading] = useState(true);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [filteredCategories] = useState<JobCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<string>("all"); // all, active, inactive
  const [sortBy, setSortBy] = useState<string>("name"); // name, jobCount, date
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<JobCategory | null>(
    null
  );

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "Briefcase",
    color: "#3b82f6", // blue-500
    isActive: true,
  });

  // Icons available for categories
  const availableIcons = [
    {
      id: "Briefcase",
      label: "Briefcase",
      component: <Briefcase className="w-4 h-4" />,
    },
    { id: "Users", label: "Users", component: <Users className="w-4 h-4" /> },
    {
      id: "TrendingUp",
      label: "Trending",
      component: <TrendingUp className="w-4 h-4" />,
    },
    { id: "Tag", label: "Tag", component: <Tag className="w-4 h-4" /> },
    { id: "Code", label: "Code", component: <span>{"</>"}</span> },
    { id: "Building", label: "Building", component: <span>🏢</span> },
    { id: "Medical", label: "Medical", component: <span>🏥</span> },
    { id: "Education", label: "Education", component: <span>🎓</span> },
    { id: "Car", label: "Transport", component: <span>🚗</span> },
    { id: "Shopping", label: "Retail", component: <span>🛒</span> },
    { id: "Food", label: "Food", component: <span>🍽️</span> },
    { id: "Art", label: "Creative", component: <span>🎨</span> },
  ];

  const colors = [
    { id: "blue", value: "#3b82f6", name: "Blue" },
    { id: "green", value: "#10b981", name: "Green" },
    { id: "purple", value: "#8b5cf6", name: "Purple" },
    { id: "orange", value: "#f97316", name: "Orange" },
    { id: "pink", value: "#ec4899", name: "Pink" },
    { id: "cyan", value: "#06b6d4", name: "Cyan" },
    { id: "amber", value: "#f59e0b", name: "Amber" },
    { id: "red", value: "#ef4444", name: "Red" },
  ];

  // Mock data - in real app, fetch from API
  useEffect(() => {}, []);

  // Filter and sort categories
  useEffect(() => {
    let result = [...categories];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply active/inactive filter
    if (filterActive === "active") {
      result = result.filter((cat) => cat.isActive);
    } else if (filterActive === "inactive") {
      result = result.filter((cat) => !cat.isActive);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "jobCount":
          aValue = a.jobCount;
          bValue = b.jobCount;
          break;
        case "activeJobs":
          aValue = a.activeJobs;
          bValue = b.activeJobs;
          break;
        case "date":
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [categories, searchTerm, filterActive, sortBy, sortOrder]);

  // Handle category selection
  const handleSelectCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  // Open add modal
  const openAddModal = () => {
    setCategoryForm({
      name: "",
      slug: "",
      description: "",
      icon: "Briefcase",
      color: "#3b82f6",
      isActive: true,
    });
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (category: JobCategory) => {
    setCurrentCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color,
      isActive: category.isActive,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (category: JobCategory) => {
    setCurrentCategory(category);
    setShowDeleteModal(true);
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryForm.name.trim()) {
      alert("Category name is required");
      return;
    }

    const newCategory: JobCategory = {
      id: currentCategory?.id || `cat_${Date.now()}`,
      name: categoryForm.name,
      slug: categoryForm.slug || generateSlug(categoryForm.name),
      description: categoryForm.description,
      jobCount: currentCategory?.jobCount || 0,
      activeJobs: currentCategory?.activeJobs || 0,
      isActive: categoryForm.isActive,
      icon: categoryForm.icon,
      color: categoryForm.color,
      subcategories: currentCategory?.subcategories || [],
      createdAt:
        currentCategory?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (showEditModal && currentCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((cat) => (cat.id === currentCategory.id ? newCategory : cat))
      );
    } else {
      // Add new category
      setCategories((prev) => [...prev, newCategory]);
    }

    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentCategory(null);
  };

  // Handle delete
  const handleDelete = () => {
    if (currentCategory) {
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== currentCategory.id)
      );
      setShowDeleteModal(false);
      setCurrentCategory(null);
      setSelectedCategories((prev) =>
        prev.filter((id) => id !== currentCategory.id)
      );
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    switch (action) {
      case "activate":
        setCategories((prev) =>
          prev.map((cat) =>
            selectedCategories.includes(cat.id)
              ? { ...cat, isActive: true }
              : cat
          )
        );
        break;
      case "deactivate":
        setCategories((prev) =>
          prev.map((cat) =>
            selectedCategories.includes(cat.id)
              ? { ...cat, isActive: false }
              : cat
          )
        );
        break;
      case "delete":
        if (window.confirm(`Delete ${selectedCategories.length} categories?`)) {
          setCategories((prev) =>
            prev.filter((cat) => !selectedCategories.includes(cat.id))
          );
          setSelectedCategories([]);
        }
        break;
    }
  };

  // Toggle category status
  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/30 to-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FolderTree className="w-6 h-6 text-blue-600" />
              Job Categories
            </h1>
            <p className="text-gray-600">
              Manage job categories and subcategories
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Categories</div>
            <div className="text-2xl font-bold text-gray-900">
              {categories.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Active Categories</div>
            <div className="text-2xl font-bold text-green-600">
              {categories.filter((c) => c.isActive).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Jobs</div>
            <div className="text-2xl font-bold text-gray-900">
              {categories
                .reduce((sum, cat) => sum + cat.jobCount, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Active Jobs</div>
            <div className="text-2xl font-bold text-blue-600">
              {categories
                .reduce((sum, cat) => sum + cat.activeJobs, 0)
                .toLocaleString()}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="name">Sort by Name</option>
                <option value="jobCount">Sort by Job Count</option>
                <option value="activeJobs">Sort by Active Jobs</option>
                <option value="date">Sort by Date</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCategories.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-100 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedCategories.length} categories selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("activate")}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction("deactivate")}
                  className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-blue-100">
            <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Your First Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-white rounded-xl border ${
                  category.isActive ? "border-blue-100" : "border-gray-200"
                } shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Category Header */}
                <div className="p-6 border-b border-blue-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        {availableIcons.find(
                          (icon) => icon.id === category.icon
                        )?.component || <Briefcase className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">{category.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleSelectCategory(category.id)}
                        className="rounded border-blue-300"
                      />
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-bold text-gray-900">
                          {category.jobCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Total Jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">
                          {category.activeJobs.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Active</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Subcategories
                  </h4>
                  <div className="space-y-2">
                    {category.subcategories.slice(0, 3).map((subcat) => (
                      <div
                        key={subcat.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{subcat.name}</span>
                        <span className="text-gray-900 font-medium">
                          {subcat.jobCount}
                        </span>
                      </div>
                    ))}
                    {category.subcategories.length > 3 && (
                      <div className="text-center pt-2">
                        <button className="text-blue-600 text-sm hover:text-blue-700">
                          + {category.subcategories.length - 3} more
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-blue-50 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Updated {category.updatedAt}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Category Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {showEditModal ? "Edit Category" : "Add New Category"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => {
                        setCategoryForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                        if (!categoryForm.slug) {
                          setCategoryForm((prev) => ({
                            ...prev,
                            slug: generateSlug(e.target.value),
                          }));
                        }
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="e.g., Technology & IT"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={categoryForm.slug}
                      onChange={(e) =>
                        setCategoryForm((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="technology-it"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Describe this category..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {availableIcons.map((icon) => (
                        <button
                          key={icon.id}
                          type="button"
                          onClick={() =>
                            setCategoryForm((prev) => ({
                              ...prev,
                              icon: icon.id,
                            }))
                          }
                          className={`p-2 rounded-lg border ${
                            categoryForm.icon === icon.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          {icon.component}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() =>
                            setCategoryForm((prev) => ({
                              ...prev,
                              color: color.value,
                            }))
                          }
                          className={`p-3 rounded-lg border ${
                            categoryForm.color === color.value
                              ? "ring-2 ring-blue-500"
                              : "border-gray-200"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={categoryForm.isActive}
                      onChange={(e) =>
                        setCategoryForm((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      className="rounded border-blue-300"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                      Active Category
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {showEditModal ? "Update Category" : "Add Category"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && currentCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Delete Category
                  </h2>
                  <p className="text-gray-600">
                    Are you sure you want to delete
                    <span className="font-semibold">
                      {currentCategory.name}
                    </span>
                    This will affect {currentCategory.jobCount} jobs.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
