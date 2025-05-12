@import "tailwindcss";
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
  --font-headline: 'Orbitron', sans-serif;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-headline); /* ➜ apply Orbitron globally to sans if desired */
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}

@keyframes slideUpFast {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUpFast {
  animation: slideUpFast 0.6s ease-out forwards;
}

.animate-slideUpFastDelayed {
  animation: slideUpFast 0.6s ease-out 0.3s forwards;
}

@keyframes slideUpFast {
  from {
    opacity: 0;
    transform: translateY(60px); /* was 30px */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInStrong {
  animation: fadeInStrong 1.5s ease-out forwards;
}

@layer utilities {
  .font-headline {
    font-family: 'Orbitron', sans-serif;
  }
}

@tailwind utilities;
