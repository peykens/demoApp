pipeline {
  agent any
  stages {
    stage('Git code') {
      steps {
        git(url: 'git@github.com:peykens/demoApp.git', branch: 'master')
      }
    }
    stage('Build') {
      steps {
        sh 'docker build -t demoapp:latest .'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
        echo 'Kiekeboe'
      }
    }
  }
}