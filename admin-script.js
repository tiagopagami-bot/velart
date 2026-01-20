const STORAGE_KEY = 'velart_produtos';
const SETTINGS_KEY = 'velart_settings';
const CATEGORIES_KEY = 'velart_categorias';

const defaultCategories = [
    {
        id: 'floral',
        name: 'Floral',
        icon: 'fa-flower',
        color: '#c9ac66',
        description: 'Aromas florais delicados e relaxantes',
        isDefault: true
    },
    {
        id: 'citrico',
        name: 'Cítrico',
        icon: 'fa-lemon',
        color: '#FFA500',
        description: 'Fragrâncias cítricas frescas e energizantes',
        isDefault: true
    },
    {
        id: 'amadeirado',
        name: 'Amadeirado',
        icon: 'fa-tree',
        color: '#8b7355',
        description: 'Notas amadeiradas profundas e sofisticadas',
        isDefault: true
    },
    {
        id: 'especiarias',
        name: 'Especiarias',
        icon: 'fa-pepper-hot',
        color: '#d2691e',
        description: 'Especiarias quentes e acolhedoras',
        isDefault: true
    }
];

const defaultProducts = [
    {
        id: 1,
        name: "Lavanda Francesa",
        description: "Aroma relaxante de lavanda pura",
        price: 24.90,
        category: "floral",
        image: "https://images.unsplash.com/photo-1602874801006-95415c52e0b2?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Rosa Sublime",
        description: "Delicado perfume de rosas frescas",
        price: 26.90,
        category: "floral",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Jasmim Noturno",
        description: "Aroma envolvente de jasmim",
        price: 28.50,
        category: "floral",
        image: "https://images.unsplash.com/photo-1615633222002-80534c6c7e9f?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Laranja Siciliana",
        description: "Energia cítrica revigorante",
        price: 22.90,
        category: "citrico",
        image: "https://images.unsplash.com/photo-1603006905175-cb6de25d0542?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Limão Verbena",
        description: "Frescor cítrico revitalizante",
        price: 23.90,
        category: "citrico",
        image: "https://images.unsplash.com/photo-1615634232158-0e6b4c4b1f5b?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Bergamota",
        description: "Aroma cítrico sofisticado",
        price: 25.50,
        category: "citrico",
        image: "https://images.unsplash.com/photo-1602874801058-5e4d2c5b1f1f?w=400&h=400&fit=crop"
    },
    {
        id: 7,
        name: "Sândalo Místico",
        description: "Aroma amadeirado profundo",
        price: 29.90,
        category: "amadeirado",
        image: "https://images.unsplash.com/photo-1602874801122-7239a5c6e1e9?w=400&h=400&fit=crop"
    },
    {
        id: 8,
        name: "Cedro do Himalaia",
        description: "Madeira nobre e aromática",
        price: 28.90,
        category: "amadeirado",
        image: "https://images.unsplash.com/photo-1615634752551-1b89fc2bd3d5?w=400&h=400&fit=crop"
    },
    {
        id: 9,
        name: "Canela & Cravo",
        description: "Especiarias quentes e acolhedoras",
        price: 26.50,
        category: "especiarias",
        image: "https://images.unsplash.com/photo-1603006905254-5b2e15f69b9c?w=400&h=400&fit=crop"
    },
    {
        id: 10,
        name: "Baunilha Bourbon",
        description: "Doçura cremosa e confortante",
        price: 27.90,
        category: "especiarias",
        image: "https://images.unsplash.com/photo-1615634690353-0ea4e8f0f1e1?w=400&h=400&fit=crop"
    },
    {
        id: 11,
        name: "Gengibre & Cardamomo",
        description: "Especiarias exóticas e vibrantes",
        price: 26.90,
        category: "especiarias",
        image: "https://images.unsplash.com/photo-1602874801077-70c6e0ec8ab5?w=400&h=400&fit=crop"
    },
    {
        id: 12,
        name: "Patchouli & Vetiver",
        description: "Amadeirado terroso e sofisticado",
        price: 30.50,
        category: "amadeirado",
        image: "https://images.unsplash.com/photo-1615634752584-b1e5e3e1e1e1?w=400&h=400&fit=crop"
    }
];

let products = [];
let currentEditId = null;
let currentImageData = null;
let categories = [];
let currentEditCategoryId = null;

function loadProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        products = JSON.parse(stored);
    } else {
        products = [...defaultProducts];
        saveProducts();
    }
}

function loadCategories() {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (stored) {
        categories = JSON.parse(stored);
    } else {
        categories = [...defaultCategories];
        saveCategories();
    }
}

function saveCategories() {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    updateCategoryFilters();
    updateMainSiteData();
}

function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    updateMainSiteData();
}

function updateMainSiteData() {
    localStorage.setItem('velart_products_updated', Date.now().toString());
}

function renderProducts(filter = 'all', sort = 'name') {
    let filteredProducts = filter === 'all' 
        ? [...products] 
        : products.filter(p => p.category === filter);
    
    switch(sort) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = filteredProducts.map(product => `
        <tr>
            <td>#${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td><strong>${product.name}</strong></td>
            <td><span class="category-badge category-${product.category}">${getCategoryName(product.category)}</span></td>
            <td>${product.description}</td>
            <td><strong>€ ${product.price.toFixed(2)}</strong></td>
            <td>
                <div class="action-buttons-table">
                    <button class="btn-sm btn-edit" onclick="editProduct(${product.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-delete" onclick="deleteProduct(${product.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updateStats();
}

function getCategoryName(category) {
    const names = {
        'floral': 'Floral',
        'citrico': 'Cítrico',
        'amadeirado': 'Amadeirado',
        'especiarias': 'Especiarias'
    };
    return names[category] || category;
}

function updateStats() {
    document.getElementById('totalProducts').textContent = products.length;
    
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    document.getElementById('avgPrice').textContent = `€ ${avgPrice.toFixed(2)}`;
}

function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');
    
    currentImageData = null;
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            title.textContent = 'Editar Produto';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productDescription').value = product.description;
            
            if (product.image.startsWith('data:')) {
                document.getElementById('imageSourceFile').checked = true;
                currentImageData = product.image;
                updateImageSourceSections();
            } else {
                document.getElementById('imageSourceUrl').checked = true;
                document.getElementById('productImageUrl').value = product.image;
                updateImageSourceSections();
            }
            
            showImagePreview(product.image);
            currentEditId = productId;
        }
    } else {
        title.textContent = 'Adicionar Produto';
        form.reset();
        document.getElementById('imageSourceFile').checked = true;
        updateImageSourceSections();
        document.getElementById('imagePreview').classList.remove('active');
        currentEditId = null;
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    currentEditId = null;
    currentImageData = null;
}

function updateImageSourceSections() {
    const fileSection = document.getElementById('fileUploadSection');
    const urlSection = document.getElementById('urlUploadSection');
    const fileRadio = document.getElementById('imageSourceFile');
    
    if (fileRadio.checked) {
        fileSection.classList.add('active');
        urlSection.classList.remove('active');
    } else {
        fileSection.classList.remove('active');
        urlSection.classList.add('active');
    }
}

function handleImageFileUpload(file) {
    if (!file) return;
    
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast('A imagem excede o tamanho máximo de 2MB!', 'danger');
        return;
    }
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showToast('Formato de imagem inválido! Use JPG, PNG ou WEBP.', 'danger');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            const maxDimension = 800;
            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = (height / width) * maxDimension;
                    width = maxDimension;
                } else {
                    width = (width / height) * maxDimension;
                    height = maxDimension;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            const quality = 0.8;
            currentImageData = canvas.toDataURL('image/jpeg', quality);
            
            showImagePreview(currentImageData);
            updateFileUploadLabel(file.name);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function updateFileUploadLabel(fileName) {
    const label = document.querySelector('.file-upload-label span');
    if (label) {
        label.textContent = `Imagem selecionada: ${fileName}`;
    }
}

function showImagePreview(url) {
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('previewImg');
    img.src = url;
    preview.classList.add('active');
}

function addProduct(productData) {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: newId,
        ...productData
    };
    products.push(newProduct);
    saveProducts();
    renderProducts();
    showToast('Produto adicionado com sucesso!');
}

function updateProduct(id, productData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = {
            id: id,
            ...productData
        };
        saveProducts();
        renderProducts();
        showToast('Produto atualizado com sucesso!');
    }
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Tem a certeza que deseja eliminar este produto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProducts();
        showToast('Produto eliminado com sucesso!', 'danger');
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    if (type === 'danger') {
        toast.style.background = '#f44336';
        icon.className = 'fas fa-exclamation-circle';
    } else {
        toast.style.background = '#4caf50';
        icon.className = 'fas fa-check-circle';
    }
    
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function switchSection(sectionName) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    const targetNav = document.querySelector(`[data-section="${sectionName}"]`);
    if (targetNav) {
        targetNav.classList.add('active');
    }
}

function exportData() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `produtos-velart-${Date.now()}.json`;
    link.click();
    showToast('Dados exportados com sucesso!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const importedProducts = JSON.parse(event.target.result);
                if (Array.isArray(importedProducts)) {
                    products = importedProducts;
                    saveProducts();
                    renderProducts();
                    showToast('Dados importados com sucesso!');
                } else {
                    showToast('Formato de arquivo inválido!', 'danger');
                }
            } catch (error) {
                showToast('Erro ao importar dados!', 'danger');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetDefaults() {
    if (confirm('Tem a certeza que deseja restaurar os produtos padrão? Esta ação não pode ser desfeita.')) {
        products = [...defaultProducts];
        saveProducts();
        renderProducts();
        showToast('Produtos restaurados para os padrões!');
    }
}

function saveSettings() {
    const settings = {
        storeName: document.getElementById('storeName').value,
        storeEmail: document.getElementById('storeEmail').value,
        storePhone: document.getElementById('storePhone').value,
        storeLocation: document.getElementById('storeLocation').value,
        socialInstagram: document.getElementById('socialInstagram').value,
        socialFacebook: document.getElementById('socialFacebook').value,
        socialPinterest: document.getElementById('socialPinterest').value,
        primaryColor: document.getElementById('primaryColor').value,
        secondaryColor: document.getElementById('secondaryColor').value
    };
    
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    showToast('Configurações guardadas com sucesso!');
}

function loadSettings() {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
        const settings = JSON.parse(stored);
        Object.keys(settings).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = settings[key];
            }
        });
    }
}

function resetSettings() {
    if (confirm('Tem a certeza que deseja resetar as configurações?')) {
        localStorage.removeItem(SETTINGS_KEY);
        location.reload();
    }
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    
    grid.innerHTML = categories.map(category => {
        const productCount = products.filter(p => p.category === category.id).length;
        const defaultClass = category.isDefault ? 'default' : '';
        
        return `
            <div class="category-card ${defaultClass}">
                <div class="category-card-header">
                    <div class="category-icon-wrapper" style="background: ${category.color}">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <div class="category-info">
                        <h3>${category.name}</h3>
                        <span class="category-slug">${category.id}</span>
                    </div>
                </div>
                
                <p class="category-description">${category.description || 'Sem descrição'}</p>
                
                <div class="category-stats">
                    <div class="category-stat">
                        <span class="category-stat-label">Produtos</span>
                        <span class="category-stat-value">${productCount}</span>
                    </div>
                </div>
                
                <div class="category-actions">
                    <button class="btn btn-outline" onclick="editCategory('${category.id}')">
                        <i class="fas fa-edit"></i>
                        <span>Editar</span>
                    </button>
                    ${!category.isDefault ? `
                        <button class="btn btn-outline" onclick="deleteCategory('${category.id}')" style="color: #f44336; border-color: #f44336;">
                            <i class="fas fa-trash"></i>
                            <span>Eliminar</span>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function updateCategoryFilters() {
    const filterSelect = document.getElementById('filterCategory');
    const productCategorySelect = document.getElementById('productCategory');
    
    if (filterSelect) {
        const currentValue = filterSelect.value;
        filterSelect.innerHTML = '<option value="all">Todas as Categorias</option>' +
            categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        filterSelect.value = currentValue;
    }
    
    if (productCategorySelect) {
        const currentValue = productCategorySelect.value;
        productCategorySelect.innerHTML = '<option value="">Selecione...</option>' +
            categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        productCategorySelect.value = currentValue;
    }
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryModalTitle');
    const form = document.getElementById('categoryForm');
    
    if (categoryId) {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            title.textContent = 'Editar Categoria';
            document.getElementById('categoryId').value = category.id;
            document.getElementById('categorySlug').value = category.id;
            document.getElementById('categorySlug').disabled = true;
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categoryIcon').value = category.icon;
            document.getElementById('categoryColor').value = category.color;
            document.getElementById('categoryDescription').value = category.description || '';
            currentEditCategoryId = categoryId;
        }
    } else {
        title.textContent = 'Adicionar Categoria';
        form.reset();
        document.getElementById('categorySlug').disabled = false;
        currentEditCategoryId = null;
    }
    
    modal.classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    currentEditCategoryId = null;
}

function addCategory(categoryData) {
    if (categories.find(c => c.id === categoryData.id)) {
        showToast('Já existe uma categoria com este identificador!', 'danger');
        return;
    }
    
    categories.push(categoryData);
    saveCategories();
    renderCategories();
    showToast('Categoria adicionada com sucesso!');
}

function updateCategory(id, categoryData) {
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories[index] = {
            ...categories[index],
            name: categoryData.name,
            icon: categoryData.icon,
            color: categoryData.color,
            description: categoryData.description
        };
        saveCategories();
        renderCategories();
        renderProducts();
        showToast('Categoria atualizada com sucesso!');
    }
}

function editCategory(id) {
    openCategoryModal(id);
}

function deleteCategory(id) {
    const category = categories.find(c => c.id === id);
    const productCount = products.filter(p => p.category === id).length;
    
    if (category.isDefault) {
        showToast('Não é possível eliminar categorias padrão!', 'danger');
        return;
    }
    
    if (productCount > 0) {
        showToast(`Esta categoria tem ${productCount} produto(s). Não é possível eliminar!`, 'danger');
        return;
    }
    
    if (confirm(`Tem a certeza que deseja eliminar a categoria "${category.name}"?`)) {
        categories = categories.filter(c => c.id !== id);
        saveCategories();
        renderCategories();
        showToast('Categoria eliminada com sucesso!', 'success');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCategories();
    loadSettings();
    renderProducts();
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.currentTarget.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                if (section) {
                    switchSection(section);
                }
            }
        });
    });
    
    document.getElementById('addProductBtn').addEventListener('click', () => {
        openProductModal();
    });
    
    document.getElementById('closeModal').addEventListener('click', closeProductModal);
    document.getElementById('cancelBtn').addEventListener('click', closeProductModal);
    
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal' || e.target.classList.contains('modal-overlay')) {
            closeProductModal();
        }
    });
    
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const imageSource = document.querySelector('input[name="imageSource"]:checked').value;
        let imageUrl;
        
        if (imageSource === 'file') {
            if (!currentImageData) {
                showToast('Por favor, selecione uma imagem!', 'danger');
                return;
            }
            imageUrl = currentImageData;
        } else {
            imageUrl = document.getElementById('productImageUrl').value;
            if (!imageUrl) {
                showToast('Por favor, insira a URL da imagem!', 'danger');
                return;
            }
        }
        
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('productPrice').value),
            image: imageUrl,
            description: document.getElementById('productDescription').value
        };
        
        if (currentEditId) {
            updateProduct(currentEditId, productData);
        } else {
            addProduct(productData);
        }
        
        closeProductModal();
    });
    
    document.querySelectorAll('input[name="imageSource"]').forEach(radio => {
        radio.addEventListener('change', updateImageSourceSections);
    });
    
    document.getElementById('productImageFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageFileUpload(file);
        }
    });
    
    document.getElementById('productImageUrl').addEventListener('input', (e) => {
        const url = e.target.value;
        if (url) {
            currentImageData = url;
            showImagePreview(url);
        }
    });
    
    document.getElementById('filterCategory').addEventListener('change', (e) => {
        const sort = document.getElementById('sortProducts').value;
        renderProducts(e.target.value, sort);
    });
    
    document.getElementById('sortProducts').addEventListener('change', (e) => {
        const filter = document.getElementById('filterCategory').value;
        renderProducts(filter, e.target.value);
    });
    
    document.getElementById('searchProducts').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#productsTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
    
    document.getElementById('refreshData').addEventListener('click', () => {
        loadProducts();
        loadCategories();
        renderProducts();
        renderCategories();
        showToast('Dados atualizados!');
    });
    
    document.getElementById('addCategoryBtn').addEventListener('click', () => {
        openCategoryModal();
    });
    
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('cancelCategoryBtn').addEventListener('click', closeCategoryModal);
    
    document.getElementById('categoryModal').addEventListener('click', (e) => {
        if (e.target.id === 'categoryModal' || e.target.classList.contains('modal-overlay')) {
            closeCategoryModal();
        }
    });
    
    document.getElementById('categoryForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const categoryData = {
            id: document.getElementById('categorySlug').value.toLowerCase(),
            name: document.getElementById('categoryName').value,
            icon: document.getElementById('categoryIcon').value,
            color: document.getElementById('categoryColor').value,
            description: document.getElementById('categoryDescription').value,
            isDefault: false
        };
        
        if (currentEditCategoryId) {
            updateCategory(currentEditCategoryId, categoryData);
        } else {
            addCategory(categoryData);
        }
        
        closeCategoryModal();
    });
});
