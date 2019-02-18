pipeline {
  agent any
  stages {
    stage('Git code') {
      steps {
        git(url: 'git@github.com:peykens/demoApp.git', branch: 'master')
      }
    }
    stage('Build image') {
      steps {
        sh 'docker build -f Dockerfile -t myapp:latest .'
      }
    }
    stage('Deploy') {
      steps {
        sh '''docker stop demoapp
docker rm demoapp'''
        sh 'docker run -d -p 3000:3000 --name demoapp demoapp:latest'
      }
    }
    stage('Build test wrapper') {
      steps {
        sh 'docker build -f Dockerfile.test -t mytest:latest .'
      }
    }
    stage('Run npm tests') {
      steps {
        sh 'docker run -t --rm --name mytest mytest:latest'
      }
    }
  }
}