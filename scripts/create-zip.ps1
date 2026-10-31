Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$outDir = (Resolve-Path (Join-Path $PSScriptRoot "..\out")).Path
$zipPath = Join-Path $PSScriptRoot "..\theories_hostinger_deployment.zip"

if (Test-Path $zipPath) {
    Write-Host "Deleting old deployment zip: $zipPath ..."
    Remove-Item -Force $zipPath
}

Write-Host "Gathering files from $outDir ..."
$files = Get-ChildItem -Path $outDir -Recurse -File -Force

Write-Host "Creating standard Linux/Hostinger-compatible zip ($($files.Count) files)..."
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$count = 0
$total = $files.Count
$prefixLen = $outDir.TrimEnd('\').Length + 1

foreach ($file in $files) {
    $entryName = $file.FullName.Substring($prefixLen).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    $count++
    if ($count % 200 -eq 0 -or $count -eq $total) {
        Write-Host "Compressed $count of $total files..."
    }
}

$zip.Dispose()

$zipItem = Get-Item $zipPath
Write-Host "Successfully generated: $zipPath"
Write-Host "Size: $([math]::Round($zipItem.Length / 1MB, 2)) MB"
