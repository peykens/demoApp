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
    stage('Deploy') {
      steps {
        sh 'docker run -d --name -p 3000:3000 demoapp demoapp:latest'
        echo 'Kiekeboe'
      }
    }
  }
}