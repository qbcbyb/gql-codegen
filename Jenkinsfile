
pipeline {
    agent any
    stages {
        stage('publish'){
            agent {
                docker {
                    image 'qbcbyb/weex-node:2.3'
                    args "-v /opt/.npm:/root/.npm -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -e NPM_TOKEN=${NPM_TOKEN}"
                }
            }
            steps{
                sh 'npm install --prefer-offline'
                sh 'echo \'//registry.npmjs.org/:_authToken=${NPM_TOKEN}\'>~/.npmrc'
                sh 'npm publish --unsafe-perm'
            }
        }    
    }
}
