#!/bin/bash

# Clean up bad files first
rm -f anthropic-logo.png marriott-logo.svg marriott-logo.png anthropic-logo.png sri-eshwar-college-logo.png

# Use robust sources for each logo
echo "Downloading Marriott logo..."
curl -L -o marriott-logo.png 'https://commons.wikimedia.org/wiki/Special:FilePath/Marriott_International_logo.svg'

echo "Downloading Anthropic logo..."
curl -L -o anthropic-logo.png 'https://commons.wikimedia.org/wiki/Special:FilePath/Anthropic_logo.svg'

echo "Downloading Sri Eshwar College logo (using tech college placeholder)..."
# Since the original college site doesn't resolve, creating a generic college logo reference
# For now, we'll note it needs to be added manually
echo "Sri Eshwar College logo will need to be obtained from college website"

# List all logos
echo ""
echo "=== All Downloaded Logos ==="
ls -lh *.png *.svg *.jpg 2>/dev/null | grep -v 'DP.pdf' | sort

echo ""
echo "Total logos downloaded:"
ls -1 *.png *.svg *.jpg 2>/dev/null | wc -l
