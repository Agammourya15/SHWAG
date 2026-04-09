#!/usr/bin/env pwsh
# ============================================================
# SHWAG Website Monitoring Stack — Deploy Script
# Deploy Prometheus + Grafana + Blackbox on Minikube
# ============================================================
# HOW TO RUN:
#   Open PowerShell as Administrator in this folder and run:
#   .\deploy-monitoring.ps1
# ============================================================

param(
    [switch]$Clean       # Add -Clean flag to destroy and recreate everything
)

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  SHWAG Monitoring Stack — Auto Deploy     " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# ── Step 0: Optionally clean up ──
if ($Clean) {
    Write-Host "🧹 Cleaning up existing deployment..." -ForegroundColor Yellow
    kubectl delete namespace monitoring --ignore-not-found=true
    Start-Sleep -Seconds 5
}

# ── Step 1: Check prerequisites ──
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow

$tools = @("docker", "minikube", "kubectl")
foreach ($tool in $tools) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        Write-Host "❌ '$tool' is not installed or not in PATH." -ForegroundColor Red
        Write-Host "   Install it first and re-run this script." -ForegroundColor Red
        exit 1
    }
    Write-Host "   ✅ $tool found" -ForegroundColor Green
}

# ── Step 2: Start Minikube ──
Write-Host ""
Write-Host "🚀 Starting Minikube..." -ForegroundColor Yellow
$minikubeStatus = minikube status --format="{{.Host}}" 2>$null
if ($minikubeStatus -ne "Running") {
    minikube start --driver=docker --memory=4096 --cpus=2 --disk-size=20g
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Minikube failed to start. Try: minikube delete; minikube start --driver=docker" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   ✅ Minikube is already running" -ForegroundColor Green
}

# ── Step 3: Apply all manifests ──
Write-Host ""
Write-Host "📦 Applying Kubernetes manifests..." -ForegroundColor Yellow

$manifests = @(
    "00-namespace.yaml",
    "01-rbac.yaml",
    "02-blackbox-configmap.yaml",
    "03-blackbox-deployment.yaml",
    "04-prometheus-configmap.yaml",
    "05-prometheus-deployment.yaml",
    "06-grafana-configmap.yaml",
    "07-grafana-deployment.yaml"
)

foreach ($manifest in $manifests) {
    Write-Host "   Applying $manifest..." -NoNewline
    kubectl apply -f $manifest 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✅" -ForegroundColor Green
    } else {
        Write-Host " ❌" -ForegroundColor Red
        kubectl apply -f $manifest
    }
}

# ── Step 4: Wait for pods to be ready ──
Write-Host ""
Write-Host "⏳ Waiting for all pods to become ready (this may take 1-2 minutes)..." -ForegroundColor Yellow

$pods = @(
    @{ Label = "app=blackbox-exporter"; Name = "Blackbox Exporter" },
    @{ Label = "app=prometheus";        Name = "Prometheus" },
    @{ Label = "app=grafana";           Name = "Grafana" }
)

foreach ($pod in $pods) {
    Write-Host "   Waiting for $($pod.Name)..." -NoNewline
    kubectl wait --for=condition=ready pod -l $pod.Label -n monitoring --timeout=180s 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✅ Ready" -ForegroundColor Green
    } else {
        Write-Host " ⚠️  Timeout — check with: kubectl get pods -n monitoring" -ForegroundColor Yellow
    }
}

# ── Step 5: Show status ──
Write-Host ""
Write-Host "📋 Current pod status:" -ForegroundColor Cyan
kubectl get pods -n monitoring

Write-Host ""
Write-Host "🌐 Services:" -ForegroundColor Cyan
kubectl get svc -n monitoring

# ── Step 6: Port forwarding ──
Write-Host ""
Write-Host "🔗 Starting Port Forwarding..." -ForegroundColor Yellow
Write-Host "   (Two new PowerShell windows will open — keep them running)" -ForegroundColor Gray

Start-Process powershell -ArgumentList `
    "-NoExit -Command `"Write-Host 'Prometheus Port Forward — Keep this window open' -ForegroundColor Cyan; kubectl port-forward -n monitoring svc/prometheus 9090:9090`""

Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList `
    "-NoExit -Command `"Write-Host 'Grafana Port Forward — Keep this window open' -ForegroundColor Cyan; kubectl port-forward -n monitoring svc/grafana 3000:3000`""

Start-Sleep -Seconds 3

# ── Step 7: Done ──
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  ✅ SHWAG Monitoring Stack is LIVE!       " -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  📊 Prometheus:  http://localhost:9090"           -ForegroundColor White
Write-Host "  📈 Grafana:     http://localhost:3000"           -ForegroundColor White
Write-Host "     Username:   admin"                            -ForegroundColor Gray
Write-Host "     Password:   shwag@2024"                       -ForegroundColor Gray
Write-Host ""
Write-Host "  🧪 Test Blackbox:" -ForegroundColor White
Write-Host "     kubectl port-forward -n monitoring svc/blackbox-exporter 9115:9115" -ForegroundColor Gray
Write-Host "     Then: http://localhost:9115/probe?target=https://google.com&module=http_2xx" -ForegroundColor Gray
Write-Host ""
Write-Host "  📌 Useful Commands:" -ForegroundColor White
Write-Host "     kubectl get pods -n monitoring              # See pod status" -ForegroundColor Gray
Write-Host "     kubectl logs -n monitoring <pod-name>       # View logs" -ForegroundColor Gray
Write-Host "     kubectl describe pod -n monitoring <pod>    # Debug a pod" -ForegroundColor Gray
Write-Host "     minikube dashboard                          # K8s visual dashboard" -ForegroundColor Gray
Write-Host ""
