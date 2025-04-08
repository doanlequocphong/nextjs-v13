# Run ( Docker develop )
- cp .env.example .env
- NEXT_PORT : cập nhật port nếu trùng port ( default : 3000 )
- docker-compose build --no-cache
- docker-compose up -d

- Use WSL2 Ubuntu : 
    + mkdir : node_modules
    + chmod -R 777 node_modules
    + yarn install

- Install Yarn
    + sudo apt update
    + sudo apt upgrade
    + sudo apt install -y curl gnupg
    + curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    + echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    + sudo apt update
    + sudo apt install -y yarn
    + yarn -v

- OR Cài đặt Yarn mà không cần Node.js từ APT
    + sudo apt install --no-install-recommends yarn