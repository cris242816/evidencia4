// ===============================
// FUNCIONES INTERACTIVAS
// ===============================

/**
 * Resalta una característica cuando se hace clic
 * @param {HTMLElement} element - El elemento a resaltar
 */
function highlightFeature(element) {
  // Aplicar efecto de resaltado
  element.style.background = 'rgba(255, 255, 255, 0.3)';
  element.style.transform = 'scale(1.05)';
  element.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';

  // Restaurar después de 500ms
  setTimeout(() => {
    element.style.background = 'rgba(255, 255, 255, 0.1)';
    element.style.transform = 'scale(1)';
    element.style.boxShadow = 'none';
  }, 500);
}

/**
 * Copia un comando al portapapeles
 * @param {HTMLElement} element - El elemento que contiene el comando
 */
function copyCommand(element) {
  const command = element.textContent;

  // Intentar copiar al portapapeles
  navigator.clipboard.writeText(command).then(() => {
    // Guardar el texto original
    const originalText = element.textContent;
    const originalBackground = element.style.background;

    // Mostrar feedback visual
    element.textContent = '📋 ¡Copiado!';
    element.style.background = '#68d391';
    element.style.transform = 'scale(1.05)';

    // Restaurar después de 1 segundo
    setTimeout(() => {
      element.textContent = originalText;
      element.style.background = originalBackground || '#2d3748';
      element.style.transform = 'scale(1)';
    }, 1000);
  }).catch(err => {
    // Fallback si no funciona el clipboard
    console.log('Error al copiar:', err);
    showNotification('Comando: ' + command, 'info');
  });
}

/**
 * Anima un paso del workflow
 * @param {HTMLElement} element - El paso a animar
 */
function animateStep(element) {
  element.classList.add('pulse');

  // Agregar efecto de brillo temporal
  element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';

  setTimeout(() => {
    element.classList.remove('pulse');
    element.style.boxShadow = '';
  }, 2000);
}

/**
 * Muestra/oculta la demo interactiva
 */
function toggleDemo() {
  const demo = document.getElementById('interactiveDemo');
  const button = event.target;

  if (demo.style.display === 'none' || !demo.classList.contains('active')) {
    // Mostrar demo
    demo.classList.add('active');
    demo.style.display = 'block';
    button.textContent = '❌ Cerrar Demo';

    // Scroll suave hacia la demo
    setTimeout(() => {
      demo.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  } else {
    // Ocultar demo
    demo.classList.remove('active');
    demo.style.display = 'none';
    button.textContent = '💡 Ver Demo Interactiva';
  }
}

/**
 * Simula el proceso de git push
 */
function simulatePush() {
  const result = document.getElementById('pushResult');
  const button = event.target;

  // Deshabilitar botón temporalmente
  button.disabled = true;
  button.textContent = '⏳ Procesando...';

  // Fase 1: Iniciando
  result.innerHTML = `
        <div style="color: #ffd93d; font-weight: bold;">
            ⏳ Ejecutando git push...
        </div>
    `;

  // Fase 2: Enviando datos
  setTimeout(() => {
    result.innerHTML = `
            <div style="color: #45b7d1; font-weight: bold;">
                📡 Enviando cambios al repositorio remoto...<br>
                🔐 Autenticando credenciales...
            </div>
        `;
  }, 1000);

  // Fase 3: Completado
  setTimeout(() => {
    result.innerHTML = `
            <div style="color: #68d391; font-weight: bold; animation: fadeIn 0.5s;">
                ✅ ¡Push exitoso!<br>
                🔄 Repositorio remoto actualizado<br>
                👥 Cambios ahora visibles para el equipo<br>
                📊 3 archivos modificados, 47 líneas agregadas
            </div>
        `;

    // Restaurar botón
    button.disabled = false;
    button.textContent = '🔄 Simular git push';

    // Efecto de celebración
    createConfetti();
  }, 2500);
}

/**
 * Crea efecto de confetti (celebración)
 */
function createConfetti() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#96ceb4'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;

      document.body.appendChild(confetti);

      // Remover después de la animación
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 3000);
    }, i * 50);
  }
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'info', 'warning')
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const colors = {
    success: '#68d391',
    info: '#45b7d1',
    warning: '#ffd93d'
  };

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
        animation: slideInRight 0.3s ease-out;
    `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// ===============================
// EVENTOS AL CARGAR LA PÁGINA
// ===============================

/**
 * Inicialización cuando la página se carga completamente
 */
window.addEventListener('load', () => {
  // Animación de entrada para las secciones
  const sections = document.querySelectorAll('.git-section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';

    setTimeout(() => {
      section.style.transition = 'all 0.6s ease-out';
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 300);
  });

  // Mensaje de bienvenida
  setTimeout(() => {
    showNotification('¡Bienvenido! Explora las diferencias entre Git local y remoto', 'success');
  }, 1000);
});

/**
 * Efectos adicionales para elementos interactivos
 */
document.addEventListener('DOMContentLoaded', () => {
  // Agregar efectos hover mejorados a elementos de características
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.boxShadow = '0 5px 15px rgba(255,255,255,0.2)';
      item.style.transform = 'translateX(10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('highlighted')) {
        item.style.boxShadow = '';
        item.style.transform = '';
      }
    });
  });

  // Efectos para comandos
  const commands = document.querySelectorAll('.command');
  commands.forEach(command => {
    command.addEventListener('mouseenter', () => {
      command.style.boxShadow = '0 3px 10px rgba(104, 211, 145, 0.3)';
    });

    command.addEventListener('mouseleave', () => {
      command.style.boxShadow = '';
    });
  });

  // Scroll suave para navegación
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===============================
// ANIMACIONES CSS DINÁMICAS
// ===============================

// Agregar estilos de animación dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===============================
// UTILIDADES ADICIONALES
// ===============================

/**
 * Detecta el tema preferido del usuario
 */
function detectTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * Función para alternar entre modo claro y oscuro (opcional)
 */
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');

  if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'dark');
    showNotification('Modo oscuro activado', 'info');
  } else {
    body.setAttribute('data-theme', 'light');
    showNotification('Modo claro activado', 'info');
  }
}

/**
 * Función para hacer scroll suave a una sección específica
 * @param {string} sectionId - ID de la sección
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Contador de interacciones para estadísticas básicas
 */
let interactionCounter = {
  commandsCopied: 0,
  featuresClicked: 0,
  stepsAnimated: 0,
  demosViewed: 0
};

/**
 * Actualiza el contador de interacciones
 * @param {string} action - Tipo de acción realizada
 */
function updateCounter(action) {
  if (interactionCounter.hasOwnProperty(action)) {
    interactionCounter[action]++;
  }

  // Mostrar logro cada 5 interacciones
  const total = Object.values(interactionCounter).reduce((a, b) => a + b, 0);
  if (total > 0 && total % 5 === 0) {
    showNotification(`¡${total} interacciones! Sigue explorando 🎉`, 'success');
  }
}

/**
 * Función mejorada para resaltar características
 */
function highlightFeature(element) {
  updateCounter('featuresClicked');

  // Aplicar efecto de resaltado
  element.style.background = 'rgba(255, 255, 255, 0.3)';
  element.style.transform = 'scale(1.05)';
  element.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
  element.classList.add('highlighted');

  // Restaurar después de 500ms
  setTimeout(() => {
    element.style.background = 'rgba(255, 255, 255, 0.1)';
    element.style.transform = 'scale(1)';
    element.style.boxShadow = 'none';
    element.classList.remove('highlighted');
  }, 500);
}

/**
 * Función mejorada para copiar comandos
 */
function copyCommand(element) {
  updateCounter('commandsCopied');

  const command = element.textContent;

  navigator.clipboard.writeText(command).then(() => {
    const originalText = element.textContent;
    const originalBackground = element.style.background;

    element.textContent = '📋 ¡Copiado!';
    element.style.background = '#68d391';
    element.style.transform = 'scale(1.05)';

    setTimeout(() => {
      element.textContent = originalText;
      element.style.background = originalBackground || '#2d3748';
      element.style.transform = 'scale(1)';
    }, 1000);
  }).catch(err => {
    console.log('Error al copiar:', err);
    showNotification('Comando: ' + command, 'info');
  });
}

/**
 * Función mejorada para animar pasos
 */
function animateStep(element) {
  updateCounter('stepsAnimated');

  element.classList.add('pulse');
  element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';

  setTimeout(() => {
    element.classList.remove('pulse');
    element.style.boxShadow = '';
  }, 2000);
}

/**
 * Función mejorada para toggle demo
 */
function toggleDemo() {
  updateCounter('demosViewed');

  const demo = document.getElementById('interactiveDemo');
  const button = event.target;

  if (demo.style.display === 'none' || !demo.classList.contains('active')) {
    demo.classList.add('active');
    demo.style.display = 'block';
    button.textContent = '❌ Cerrar Demo';

    setTimeout(() => {
      demo.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  } else {
    demo.classList.remove('active');
    demo.style.display = 'none';
    button.textContent = '💡 Ver Demo Interactiva';
  }
}

// ===============================
// EVENTOS DE TECLADO
// ===============================

/**
 * Manejo de eventos de teclado para accesibilidad
 */
document.addEventListener('keydown', (e) => {
  // Escape para cerrar demo
  if (e.key === 'Escape') {
    const demo = document.getElementById('interactiveDemo');
    if (demo.classList.contains('active')) {
      toggleDemo();
    }
  }

  // Enter en elementos focuseables
  if (e.key === 'Enter') {
    const focused = document.activeElement;
    if (focused.classList.contains('feature-item')) {
      highlightFeature(focused);
    } else if (focused.classList.contains('command')) {
      copyCommand(focused);
    } else if (focused.classList.contains('workflow-step')) {
      animateStep(focused);
    }
  }
});

// ===============================
// PERFORMANCE Y OPTIMIZACIÓN
// ===============================

/**
 * Lazy loading para animaciones pesadas
 */
function lazyLoadAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.workflow-step, .git-section').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Debounce para eventos que se disparan frecuentemente
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===============================
// INICIALIZACIÓN FINAL
// ===============================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Configurar lazy loading
  lazyLoadAnimations();

  // Configurar accesibilidad
  document.querySelectorAll('.feature-item, .command, .workflow-step').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
  });

  // Detectar tema preferido
  const preferredTheme = detectTheme();
  document.body.setAttribute('data-theme', preferredTheme);

  console.log('🚀 Git Local vs Remoto - Página cargada correctamente');
  console.log('📊 Funciones disponibles: highlightFeature, copyCommand, animateStep, toggleDemo');
});
