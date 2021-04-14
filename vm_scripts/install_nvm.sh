sudo apt update && sudo apt upgrade -y

echo "
------------------------------------------
	Download NVM 0.35.3
------------------------------------------"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
source ~/.nvm/nvm.sh
