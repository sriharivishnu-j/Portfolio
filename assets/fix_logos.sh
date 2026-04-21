#!/bin/bash

# Remove the bad downloads
rm -f capgemini-logo.png ford-motors-logo.png marriott-logo.png ascendion-logo.png sri-eshwar-college-logo.png anthropic-logo.jpg iisc-logo.svg

# Re-download with better sources
echo "Downloading Capgemini logo (high quality)..."
curl -L -o capgemini-logo.png 'https://www.capgemini.com/us-en/wp-content/themes/capgemini-2021/assets/images/logo_capgemini.svg'

echo "Downloading Ford Motors logo..."
curl -L -o ford-motors-logo.png 'https://www.ford.com/etc/designs/ford-www-7/favicons/apple-touch-icon-180x180.png'

echo "Downloading Marriott International logo..."
curl -L -o marriott-logo.png 'https://www.marriott.com/content/dam/marriott-renditions/images/logo/marriott-international-light-logo.svg'

echo "Downloading Anthropic logo (Twitter)..."
curl -L -o anthropic-logo.jpg 'https://pbs.twimg.com/profile_images/1618117866797092865/5T8fJdO0_200x200.jpg'

echo "Downloading IISc logo..."
curl -L -o iisc-logo.png 'https://www.iisc.ac.in/wp-content/uploads/2019/02/Logo-01.png'

echo "Downloading Sri Eshwar College logo..."
curl -L -o sri-eshwar-college-logo.png 'https://www.srieshwarcollege.edu.in/assets/logo.png'

echo "Downloading Ascendion logo..."
curl -L -o ascendion-logo.png 'https://d2q5daq1z3y4za.cloudfront.net/media/images/5f8f48d94a2ae.png'

# Reno Plas - trying multiple sources
echo "Downloading Reno Plas logo..."
curl -L -o reno-plas-logo.png 'https://www.renoplas.com/logo.png' 2>/dev/null || curl -L -o reno-plas-logo.png 'https://www.linkedin.com/company/reno-plas/logo' 2>/dev/null || echo "Reno Plas logo not found from standard sources"

echo "Downloads completed!"
ls -lah
