# 🧮 CalcPro AI - La Calculadora Más "Profesional" del Mundo

> **Advertencia**: Este proyecto es una sátira. Una calculadora que requiere suscripción premium para hacer 2+2. Perfecto para memes de redes sociales. (Si ingresas al código puedes usar la prop `isPremium` en true y colocar `showSubscription` en false para ver funcionar la calculadora)

## 😂 El Concepto

¿Alguna vez te pidieron hacer una calculadora como proyecto final y pensaste "voy a hacer algo ÉPICO"? Pues aquí está: una calculadora con diseño UX/UI profesional, animaciones suaves, modo oscuro, y... ¡requiere suscripción PRO de $99/mes para obtener resultados!

### La Broma

1. Diseño ultra profesional con Framer Motion
2. Interfaz limpia en modo oscuro
3. Presionas "=" para calcular
4. Aparece un spinner: "Procesando en el cluster de computación cuántica..."
5. **BOOM**: Modal de suscripción PRO con formulario de pago completo
6. Todo esto... para sumar 2+2

## 🚀 Características

- ✨ **Diseño Premium**: UX/UI profesional que parece una app de $99/mes
- 🌙 **Modo Oscuro**: Porque toda app seria necesita modo oscuro
- 🎭 **Animaciones Suaves**: Framer Motion para ese toque "enterprise"
- 🔢 **Calculadora Funcional**: Sí, realmente calcula (si tienes premium)
- 💳 **Modal de Suscripción**: Formulario completo de pago (falso, obviamente)
- ⚡ **Spinner de Carga**: "Procesando en el cluster de computación cuántica"
- 🎨 **Glassmorphism**: Porque 2024

## 🛠️ Stack Tecnológico

- **Next.js 15** - App Router
- **React 19** - Hooks y componentes
- **TypeScript** - Para ese toque profesional
- **Tailwind CSS v4** - Estilos modernos
- **Framer Motion** - Animaciones fluidas
- **shadcn/ui** - Componentes de UI

## 📦 Instalación

```bash
# Clonar el proyecto
git clone [tu-repo]

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

## 🎬 Uso para Video de Redes Sociales

### Guión Sugerido:

1. **Intro**: Tu cara con texto "Como proyecto final desarrollen una calculadora como si fuesen profesionales"
2. **Transición**: Corte dramático
3. **Demo**: Muestra la calculadora funcionando
4. **Operación**: Presiona "2 + 2 ="
5. **Spinner**: Aparece el loading épico
6. **Punchline**: Modal de suscripción PRO
7. **Reacción**: Tu cara de "¿en serio?"

### Tips para el Video:

- Graba en modo oscuro para mejor contraste
- Captura las animaciones suaves
- Enfoca el modal de suscripción para el efecto cómico
- Usa música épica durante el loading

## 🎮 Cómo Funciona

### Modo Normal (isPremium = false)
```tsx
const [isPremium] = useState(false) // Usuario normal
```
- La calculadora NO calcula el resultado
- Muestra el modal de suscripción
- Perfecto para el meme

### Modo Premium (isPremium = true)
```tsx
const [isPremium] = useState(true) // Usuario premium
```
- La calculadora SÍ funciona correctamente
- Calcula operaciones matemáticas reales
- Por si algún día necesitas una calculadora de verdad

## 🎨 Personalización

### Cambiar el Precio
```tsx
// En subscription-modal.tsx
<span className="text-5xl font-bold">$99</span>
```

### Modificar Mensajes del Spinner
```tsx
// En loading-modal.tsx
"Procesando en el cluster de computación cuántica...",
"Optimizando algoritmos de suma avanzada...",
// Agrega los tuyos aquí
```

### Ajustar Tiempo de Carga
```tsx
// En app/page.tsx
setTimeout(() => {
  setIsLoading(false)
  setShowSubscription(true)
}, 2500) // Cambia este valor (en milisegundos)
```

## 🤝 Contribuciones

¿Tienes ideas para hacer esta calculadora aún más ridículamente "profesional"? ¡Los PRs son bienvenidos!

Ideas sugeridas:
- Agregar "AI-powered calculations"
- Modal de "términos y condiciones" de 50 páginas
- Sistema de "créditos" para operaciones
- Notificaciones push para resultados
- Dashboard de analytics de tus cálculos

## 📝 Licencia

MIT - Úsalo para hacer reír a la gente

## 🎯 Créditos

Creado con amor (y sarcasmo) para burlarse de las apps modernas que cobran por todo.

---

**Nota**: Este proyecto es una parodia. No cobres a nadie por usar una calculadora. Por favor. 😅
