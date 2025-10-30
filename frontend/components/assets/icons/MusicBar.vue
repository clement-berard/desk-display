<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
    <!-- Première barre -->
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
      d="M1 5.5v3"
    >
      <animate attributeName="d" values="M1 5.5v3;M1 3v8;M1 5.5v3" dur="0.5s" repeatCount="indefinite"/>
    </path>

    <!-- Deuxième barre -->
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 3v8">
      <animate attributeName="d" values="M4 3v8;M4 5.5v3;M4 3v8" dur="0.6s" repeatCount="indefinite"/>
    </path>

    <!-- Troisième barre -->
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
      d="M7 .5v13"
    >
      <animate attributeName="d" values="M7 .5v13;M7 3v8;M7 .5v13" dur="0.7s" repeatCount="indefinite"/>
    </path>

    <!-- Quatrième barre -->
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 3v8">
      <animate attributeName="d" values="M10 3v8;M10 5.5v3;M10 3v8" dur="0.6s" repeatCount="indefinite"/>
    </path>

    <!-- Cinquième barre -->
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
      d="M13 5.5v3"
    >
      <animate attributeName="d" values="M13 5.5v3;M13 3v8;M13 5.5v3" dur="0.5s" repeatCount="indefinite"/>
    </path>
  </svg>
</template>
