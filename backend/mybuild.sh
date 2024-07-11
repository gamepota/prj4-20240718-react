# react project build
cd ../frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
mv ../frontend/dist src/main/resources/static

# spring project build
./gradlew bootJar

# build image
docker build -t gamepota/petmily .

# push image
docker push gamepota/petmily

# remote 에서

# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0527.pem ubuntu@3.36.62.40 'docker stop petmily'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@3.36.62.40 'docker rm petmily'
# pull image
ssh -i src/main/resources/secret/key0527.pem ubuntu@3.36.62.40 'docker pull gamepota/petmily'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0527.pem ubuntu@3.36.62.40 'docker run -d -p 8080:8080 --restart always --name petmily gamepota/petmily'
