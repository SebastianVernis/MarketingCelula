#!/bin/bash

# Script de verificación pre-despliegue
# Verifica que todo esté configurado correctamente antes de desplegar a Vercel

echo "🔍 Verificando configuración de despliegue..."
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Función para verificar archivos
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 existe"
        return 0
    else
        echo -e "${RED}✗${NC} $1 NO existe"
        ((ERRORS++))
        return 1
    fi
}

# Función para verificar directorios
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/ existe"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ NO existe"
        ((ERRORS++))
        return 1
    fi
}

echo "📋 Verificando archivos de configuración..."
check_file "package.json"
check_file "vercel.json"
check_file "build.js"
check_file ".vercelignore"
check_file ".gitignore"
echo ""

echo "📁 Verificando estructura del proyecto..."
check_dir "Marketing"
check_dir "assets"
echo ""

echo "📄 Verificando archivos HTML en Marketing/..."
check_file "Marketing/index.html"
check_file "Marketing/bodas.html"
check_file "Marketing/xv.html"
check_file "Marketing/privada.html"
echo ""

echo "📂 Verificando directorios en Marketing/..."
check_dir "Marketing/assets"
check_dir "Marketing/css"
check_dir "Marketing/js"
echo ""

echo "🔧 Verificando node_modules..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules/ existe"
else
    echo -e "${YELLOW}⚠${NC} node_modules/ no existe. Ejecuta: npm install"
    ((WARNINGS++))
fi
echo ""

echo "🏗️  Probando build..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build exitoso"
else
    echo -e "${RED}✗${NC} Build falló"
    ((ERRORS++))
fi
echo ""

echo "📊 Verificando package.json..."
if grep -q '"build"' package.json; then
    echo -e "${GREEN}✓${NC} Script 'build' configurado"
else
    echo -e "${RED}✗${NC} Script 'build' NO configurado"
    ((ERRORS++))
fi

if grep -q '"deploy"' package.json; then
    echo -e "${GREEN}✓${NC} Script 'deploy' configurado"
else
    echo -e "${YELLOW}⚠${NC} Script 'deploy' NO configurado"
    ((WARNINGS++))
fi
echo ""

echo "⚙️  Verificando vercel.json..."
if grep -q '"outputDirectory"' vercel.json; then
    echo -e "${GREEN}✓${NC} outputDirectory configurado"
else
    echo -e "${RED}✗${NC} outputDirectory NO configurado"
    ((ERRORS++))
fi

if grep -q '"buildCommand"' vercel.json; then
    echo -e "${GREEN}✓${NC} buildCommand configurado"
else
    echo -e "${RED}✗${NC} buildCommand NO configurado"
    ((ERRORS++))
fi
echo ""

echo "📦 Verificando dependencias..."
if grep -q '@vercel/analytics' package.json; then
    echo -e "${GREEN}✓${NC} @vercel/analytics instalado"
else
    echo -e "${YELLOW}⚠${NC} @vercel/analytics NO instalado"
    ((WARNINGS++))
fi

if grep -q '@vercel/speed-insights' package.json; then
    echo -e "${GREEN}✓${NC} @vercel/speed-insights instalado"
else
    echo -e "${YELLOW}⚠${NC} @vercel/speed-insights NO instalado"
    ((WARNINGS++))
fi
echo ""

# Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMEN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Todo está listo para desplegar!${NC}"
    echo ""
    echo "Puedes desplegar con:"
    echo "  vercel          # Para preview"
    echo "  vercel --prod   # Para producción"
    echo "  npm run deploy  # Para producción"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ Hay $WARNINGS advertencia(s), pero puedes desplegar${NC}"
    exit 0
else
    echo -e "${RED}❌ Hay $ERRORS error(es) que deben corregirse antes de desplegar${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ También hay $WARNINGS advertencia(s)${NC}"
    fi
    exit 1
fi
