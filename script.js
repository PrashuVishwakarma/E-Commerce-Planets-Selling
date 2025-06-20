 // Cart functionality
        let cart = [];
        let cartCount = 0;

        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionName).classList.add('active');
            
            // Update cart display if cart section is shown
            if (sectionName === 'cart') {
                updateCartDisplay();
            }
        }

        function addToCart(name, price, emoji) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    emoji: emoji,
                    quantity: 1
                });
            }
            
            cartCount++;
            updateCartCount();
            showNotification(`${name} added to cart!`);
        }

        function removeFromCart(name) {
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                cartCount -= cart[itemIndex].quantity;
                cart.splice(itemIndex, 1);
                updateCartCount();
                updateCartDisplay();
                showNotification(`${name} removed from cart!`);
            }
        }

        function updateQuantity(name, change) {
            const item = cart.find(item => item.name === name);
            if (item) {
                const newQuantity = item.quantity + change;
                if (newQuantity > 0) {
                    item.quantity = newQuantity;
                    cartCount += change;
                } else {
                    removeFromCart(name);
                    return;
                }
                updateCartCount();
                updateCartDisplay();
            }
        }

        function updateCartCount() {
            document.getElementById('cart-count').textContent = cartCount;
        }

        function updateCartDisplay() {
            const cartContent = document.getElementById('cart-content');
            
            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div class="empty-cart">
                        <h3>Your cart is empty</h3>
                        <p>Add some planets to get started!</p>
                        <button class="cta-button" onclick="showSection('planets')" style="margin-top: 1rem;">Browse Planets</button>
                    </div>
                `;
                return;
            }

            let total = 0;
            let itemsHTML = '';

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                itemsHTML += `
                    <div class="cart-item">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 2rem;">${item.emoji}</span>
                            <div>
                                <div style="font-weight: bold; color: #00d4ff;">${item.name}</div>
                                <div style="color: #ff6b6b;">${item.price.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button onclick="updateQuantity('${item.name}', -1)" style="background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">-</button>
                            <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.name}', 1)" style="background: #00d4ff; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">+</button>
                            <button onclick="removeFromCart('${item.name}')" style="background: #ff3333; color: white; border: none; border-radius: 5px; padding: 0.5rem 1rem; cursor: pointer; margin-left: 1rem;">Remove</button>
                        </div>
                    </div>
                `;
            });

            cartContent.innerHTML = `
                <div class="cart-items">
                    ${itemsHTML}
                </div>
                <div class="cart-total">
                    Total: ${total.toLocaleString()}
                </div>
                <button class="checkout-button" onclick="checkout()">
                    Proceed to Checkout 🚀
                </button>
            `;
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }

            // Calculate total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Show checkout modal
            showModal(`
                <h3 style="color: #00d4ff; margin-bottom: 1rem;">Checkout Confirmation</h3>
                <p style="margin-bottom: 1rem;">You are about to purchase ${cartCount} planet(s) for a total of:</p>
                <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b6b; margin-bottom: 2rem;">${total.toLocaleString()}</div>
                <div style="margin-bottom: 2rem;">
                    <strong>Delivery Information:</strong><br>
                    • Quantum teleportation delivery within 24 hours<br>
                    • Free orbital positioning service<br>
                    • Lifetime warranty included<br>
                    • 24/7 planetary support
                </div>
                <button onclick="confirmPurchase()" style="background: linear-gradient(45deg, #00d4ff, #0099cc); color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-right: 1rem;">Confirm Purchase</button>
                <button onclick="closeModal()" style="background: #666; color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-size: 1.1rem; cursor: pointer;">Cancel</button>
            `);
        }

        function confirmPurchase() {
            // Simulate purchase process
            showNotification('Processing your galactic purchase...');
            
            setTimeout(() => {
                showNotification('🎉 Purchase successful! Your planets will arrive within 24 hours!');
                cart = [];
                cartCount = 0;
                updateCartCount();
                updateCartDisplay();
                closeModal();
                showSection('home');
            }, 2000);
        }

        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        function showModal(content) {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modal-body');
            modalBody.innerHTML = content;
            modal.classList.add('active');
        }

        function closeModal() {
            const modal = document.getElementById('modal');
            modal.classList.remove('active');
        }

        // Planet details functionality
        function showPlanetDetails(name, price, emoji, description) {
            const detailsContent = `
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
                    <h3 style="color: #00d4ff; margin-bottom: 0.5rem;">${name}</h3>
                    <div style="font-size: 1.5rem; color: #ff6b6b; font-weight: bold; margin-bottom: 1rem;">${price.toLocaleString()}</div>
                </div>
                <div style="margin-bottom: 2rem; line-height: 1.6;">
                    <p>${description}</p>
                    <br>
                    <p><strong>Specifications:</strong></p>
                    <ul style="text-align: left; margin-left: 2rem; margin-top: 1rem;">
                        <li>Atmosphere: Breathable oxygen-nitrogen mix</li>
                        <li>Gravity: 0.8 - 1.2 Earth gravity</li>
                        <li>Temperature: 15-25°C average</li>
                        <li>Water coverage: 60-80%</li>
                        <li>Biodiversity: High</li>
                        <li>Mineral resources: Abundant</li>
                    </ul>
                </div>
                <button onclick="addToCart('${name}', ${price}, '${emoji}')" style="background: linear-gradient(45deg, #ff6b6b, #ff8e8e); color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-right: 1rem;">Add to Cart</button>
                <button onclick="closeModal()" style="background: #666; color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-size: 1.1rem; cursor: pointer;">Close</button>
            `;
            
            showModal(detailsContent);
        }

        // Enhanced planet cards with click handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Add click handlers to planet cards for details view
            const planetCards = document.querySelectorAll('.planet-card');
            planetCards.forEach((card, index) => {
                const planetImage = card.querySelector('.planet-image');
                const planetName = card.querySelector('.planet-name');
                const planetPrice = card.querySelector('.planet-price');
                const planetDescription = card.querySelector('.planet-description');
                
                planetImage.style.cursor = 'pointer';
                planetImage.addEventListener('click', function() {
                    const name = planetName.textContent;
                    const price = parseInt(planetPrice.textContent.replace(/[^0-9]/g, ''));
                    const emoji = planetImage.textContent;
                    const description = planetDescription.textContent;
                    
                    showPlanetDetails(name, price, emoji, description);
                });
            });

            // Add scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all cards and sections
            document.querySelectorAll('.planet-card, .feature-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });

            // Add floating animation to planet emojis
            const planetEmojis = document.querySelectorAll('.planet-image');
            planetEmojis.forEach(emoji => {
                emoji.style.animation = 'float 3s ease-in-out infinite';
            });

            // Add floating keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .planet-image:hover {
                    animation: float 1s ease-in-out infinite;
                    transform: scale(1.05);
                }
            `;
            document.head.appendChild(style);
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add search functionality
        function addSearchFunctionality() {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search planets...';
            searchInput.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 25px;
                padding: 0.5rem 1rem;
                color: white;
                margin-right: 1rem;
                width: 200px;
            `;
            
            // Add to navigation
            const navMenu = document.querySelector('.nav-menu');
            const searchLi = document.createElement('li');
            searchLi.appendChild(searchInput);
            navMenu.appendChild(searchLi);
            
            // Search functionality
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const planetCards = document.querySelectorAll('.planet-card');
                
                planetCards.forEach(card => {
                    const planetName = card.querySelector('.planet-name').textContent.toLowerCase();
                    const planetDescription = card.querySelector('.planet-description').textContent.toLowerCase();
                    
                    if (planetName.includes(searchTerm) || planetDescription.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = searchTerm ? 'none' : 'block';
                    }
                });
            });
        }

        // Initialize search functionality
        document.addEventListener('DOMContentLoaded', addSearchFunctionality);

        // Add some dynamic effects
        function addDynamicEffects() {
            // Parallax effect for hero section
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });

            // Random star field animation
            function createStars() {
                const starsContainer = document.createElement('div');
                starsContainer.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                `;
                
                for (let i = 0; i < 100; i++) {
                    const star = document.createElement('div');
                    star.style.cssText = `
                        position: absolute;
                        width: 2px;
                        height: 2px;
                        background: white;
                        border-radius: 50%;
                        top: ${Math.random() * 100}%;
                        left: ${Math.random() * 100}%;
                        animation: twinkle ${Math.random() * 3 + 1}s infinite;
                    `;
                    starsContainer.appendChild(star);
                }
                
                document.body.appendChild(starsContainer);
                
                // Add twinkle animation
                const twinkleStyle = document.createElement('style');
                twinkleStyle.textContent = `
                    @keyframes twinkle {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 1; }
                    }
                `;
                document.head.appendChild(twinkleStyle);
            }
            
            createStars();
        }

        // Initialize dynamic effects
        document.addEventListener('DOMContentLoaded', addDynamicEffects);

        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        showSection('home');
                        break;
                    case '2':
                        e.preventDefault();
                        showSection('planets');
                        break;
                    case '3':
                        e.preventDefault();
                        showSection('cart');
                        break;
                }
            }
        });

        // Welcome message
        setTimeout(() => {
            showNotification('Welcome to CosmicMart! 🌟 Discover your perfect planet today');
        }, 1000);