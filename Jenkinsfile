pipeline {
  agent any
  stages {
    stage('Git code') {
      steps {
        git(url: 'git@github.com:peykens/demoApp.git', branch: 'master')
      }
    }
    stage('Building image') {
      steps {
        script {
          docker.build "-f Dockerfile -t myapp:latest"
        }

      }
    }
    stage('Building test image wrapper') {
      steps {
        script {
          docker.build "-f Dockerfile.test -t mytest:latest"
        }

      }
    }
    stage('Run npm tests') {
      steps {
        script {
          docker.run "-t --rm  --name mytest mytest:latest"
        }

      }
    }
    stage('Deploy') {
      steps {
        sh 'docker stop myapp'
        sh 'docker rm myapp'
        sh 'docker run -d -p 3000:3000 --name myapp myapp:latest'
      }
    }
  }
}