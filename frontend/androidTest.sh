#!/bin/bash
pwd
cd frontend
echo "Waiting for device"
adb wait-for-device
echo "Starting app"
npx expo start --android &
echo "Waiting for app to start"
sleep 60
echo "Find package"
adb shell pm list packages | grep "com.anonymous.frontend"
adb shell pm list packages | grep "host.exp.Exponent"
# Reverse Metro Bundler port
adb reverse tcp:8081 tcp:8081
echo "Starting tests"
maestro test maestro
echo "Stopping tests"
adb emu kill