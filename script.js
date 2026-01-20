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

function loadProducts() {
    const stored = localStorage.getItem('velart_produtos');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return defaultProducts;
        }
    }
    return defaultProducts;
}

const produtos = loadProducts();

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentShareProduct = null;

function loadCategories() {
    const stored = localStorage.getItem('velart_categorias');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return null;
        }
    }
    return null;
}

const categoriesData = loadCategories();

function getCategoryName(categoryId) {
    if (categoriesData) {
        const category = categoriesData.find(c => c.id === categoryId);
        if (category) return category.name;
    }
    
    const defaultNames = {
        'floral': 'Floral',
        'citrico': 'Cítrico',
        'amadeirado': 'Amadeirado',
        'especiarias': 'Especiarias'
    };
    return defaultNames[categoryId] || categoryId;
}

function renderProdutos(filter = 'all') {
    const grid = document.getElementById('produtosGrid');
    const filteredProdutos = filter === 'all' 
        ? produtos 
        : produtos.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProdutos.map(produto => `
        <div class="produto-card" data-category="${produto.category}">
            <img src="${produto.image}" alt="${produto.name}" class="produto-img">
            <div class="produto-info">
                <span class="produto-category">${getCategoryName(produto.category)}</span>
                <h3 class="produto-name">${produto.name}</h3>
                <p class="produto-description">${produto.description}</p>
                <div class="produto-footer">
                    <span class="produto-price">€ ${produto.price.toFixed(2)}</span>
                    <div class="produto-actions">
                        <button class="add-to-cart" onclick="addToCart(${produto.id})" title="Adicionar ao carrinho">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="share-product" onclick="openShareModal(${produto.id})" title="Compartilhar">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(categoryId) {
    if (categoriesData) {
        const category = categoriesData.find(c => c.id === categoryId);
        if (category) return category.name;
    }
    
    const defaultNames = {
        'floral': 'Floral',
        'citrico': 'Cítrico',
        'amadeirado': 'Amadeirado',
        'especiarias': 'Especiarias'
    };
    return defaultNames[categoryId] || categoryId;
}

function addToCart(productId) {
    const produto = produtos.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...produto,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${produto.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        document.getElementById('cartTotal').textContent = '€ 0,00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">€ ${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartSubtotal').textContent = `€ ${total.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `€ ${total.toFixed(2)}`;
}

function openShareModal(productId) {
    currentShareProduct = produtos.find(p => p.id === productId);
    document.getElementById('shareModal').classList.add('active');
}

function closeShareModal() {
    document.getElementById('shareModal').classList.remove('active');
    currentShareProduct = null;
}

function shareProduct(platform) {
    if (!currentShareProduct) return;
    
    const productUrl = window.location.href;
    const text = `Confira essa vela aromática: ${currentShareProduct.name} - ${currentShareProduct.description}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(productUrl);
    
    let shareUrl = '';
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'instagram':
            showNotification('Copie o link e compartilhe no Instagram Stories!');
            copyToClipboard(productUrl);
            return;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case 'copy':
            copyToClipboard(productUrl);
            showNotification('Link copiado para a área de transferência!');
            closeShareModal();
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
        closeShareModal();
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProdutos();
    updateCartCount();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProdutos(btn.dataset.filter);
        });
    });
    
    document.getElementById('cartBtn').addEventListener('click', () => {
        document.getElementById('cartModal').classList.add('active');
        renderCart();
    });
    
    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartModal').classList.remove('active');
    });
    
    document.getElementById('closeShare').addEventListener('click', closeShareModal);
    
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            shareProduct(btn.dataset.platform);
        });
    });
    
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Seu carrinho está vazio!');
            return;
        }
        
        document.getElementById('cartModal').classList.remove('active');
        openPaymentModal();
    });
    
    document.getElementById('contatoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;
        
        const whatsappMessage = `Olá! Meu nome é ${nome}.\n\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem: ${mensagem}`;
        const whatsappUrl = `https://wa.me/351912345678?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        showNotification('Redirecionando para o WhatsApp...');
        e.target.reset();
    });
    
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });
    
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target.id === 'cartModal') {
            document.getElementById('cartModal').classList.remove('active');
        }
    });
    
    document.getElementById('shareModal').addEventListener('click', (e) => {
        if (e.target.id === 'shareModal' || e.target.classList.contains('modal-overlay')) {
            closeShareModal();
        }
    });
    
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target.id === 'cartModal' || e.target.classList.contains('modal-overlay')) {
            document.getElementById('cartModal').classList.remove('active');
        }
    });
    
    const continueShopping = document.getElementById('continueShopping');
    if (continueShopping) {
        continueShopping.addEventListener('click', () => {
            document.getElementById('cartModal').classList.remove('active');
        });
    }
    
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
        
        const scrollProgress = document.getElementById('scroll-progress');
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        const header = document.querySelector('header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.produto-card, .feature-item, .sobre-content > *, .section-header').forEach(el => {
        observer.observe(el);
    });
    
    setupPaymentModal();
});

function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('paymentTotal').textContent = `€ ${total.toFixed(2)}`;
    document.getElementById('multibancoAmount').textContent = `€ ${total.toFixed(2)}`;
    
    const orderItemsContainer = document.getElementById('paymentOrderItems');
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="payment-order-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">${item.quantity}x unidade(s)</div>
            </div>
            <div class="item-price">€ ${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function setupPaymentModal() {
    document.getElementById('closePayment').addEventListener('click', () => {
        document.getElementById('paymentModal').classList.remove('active');
    });
    
    document.getElementById('backToCart').addEventListener('click', () => {
        document.getElementById('paymentModal').classList.remove('active');
        document.getElementById('cartModal').classList.add('active');
    });
    
    document.getElementById('paymentModal').addEventListener('click', (e) => {
        if (e.target.id === 'paymentModal' || e.target.classList.contains('modal-overlay')) {
            document.getElementById('paymentModal').classList.remove('active');
        }
    });
    
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        const header = option.querySelector('.payment-option-header');
        
        header.addEventListener('click', () => {
            radio.checked = true;
            updatePaymentDetails();
        });
        
        radio.addEventListener('change', updatePaymentDetails);
    });
    
    function updatePaymentDetails() {
        document.querySelectorAll('.payment-details').forEach(detail => {
            detail.style.display = 'none';
        });
        
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const detailsId = selectedMethod + 'Details';
        const detailsElement = document.getElementById(detailsId);
        if (detailsElement) {
            detailsElement.style.display = 'block';
        }
    }
    
    document.getElementById('confirmPayment').addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerPostal = document.getElementById('customerPostal').value;
        const customerCity = document.getElementById('customerCity').value;
        const orderNotes = document.getElementById('orderNotes').value;
        
        if (!customerName || !customerEmail || !customerPhone || !customerAddress || !customerPostal || !customerCity) {
            showNotification('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemsList = cart.map(item => `${item.quantity}x ${item.name} - € ${(item.price * item.quantity).toFixed(2)}`).join('\n');
        
        let message = `🛍️ *NOVO PEDIDO*\n\n`;
        message += `📦 *Produtos:*\n${itemsList}\n\n`;
        message += `💰 *Total: € ${total.toFixed(2)}*\n\n`;
        message += `👤 *Dados do Cliente:*\n`;
        message += `Nome: ${customerName}\n`;
        message += `E-mail: ${customerEmail}\n`;
        message += `Telefone: ${customerPhone}\n\n`;
        message += `📍 *Morada de Envio:*\n`;
        message += `${customerAddress}\n`;
        message += `${customerPostal} ${customerCity}\n`;
        message += `Portugal\n\n`;
        
        if (orderNotes) {
            message += `📝 *Observações:* ${orderNotes}\n\n`;
        }
        
        if (selectedMethod === 'mbway') {
            const mbwayPhone = document.getElementById('mbwayPhone').value;
            if (!mbwayPhone) {
                showNotification('Por favor, insira o número de telemóvel para MB WAY!');
                return;
            }
            message += `💳 *Método de Pagamento:* MB WAY\n`;
            message += `📱 Número: ${mbwayPhone}\n`;
        } else if (selectedMethod === 'multibanco') {
            message += `💳 *Método de Pagamento:* Transferência Multibanco\n`;
            message += `_Aguardo os dados de pagamento_\n`;
        } else {
            message += `💳 *Método de Pagamento:* A definir via WhatsApp\n`;
        }
        
        const whatsappUrl = `https://wa.me/351912345678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        document.getElementById('paymentModal').classList.remove('active');
        cart = [];
        updateCart();
        
        showNotification('Pedido enviado com sucesso! Redirecionando para o WhatsApp...');
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
