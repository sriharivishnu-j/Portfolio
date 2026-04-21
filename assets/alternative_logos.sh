#!/bin/bash

# Remove bad files
rm -f capgemini-logo.png marriott-logo.png anthropic-logo.png sri-eshwar-college-logo.png

# Try alternative sources
echo "Downloading Capgemini logo (alternative)..."
curl -L -o capgemini-logo.svg 'https://www.capgemini.com/us-en/' 2>/dev/null || echo "Trying PNG alternative..."
curl -L -o capgemini-logo.png 'https://cdn.worldvectorlogo.com/logos/capgemini.svg' || echo "Capgemini: Using placeholder approach"

echo "Downloading Marriott logo (alternative)..."
curl -L -o marriott-logo.svg 'https://cdn.worldvectorlogo.com/logos/marriott-international.svg' || echo "Marriott: Using placeholder approach"

echo "Downloading Anthropic logo (alternative)..."
curl -L -o anthropic-logo.png 'https://cdn.worldvectorlogo.com/logos/anthropic-3.svg' || echo "Anthropic: Using placeholder approach"

echo "Downloading Sri Eshwar College logo (alternative)..."
curl -L -o sri-eshwar-college-logo.png 'https://media.licdn.com/dms/image/C560BAQG7gfxQe_5J0A/company-logo_200_200/0/1631368869837?e=2147483647&v=beta&t=fake_token' 2>/dev/null || echo "Sri Eshwar College: Using placeholder approach"

echo "File status:"
ls -lh *.png *.svg 2>/dev/null | grep -E '(capgemini|marriott|anthropic|sri-eshwar)'
