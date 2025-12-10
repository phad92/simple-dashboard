// ===== Dashboard Script =====

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    animateKPICounters();
    updateDateTime();
});

// ===== Update Date/Time =====
function updateDateTime() {
    const dateEl = document.getElementById('currentDate');
    const lastUpdatedEl = document.getElementById('lastUpdated');
    
    const now = new Date();
    const options = { month: 'long', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);
    
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    lastUpdatedEl.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

// ===== Animate KPI Counters =====
function animateKPICounters() {
    const counters = document.querySelectorAll('.kpi-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = prefix + formatNumber(Math.floor(current));
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = prefix + formatNumber(target);
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ===== Initialize Charts =====
function initializeCharts() {
    drawDonutChart('genderChart', [
        { value: 56.8, color: '#06b6d4' },
        { value: 43.2, color: '#ec4899' }
    ]);
    
    drawDonutChart('memberTypeChart', [
        { value: 38.4, color: '#8b5cf6' },
        { value: 61.6, color: '#f59e0b' }
    ]);
    
    drawDonutChart('claimsStatusChart', [
        { value: 89.9, color: '#10b981' },
        { value: 10.1, color: '#ef4444' }
    ]);
    
    drawTrendChart('claimsTrendChart');
}

// ===== Draw Donut Chart =====
function drawDonutChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const innerRadius = radius * 0.65;
    
    let startAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Animation
    let progress = 0;
    const animate = () => {
        progress += 0.02;
        if (progress > 1) progress = 1;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let currentAngle = -Math.PI / 2;
        
        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI * progress;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, item.color);
            gradient.addColorStop(1, adjustColor(item.color, -20));
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Add subtle shadow
            ctx.shadowColor = item.color;
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            currentAngle += sliceAngle;
        });
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    // Start animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(canvas);
}

// ===== Draw Trend Chart =====
function drawTrendChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    
    // Sample data points
    const data = [120, 150, 180, 140, 200, 175, 220, 195, 240, 210, 280, 260];
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    // Animation
    let progress = 0;
    const animate = () => {
        progress += 0.02;
        if (progress > 1) progress = 1;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        
        const pointsToShow = Math.floor(data.length * progress);
        
        for (let i = 0; i <= pointsToShow; i++) {
            const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((data[i] - minValue) / range) * (height - 2 * padding);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                // Smooth curve
                const prevX = padding + ((i - 1) / (data.length - 1)) * (width - 2 * padding);
                const prevY = height - padding - ((data[i - 1] - minValue) / range) * (height - 2 * padding);
                const cpX = (prevX + x) / 2;
                ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
            }
        }
        
        // Draw line
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Fill area
        const lastX = padding + (pointsToShow / (data.length - 1)) * (width - 2 * padding);
        ctx.lineTo(lastX, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw dots
        for (let i = 0; i <= pointsToShow; i++) {
            const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((data[i] - minValue) / range) * (height - 2 * padding);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = '#06b6d4';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    // Start animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(canvas);
}

// ===== Color Helper =====
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return `rgb(${r}, ${g}, ${b})`;
}

// ===== Add hover effects to cards =====
document.querySelectorAll('.card, .kpi-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Progress bar animations =====
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-fill, .bar-fill, .claim-bar-fill, .arrears-fill').forEach(bar => {
    progressObserver.observe(bar);
});
