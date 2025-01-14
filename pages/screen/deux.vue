<script setup lang="ts">
import Clock from '@/components/Clock.vue';
import { definePageMeta, useWebSocket } from '#imports';

definePageMeta({
  layout: 'screen',
});

const { messages, isConnected } = useWebSocket('ws://node-red.home/ws/desk-display');

const dayMonthFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  day: 'numeric',
});
</script>

<template>
  <div class="flex w-full flex-col">
    <!-- Header -->
    <header class="flex h-[32px] items-center gap-4 border-b bg-background px-4">
      {{dayMonthFormatter.format(new Date())}}<Clock /> {{ messages?.text }}
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col gap-2 m-2">
      <div class="grid gap-4 grid-cols-12 h-[550px]">
        <Card class="col-span-3 h-full overflow-y-auto p-2 border-0 !border-r-2 rounded-none">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus doloremque, esse, eum eveniet explicabo iusto perferendis praesentium totam, vitae voluptates. Consectetur explicabo itaque maiores necessitatibus quidem repellendus, sint.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus doloremque, esse, eum eveniet explicabo iusto perferendis praesentium totam, vitae voluptates. Consectetur explicabo itaque maiores necessitatibus quidem repellendus, sint.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus doloremque, esse, eum eveniet explicabo iusto perferendis praesentium totam, vitae voluptates. Consectetur explicabo itaque maiores necessitatibus quidem repellendus, sint.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus doloremque, esse, eum eveniet explicabo iusto perferendis praesentium totam, vitae voluptates. Consectetur explicabo itaque maiores necessitatibus quidem repellendus, sint.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus doloremque, esse, eum eveniet explicabo iusto perferendis praesentium totam, vitae voluptates. Consectetur explicabo itaque maiores necessitatibus quidem repellendus, sint.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus doloremque, esse, eum eveniet explicabo iusto perferendis praesentium totam, vitae voluptates. Consectetur explicabo itaque maiores necessitatibus quidem repellendus, sint.
            Lorem ipsum dolor s
        </Card>

        <!-- Colonne droite -->
        <Card class="col-span-9 h-full border-0">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            Contenu de la colonne de droite
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>

