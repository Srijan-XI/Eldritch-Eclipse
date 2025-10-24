// DOM element references
const bodyEl = document.body;
const h1El = document.querySelector('h1');
const h2Els = document.querySelectorAll('h2');
const pHeaderEl = document.querySelector('header > p');
const pSmallEl = document.querySelector('header > p.text-sm');

const controlsEl = document.getElementById('controls-panel');
const previewContainerEl = document.getElementById('preview-area');
const groundEl = document.getElementById('ground-el');

const inputElements = document.querySelectorAll('#controls-panel input, #controls-panel select, #controls-panel textarea');
const labelElements = document.querySelectorAll('#controls-panel label');

// Text and Element References for the Stone
const previewEl = document.getElementById('gravestone-preview');
const iconEl = document.getElementById('preview-icon');
const nameEl = document.getElementById('preview-name');
const datesEl = document.getElementById('preview-dates');
const epitaphEl = document.getElementById('preview-epitaph');

const shapeSelect = document.getElementById('select-shape');
const fontSelect = document.getElementById('select-font');
const colorSelect = document.getElementById('select-color');
const iconSelect = document.getElementById('select-icon');
const engravingColorSelect = document.getElementById('select-engraving-color');
const bloodDripToggle = document.getElementById('toggle-blood-drip');
const bloodDripEl = document.getElementById('blood-drip');
const mossToggle = document.getElementById('toggle-moss-effect');
const cracksToggle = document.getElementById('toggle-cracks');
const sceneThemeSelect = document.getElementById('select-scene-theme');

// Map icon keys to actual characters/emojis
const iconMap = {
    'none': '',
    'cross': '†',
    'heart': '❤️',
    'star': '★',
    'dove': '🕊️',
    'angel': '👼',
    'rose': '🌹',
    'skull': '💀',
    'moon': '🌙'
};

// Utility to remove all theme-specific classes
function clearThemeClasses(el, classes) {
    classes.split(' ').forEach(cls => {
        el.classList.remove(cls);
    });
}

// Function to update the preview based on input values
function updateStone() {
    // --- 1. SCENE THEME (New Color Scheme) ---
    const sceneTheme = sceneThemeSelect.value;
    const darkClasses = {
        body: 'bg-[#0A0A0A] text-gray-100',
        controls: 'bg-[#1a1a1a] shadow-2xl border border-[#333333]',
        preview: 'bg-[#1a1a1a]/50 shadow-2xl',
        ground: 'bg-green-700 border-green-800',
        h1: 'text-white',
        h2: 'text-gray-300 border-[#333333]',
        pHeader: 'text-gray-300',
        pSmall: 'text-gray-500',
        label: 'text-gray-300',
        inputBg: 'bg-[#1a1a1a] border-[#555555] text-gray-100',
        inputFocus: 'focus:ring-[#FFC000] focus:border-[#FFC000]'
    };
    const lightClasses = {
        body: 'bg-white text-gray-900',
        controls: 'bg-gradient-to-br from-[#E8E8E8] to-[#C8C8C8] shadow-lg border border-[#999]',
        preview: 'bg-[#FFF8F0] shadow-lg',
        ground: 'bg-green-400 border-green-500',
        h1: 'text-gray-900',
        h2: 'text-gray-900 border-[#FFB380]',
        pHeader: 'text-gray-700',
        pSmall: 'text-gray-600',
        label: 'text-gray-900',
        inputBg: 'bg-[#FFF8F0] border-[#FFD7B5] text-gray-900',
        inputFocus: 'focus:ring-[#FF6B00] focus:border-[#FF6B00]'
    };

    const currentClasses = sceneTheme === 'gothic-night' ? darkClasses : lightClasses;
    const oppositeClasses = sceneTheme === 'gothic-night' ? lightClasses : darkClasses;
    
    // Apply Theme to main elements
    clearThemeClasses(bodyEl, oppositeClasses.body);
    bodyEl.classList.add(...currentClasses.body.split(' '));

    clearThemeClasses(controlsEl, oppositeClasses.controls);
    controlsEl.classList.add(...currentClasses.controls.split(' '));

    clearThemeClasses(previewContainerEl, oppositeClasses.preview);
    previewContainerEl.classList.add(...currentClasses.preview.split(' '));

    clearThemeClasses(groundEl, oppositeClasses.ground);
    groundEl.classList.add(...currentClasses.ground.split(' '));
    
    // Apply Theme to text elements
    clearThemeClasses(h1El, oppositeClasses.h1);
    h1El.classList.add(...currentClasses.h1.split(' '));

    clearThemeClasses(pHeaderEl, oppositeClasses.pHeader);
    pHeaderEl.classList.add(...currentClasses.pHeader.split(' '));

    clearThemeClasses(pSmallEl, oppositeClasses.pSmall);
    pSmallEl.classList.add(...currentClasses.pSmall.split(' '));

    [...h2Els].forEach(el => {
        clearThemeClasses(el, oppositeClasses.h2);
        el.classList.add(...currentClasses.h2.split(' '));
    });

    [...labelElements].forEach(el => {
        clearThemeClasses(el, oppositeClasses.label);
        el.classList.add(...currentClasses.label.split(' '));
    });

    // Apply Theme to input elements
    [...inputElements].forEach(el => {
        // Clear input specific classes
        el.classList.remove('bg-[#1a1a1a]', 'border-[#555555]', 'text-gray-100', 'bg-[#FFF8F0]', 'border-[#FFD7B5]', 'text-gray-900', 'focus:ring-[#FFC000]', 'focus:border-[#FFC000]', 'focus:ring-[#FF6B00]', 'focus:border-[#FF6B00]');
        
        // Add current theme input classes
        el.classList.add(...currentClasses.inputBg.split(' '), ...currentClasses.inputFocus.split(' '));
    });

    // --- 2. STONE CUSTOMIZATION ---
    
    // Update Text Content
    nameEl.textContent = document.getElementById('input-name').value.toUpperCase();
    datesEl.textContent = document.getElementById('input-dates').value;
    epitaphEl.textContent = document.getElementById('input-epitaph').value;

    // Update Stone Color
    const selectedColor = colorSelect.value;
    previewEl.classList.remove('color-granite-gray', 'color-granite-black', 'color-marble-white', 'color-rose-red', 'color-green-jade', 'color-blue-pearl', 'color-obsidian-black', 'color-sandstone-tan', 'color-purple-amethyst');
    previewEl.classList.add(`color-${selectedColor}`);

    // Update Shape
    const selectedShape = shapeSelect.value;
    previewEl.classList.remove('shape-rectangle', 'shape-arched', 'shape-oval', 'shape-cross', 'shape-heart');
    previewEl.classList.add(`shape-${selectedShape}`);

    // Special width/height adjustments for oval to look better
    if (selectedShape === 'oval') {
         previewEl.style.width = '250px';
         previewEl.style.height = '400px';
    } else {
         previewEl.style.width = '250px'; // Reset for other shapes
    }

    // Update Engraving Color
    const selectedEngravingColor = engravingColorSelect.value;
    const engravingClass = `engraving-${selectedEngravingColor}`;

    // Remove all existing engraving color classes
    [iconEl, nameEl, datesEl, epitaphEl].forEach(el => {
        el.classList.remove('engraving-gold', 'engraving-silver', 'engraving-white');
        el.classList.add(engravingClass);
    });

    // Update Icon
    const selectedIcon = iconSelect.value;
    iconEl.textContent = iconMap[selectedIcon];
    iconEl.style.display = selectedIcon === 'none' ? 'none' : 'block';
    
    // Update Font Style
    const selectedFont = fontSelect.value;
    // Remove existing font classes from text elements
    nameEl.classList.remove('font-serif-classic', 'font-sans-modern', 'font-script-elegant', 'font-creepster', 'font-cinzel', 'font-typewriter');
    datesEl.classList.remove('font-serif-classic', 'font-sans-modern', 'font-script-elegant', 'font-creepster', 'font-cinzel', 'font-typewriter');
    epitaphEl.classList.remove('font-serif-classic', 'font-sans-modern', 'font-script-elegant', 'font-creepster', 'font-cinzel', 'font-typewriter');

    // Add the selected font class to all text elements
    const fontClass = `font-${selectedFont}`;
    nameEl.classList.add(fontClass);
    datesEl.classList.add(fontClass);
    epitaphEl.classList.add(fontClass);

    // Toggle Blood Drip
    if (bloodDripToggle.checked) {
        bloodDripEl.classList.add('active');
    } else {
        bloodDripEl.classList.remove('active');
    }

    // Toggle Moss/Weathering
    if (mossToggle.checked) {
        previewEl.classList.add('mossy-effect');
    } else {
        previewEl.classList.remove('mossy-effect');
    }

    // Toggle Cracks
    if (cracksToggle && cracksToggle.checked) {
        previewEl.classList.add('cracked');
    } else {
        previewEl.classList.remove('cracked');
    }
}

// Export design as image
async function exportDesign() {
    const stoneEl = document.getElementById('gravestone-container');
    const exportBtn = document.querySelector('.export-btn');
    
    // Show loading state with spinner
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<span class="spinner"></span>Generating Image...';
    exportBtn.disabled = true;
    
    try {
        // Small delay to allow UI update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Use html2canvas to capture the gravestone
        const canvas = await html2canvas(stoneEl, {
            backgroundColor: null,
            scale: 2, // Higher quality (2x resolution)
            logging: false,
            useCORS: true,
            allowTaint: true,
            width: stoneEl.offsetWidth,
            height: stoneEl.offsetHeight,
            windowWidth: stoneEl.offsetWidth,
            windowHeight: stoneEl.offsetHeight
        });
        
        // Convert to blob and download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().getTime();
            const name = document.getElementById('input-name').value.replace(/[^a-z0-9]/gi, '-').toLowerCase();
            link.download = `gravestone-${name}-${timestamp}.png`;
            link.href = url;
            link.click();
            
            // Cleanup
            URL.revokeObjectURL(url);
            
            // Success feedback
            exportBtn.innerHTML = '✅ Downloaded Successfully!';
            setTimeout(() => {
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
            }, 2500);
        }, 'image/png', 1.0); // Maximum quality
        
    } catch (error) {
        console.error('Export failed:', error);
        exportBtn.innerHTML = '❌ Export Failed - Try Again';
        setTimeout(() => {
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }, 3000);
    }
}

// Share design function
function shareDesign() {
    const name = document.getElementById('input-name').value || 'Memorial';
    const epitaph = document.getElementById('input-epitaph').value || 'Rest in Peace';
    const shareText = `🪦 Check out my eternal memorial: "${name}" - "${epitaph}" 🎃 Created with the Eldritch Eclipse Memorial Designer!`;
    const shareUrl = window.location.href;

    // Check if Web Share API is available (mobile)
    if (navigator.share) {
        navigator.share({
            title: '🪦 My Memorial Design',
            text: shareText,
            url: shareUrl
        }).catch(err => console.log('Share cancelled:', err));
    } else {
        // Fallback: Copy to clipboard
        const fullText = `${shareText}\n${shareUrl}`;
        navigator.clipboard.writeText(fullText).then(() => {
            alert('✅ Share link copied to clipboard!\n\nPaste it anywhere to share your design.');
        }).catch(err => {
            // Ultimate fallback: Show modal with text to copy
            const textToCopy = prompt('Copy this text to share your design:', fullText);
        });
    }
}

// Initialize the preview on load
window.onload = function() {
    // Initial call to set up the defaults from the input fields
    updateStone();
    
    // Check if coming from registration
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'registration') {
        // Show welcome message for registered users
        setTimeout(() => {
            const welcome = document.createElement('div');
            welcome.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-900 border-2 border-green-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-bounce';
            welcome.innerHTML = '🎉 Welcome, Registered Guest! Design your eternal memorial below. 🪦';
            document.body.appendChild(welcome);
            setTimeout(() => welcome.remove(), 5000);
        }, 500);
    }
};

// Update the design instantly on input change
document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('change', updateStone);
    el.addEventListener('input', updateStone);
});
