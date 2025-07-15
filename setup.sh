#!/bin/bash

# Este script automatiza la instalación de dependencias para el proyecto
echo "Iniciando la configuración del proyecto..."

# --- Verificación de Requisitos Previos ---
echo "Verificando requisitos previos..."

# Función para verificar si un comando existe
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Verificar Node.js y npm
if ! command_exists node; then
  echo "❌ Node.js no está instalado. Por favor, instálalo desde https://nodejs.org/."
  exit 1
fi
if ! command_exists npm; then
  echo "❌ npm (Node Package Manager) no está instalado. Asegúrate de que Node.js esté bien instalado."
  exit 1
fi
echo "✅ Node.js y npm detectados."

# Verificar Python 3 y pip
if ! command_exists python3; then
  echo "❌ Python 3 no está instalado. Por favor, instálalo desde https://www.python.org/."
  exit 1
fi
if ! command_exists pip3; then
  echo "❌ pip3 no está instalado. Asegúrate de que Python 3 esté bien instalado."
  exit 1
fi
echo "✅ Python 3 y pip3 detectados."

# Verificar Expo CLI (si se usa Expo)
read -p "¿Estás utilizando Expo para React Native? (s/n): " use_expo
if [[ "$use_expo" =~ ^[Ss]$ ]]; then
  if ! command_exists expo; then
    echo "⚠️ Expo CLI no está instalado. Instalando globalmente..."
    npm install -g expo-cli
    if [ $? -eq 0 ]; then
      echo "✅ Expo CLI instalado globalmente."
    else
      echo "❌ Error al instalar Expo CLI. Por favor, instálalo manualmente con 'npm install -g expo-cli'."
      exit 1
    fi
  else
    echo "✅ Expo CLI detectado."
  fi
fi
