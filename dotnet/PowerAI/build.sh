dotnet publish -c Release --property:PublishDir=windows-store/linux --runtime linux-x64
mkdir -p windows-store/linux/powerai.1.0.3
mkdir -p windows-store/linux/powerai.1.0.3/DEBIAN
mkdir -p windows-store/linux/powerai.1.0.3/usr/bin
cp windows-store/linux/PowerAI windows-store/linux/powerai.1.0.3/usr/bin/powerai
chmod +x windows-store/linux/powerai.1.0.3/usr/bin/powerai
cp windows-store/linux/powerai-1.0.x/DEBIAN/control windows-store/linux/powerai.1.0.3/DEBIAN/control
dpkg-deb --build windows-store/linux/powerai.1.0.3
rm -rf windows-store/linux/PowerAI
