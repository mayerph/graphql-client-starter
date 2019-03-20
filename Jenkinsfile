pipeline {
    agent none
    stages {
        stage('Lint') {
            agent {
                docker { 
                    image 'obraun/node-jenkins:latest' 
                    args '-u root:root'
                }
            }   
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }
        stage('Build Docker Image') {
            agent {
                label 'master'
            }
            steps {
                sh "docker-build-and-push -b ${BRANCH_NAME}"
            }
        }
    }
}