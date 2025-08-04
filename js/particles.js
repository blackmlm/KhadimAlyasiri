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
        // Enhanced particle counts for better visual effects
        const isMobile = window.innerWidth < 768;
        const isSmallMobile = window.innerWidth < 480;
        
        let particleCount;
        if (isSmallMobile) {
            particleCount = Math.min(25, window.innerWidth / 30);
        } else if (isMobile) {
            particleCount = Math.min(40, window.innerWidth / 20);
        } else {
            particleCount = Math.min(100, window.innerWidth / 15);
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
                vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
                vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
                radius: Math.random() * (isMobile ? 2.5 : 4) + 0.8,
                opacity: Math.random() * (isMobile ? 0.7 : 0.9) + 0.4,
                color: color,
                twinkle: Math.random() * 0.03 + 0.015, // Enhanced twinkling
                pulsePhase: Math.random() * Math.PI * 2, // For pulsing effect
                driftSpeed: Math.random() * 0.5 + 0.2 // Gentle drift movement
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
        const time = Date.now() * 0.001; // Time for animations
        
        this.particles.forEach(particle => {
            // Enhanced mouse interaction with attraction and repulsion
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const attractionForce = force * 0.008;
                particle.vx += (dx / distance) * attractionForce;
                particle.vy += (dy / distance) * attractionForce;
            }
            
            // Add gentle drift movement
            particle.vx += Math.sin(time * particle.driftSpeed + particle.pulsePhase) * 0.002;
            particle.vy += Math.cos(time * particle.driftSpeed + particle.pulsePhase) * 0.002;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Enhanced boundary collision with smooth wrapping
            if (particle.x < -10) {
                particle.x = this.canvas.width + 10;
                particle.vx *= 0.8;
            }
            if (particle.x > this.canvas.width + 10) {
                particle.x = -10;
                particle.vx *= 0.8;
            }
            if (particle.y < -10) {
                particle.y = this.canvas.height + 10;
                particle.vy *= 0.8;
            }
            if (particle.y > this.canvas.height + 10) {
                particle.y = -10;
                particle.vy *= 0.8;
            }
            
            // Enhanced twinkling with pulsing effect
            particle.pulsePhase += particle.twinkle;
            const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
            particle.opacity = Math.max(0.3, Math.min(1, pulse));
            
            // Enhanced radius pulsing
            particle.baseRadius = particle.baseRadius || particle.radius;
            particle.radius = particle.baseRadius * (0.8 + Math.sin(time * 2 + particle.pulsePhase) * 0.2);
            
            // Smooth damping for floating effect
            particle.vx *= 0.992;
            particle.vy *= 0.992;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Enhanced particle connections with gradient lines
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 140) {
                    this.ctx.save();
                    
                    // Create gradient line
                    const gradient = this.ctx.createLinearGradient(
                        particle.x, particle.y, otherParticle.x, otherParticle.y
                    );
                    gradient.addColorStop(0, `rgba(100, 116, 139, ${(140 - distance) / 140 * 0.25})`);
                    gradient.addColorStop(0.5, `rgba(148, 163, 184, ${(140 - distance) / 140 * 0.4})`);
                    gradient.addColorStop(1, `rgba(100, 116, 139, ${(140 - distance) / 140 * 0.25})`);
                    
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = (140 - distance) / 140 * 1.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
        
        // Enhanced particles with multiple glow layers
        this.particles.forEach(particle => {
            this.ctx.save();
            
            // Outer soft glow
            this.ctx.globalAlpha = particle.opacity * 0.15;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 3.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Middle glow
            this.ctx.globalAlpha = particle.opacity * 0.4;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 2.2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Inner bright particle
            this.ctx.globalAlpha = particle.opacity * 0.8;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Bright white core
            this.ctx.globalAlpha = Math.min(1, particle.opacity * 1.2);
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 0.4, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add sparkle effect for some particles
            if (Math.random() < 0.1) {
                this.ctx.globalAlpha = particle.opacity * 0.8;
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                
                // Draw sparkle rays
                for (let i = 0; i < 4; i++) {
                    const angle = (i * Math.PI) / 2 + Date.now() * 0.002;
                    const rayLength = particle.radius * 1.8;
                    this.ctx.beginPath();
                    this.ctx.moveTo(
                        particle.x + Math.cos(angle) * particle.radius * 0.3,
                        particle.y + Math.sin(angle) * particle.radius * 0.3
                    );
                    this.ctx.lineTo(
                        particle.x + Math.cos(angle) * rayLength,
                        particle.y + Math.sin(angle) * rayLength
                    );
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    this.ctx.stroke();
                }
            }
            
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