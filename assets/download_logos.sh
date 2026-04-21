#!/bin/bash

# Certification Logos (with provided URLs)
echo "Downloading AWS logo..."
curl -o aws-logo.png 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png'

echo "Downloading Google logo..."
curl -o google-logo.png 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

echo "Downloading GitHub logo..."
curl -o github-logo.png 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'

echo "Downloading IBM logo..."
curl -o ibm-logo.svg 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'

echo "Downloading Microsoft logo..."
curl -o microsoft-logo.svg 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'

echo "Downloading Anthropic logo..."
curl -o anthropic-logo.jpg 'https://pbs.twimg.com/profile_images/1618117866797092865/5T8fJdO0_400x400.jpg'

echo "Downloading Coursera logo..."
curl -o coursera-logo.svg 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg'

echo "Downloading IISc logo..."
curl -o iisc-logo.svg 'https://upload.wikimedia.org/wikipedia/en/2/23/Indian_Institute_of_Science_Bangalore_Logo.svg'

# Company Logos (from public sources)
echo "Downloading Capgemini logo..."
curl -o capgemini-logo.png 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Capgemini_logo.svg'

echo "Downloading Ford Motors logo..."
curl -o ford-motors-logo.png 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Ford_logo.svg'

echo "Downloading Marriott International logo..."
curl -o marriott-logo.png 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Marriott_International_logo.svg'

# LinkedIn Learning logo
echo "Downloading LinkedIn Learning logo..."
curl -o linkedin-learning-logo.png 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'

# Ascendion and Reno Plas - trying common CDN sources
echo "Downloading Ascendion logo..."
curl -o ascendion-logo.png 'https://media.licdn.com/dms/image/C510BAQGz5Z0zqZZLKA/company-logo_200_200/0/1631632048832?e=2147483647&v=beta&t=xXBUHH9z3g7EjQqzQ1zGFQiKb2Ecc9qGqoYjYvC9cQ8' 2>/dev/null || echo "Ascendion download may have failed"

echo "Downloading Sri Eshwar College logo..."
curl -o sri-eshwar-college-logo.png 'https://upload.wikimedia.org/wikipedia/en/a/a9/Sri_Eshwar_College_of_Engineering_Vadapalani_Logo.svg'

echo "All downloads completed!"
ls -lah
