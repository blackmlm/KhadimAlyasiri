// Initialize Lucide Icons
lucide.createIcons({ strokeWidth: 1.5 });

// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        // Mobile optimization: reduce particle count significantly on mobile devices
        const isMobile = window.innerWidth < 768;
        const isSmallMobile = window.innerWidth < 480;
        
        let particleCount;
        if (isSmallMobile) {
            particleCount = Math.min(15, window.innerWidth / 40);
        } else if (isMobile) {
            particleCount = Math.min(25, window.innerWidth / 30);
        } else {
            particleCount = Math.min(50, window.innerWidth / 20);
        }
        
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            // Create professional particle colors
            const colorType = Math.random();
            let color;
            if (colorType < 0.4) {
                // Professional blue-gray
                color = `hsl(${210 + Math.random() * 20}, 25%, ${65 + Math.random() * 20}%)`;
            } else if (colorType < 0.7) {
                // Neutral gray
                color = `hsl(${220 + Math.random() * 10}, 15%, ${70 + Math.random() * 15}%)`;
            } else if (colorType < 0.9) {
                // Light silver
                color = `hsl(${0}, 0%, ${75 + Math.random() * 15}%)`;
            } else {
                // Subtle slate accent
                color = `hsl(${200 + Math.random() * 15}, 20%, ${60 + Math.random() * 20}%)`;
            }
            
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
                vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
                radius: Math.random() * (isMobile ? 2 : 3) + 0.5,
                opacity: Math.random() * (isMobile ? 0.6 : 0.8) + 0.3,
                color: color,
                twinkle: Math.random() * 0.02 + 0.01 // Add twinkling effect
            });
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles(); // Recreate particles on resize for mobile optimization
        });
        
        // Mouse and touch events for interaction
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Touch events for mobile devices
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        }, { passive: true });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse interaction with gentler force for space theme
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const force = (120 - distance) / 120;
                particle.vx += (dx / distance) * force * 0.005;
                particle.vy += (dy / distance) * force * 0.005;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Twinkling effect for stars
            particle.opacity += (Math.random() - 0.5) * particle.twinkle;
            particle.opacity = Math.max(0.2, Math.min(1, particle.opacity));
            
            // Gentler damping for floating effect
            particle.vx *= 0.995;
            particle.vy *= 0.995;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particle connections first (so they appear behind particles)
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.15;
                    this.ctx.strokeStyle = '#64748b'; // Professional slate for connections
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
        
        // Draw particles with glow effect
        this.particles.forEach(particle => {
            this.ctx.save();
            
            // Outer glow
            this.ctx.globalAlpha = particle.opacity * 0.3;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Inner bright particle
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Core bright center for star effect
            this.ctx.globalAlpha = Math.min(1, particle.opacity * 1.5);
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});