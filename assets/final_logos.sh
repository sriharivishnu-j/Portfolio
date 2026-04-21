#!/bin/bash

# Remove problematic small files
rm -f capgemini-logo.png marriott-logo.png anthropic-logo.jpg ascendion-logo.png sri-eshwar-college-logo.png

# Better sources from Wikimedia and public CDNs
echo "Downloading Capgemini logo..."
curl -L -o capgemini-logo.png 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Capgemini_logo.svg'

echo "Downloading Marriott logo..."
curl -L -o marriott-logo.png 'https://upload.wikimedia.org/wikipedia/commons/3/30/Marriott_International_logo.svg'

echo "Downloading Anthropic logo..."
curl -L -o anthropic-logo.png 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Anthropic_logo.svg'

echo "Downloading Ascendion logo..."
curl -L -o ascendion-logo.png 'https://www.ascendion.com/assets/images/logo-ascendion.png'

echo "Downloading Sri Eshwar College logo..."
curl -L -o sri-eshwar-college-logo.png 'https://www.srieshwarcollege.edu.in/wp-content/uploads/2021/10/SEC_LOGO.png'

echo "Final file check:"
ls -lh *.png *.svg *.jpg 2>/dev/null | tail -20
