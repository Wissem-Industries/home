<template>
  <div class="min-h-screen bg-default text-default">
    <AppHeader />
    <main class="relative overflow-hidden pt-24 sm:pt-28">
      <WGridBackground class="-z-0 [--ui-border:var(--ui-border-accented)]" />
      <div class="relative z-1">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
